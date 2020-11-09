import { connectToDatabase } from '../../../utils/mongodb';
import errors from '../../../utils/errors';

const handler = async (req, res) => {
    const { email, numQuestions = 10, gender = '' } = JSON.parse(req.body);

    if (!email) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const { db } = await connectToDatabase();

    const foundUser = await db.collection('users').findOne({ email });

    const foundPreferences = await db
        .collection('preferences')
        .findOne({ user: foundUser });

    if (foundPreferences) {
        await db.collection('preferences').updateOne(
            { user: foundUser },
            {
                $set: {
                    numQuestions,
                    gender,
                },
            }
        );
    } else {
        await db
            .collection('preferences')
            .insertOne({ user: foundUser, numQuestions, gender });
    }

    return res.json({
        message: 'Saved successfully',
    });
};

export default handler;
