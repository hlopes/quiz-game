import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');

const handler = (req, res) => {
    const { name, email, password } = JSON.parse(req.body);

    if (!name || !email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.REGISTER_FORM_DATA_MISSING });
    }

    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                res.statusCode = 422;

                return res.json({ ...errors.ALREADY_REGISTERED });
            }

            bcrypt.hash(password, 12).then((hashed) => {
                const user = new User({
                    email,
                    name,
                    password: hashed,
                });

                user.save()
                    .then((user) => {
                        return res.json({
                            message: 'Saved successfully',
                            data: user,
                        });
                    })
                    .catch((error) => console.log('Error ', error));
            });
        })
        .catch((error) => console.log('Error ', error));
};

export default connectToDatabase(handler);
