import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../config/keys';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');

const handler = (req, res) => {
    const { email, password } = JSON.parse(req.body);

    if (!email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.LOGIN_FORM_DATA_MISSING });
    }

    User.findOne({ email })
        .then((savedUser) => {
            if (!savedUser) {
                res.statusCode = 422;

                return res.json({ ...errors.USER_NOT_FOUND });
            }

            bcrypt
                .compare(password, savedUser.password)
                .then((doMatch) => {
                    if (doMatch) {
                        const token = jwt.sign(
                            { _id: savedUser._id },
                            JWT_SECRET
                        );
                        const { _id, name, email } = savedUser;

                        return res.json({ token, user: { _id, name, email } });
                    }

                    res.statusCode = 422;

                    return res.json({ ...errors.USER_NOT_FOUND });
                })
                .catch((error) => console.log('Error ', error));
        })
        .catch((error) => console.log('Error ', error));
};

export default connectToDatabase(handler);
