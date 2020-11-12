import { connectToDatabase } from '../../utils/mongodb';
import errors from '../../utils/errors';

const handler = async (req, res) => {
    const { email, points, questions } = JSON.parse(req.body);

    if (!email) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const { db } = await connectToDatabase();

    const savedUser = await db.collection('users').findOne({ email });

    if (!savedUser) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    await db.collection('users').updateOne(
        { email },
        {
            $set: {
                points: savedUser?.points + points,
                questionsAnswered: savedUser?.questionsAnswered + questions,
            },
        }
    );

    const foundUser = await db.collection('users').findOne({ email });

    await db.collection('preferences').updateOne(
        { 'user.email': email },
        {
            $set: {
                user: foundUser,
            },
        }
    );

    return res.json({
        message: 'Saved successfully',
    });
};

export default handler;
