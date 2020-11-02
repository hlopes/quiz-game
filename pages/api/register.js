import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '../../utils/mongodb';
import errors from '../../utils/errors';

const handler = async (req, res) => {
    const { name, email, password } = JSON.parse(req.body);

    if (!name || !email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.REGISTER_FORM_DATA_MISSING });
    }

    try {
        const { db } = await connectToDatabase();

        const savedUser = await db.collection('users').findOne({ email });

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
            const user = {
                email,
                name,
                password: hashed,
            };

            await db.collection('users').insertOne(user);

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            res.status(201);

            return res.json({
                message: 'Saved successfully',
                user,
                token,
            });
        }
    } catch (error) {
        console.log('Error ', error);
    }
};

export default connectToDatabase(handler);
