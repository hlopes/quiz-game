import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');

const handler = async (req, res) => {
    const { name, email, password } = JSON.parse(req.body);

    if (!name || !email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.REGISTER_FORM_DATA_MISSING });
    }

    try {
        const savedUser = await User.findOne({ email });

        if (savedUser) {
            res.statusCode = 422;

            return res.json({ ...errors.ALREADY_REGISTERED });
        }

        if (!process.env.JWT_SECRET) {
            res.statusCode = 422;

            return res.json({ ...errors.SECRET_NOT_DEFINED });
        }

        const hashed = await bcrypt.hash(password, 12);

        if (hashed) {
            const user = new User({
                email,
                name,
                password: hashed,
            });

            const newUser = user.save();

            if (newUser) {
                const token = jwt.sign(
                    { _id: user._id },
                    process.env.JWT_SECRET
                );

                res.status(201);

                return res.json({
                    message: 'Saved successfully',
                    user,
                    token,
                });
            }
        }
    } catch (error) {
        console.log('Error ', error);
    }
};

export default connectToDatabase(handler);
