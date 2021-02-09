import { ObjectID } from 'mongodb';

import { connectToDatabase } from '@utils/mongodb';
import errors from '@utils/errors';

const handler = async (req, res) => {
    const {
        query: { userid },
    } = req;

    if (!userid) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const { db } = await connectToDatabase();

    const userIdObject = new ObjectID(userid);

    const foundUser = await db
        .collection('users')
        .findOne({ _id: userIdObject });

    if (!foundUser) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const foundPreferences = await db.collection('preferences').findOne({
        ['user._id']: foundUser._id,
    });

    if (!foundPreferences) {
        return res.json({
            numQuestions: 3,
            gender: '',
        });
    }

    const { numQuestions, gender } = foundPreferences;

    return res.json({
        numQuestions,
        gender,
    });
};

export default handler;
