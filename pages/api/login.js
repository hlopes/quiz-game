import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/keys';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');

const handler = async (req, res) => {
    const { email, password } = JSON.parse(req.body);

    if (!email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.LOGIN_FORM_DATA_MISSING });
    }

    try {
        const savedUser = await User.findOne({ email });

        if (!savedUser) {
            res.statusCode = 422;

            return res.json({ ...errors.USER_NOT_FOUND });
        }

        const doMatch = await bcrypt.compare(password, savedUser.password);

        if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email } = savedUser;

            return res.json({ token, user: { _id, name, email } });
        }

        res.statusCode = 422;

        return res.json({ ...errors.USER_NOT_FOUND });
    } catch (error) {
        console.log('Error ', error);
    }
};

export default connectToDatabase(handler);
