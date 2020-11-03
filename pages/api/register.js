import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '../../utils/mongodb';
import errors from '../../utils/errors';

const handler = async (req, res) => {
    const { name, email, password, image, isExternal } = JSON.parse(req.body);
    console.log('### isExternal ', isExternal);
    if (!name || !email || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.REGISTER_FORM_DATA_MISSING });
    }

    try {
        const { db } = await connectToDatabase();

        const savedUser = await db.collection('users').findOne({ email });

        if (!process.env.JWT_SECRET) {
            res.statusCode = 422;

            return res.json({ ...errors.SECRET_NOT_DEFINED });
        }

        if (savedUser && !isExternal) {
            res.statusCode = 422;

            return res.json({ ...errors.ALREADY_REGISTERED });
        }

        const hashed = await bcrypt.hash(password, 12);

        if (hashed) {
            const user = {
                email,
                name,
                password: hashed,
                image,
                points: 0,
                questionsAnswered: 0,
                score: 0,
            };

            if (savedUser) {
                await db
                    .collection('users')
                    .updateOne({ email }, { $set: { password } });
            } else {
                await db.collection('users').insertOne(user);
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            res.status(201);

            return res.json({
                message: 'Saved successfully',
                user,
                token,
            });
        }
    } catch (error) {
        res.statusCode = 500;

        return res.json({ ...errors.ERROR_REGISTERING });
    }
};

export default handler;
