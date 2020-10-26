import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/keys';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');
const Score = mongoose.model('Score');

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

        const hashed = await bcrypt.hash(password, 12);

        if (hashed) {
            const user = new User({
                email,
                name,
                password: hashed,
            });

            const newUser = user.save();

            if (newUser) {
                const score = new Score({ user: savedUser, points: 0 });

                await score.save();

                const token = jwt.sign({ _id: user._id }, JWT_SECRET);

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
