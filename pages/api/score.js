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

    const totalPoints = savedUser?.points + points;
    const totalQuestions = savedUser?.questionsAnswered + questions;
    const score = (
        Math.round(((totalPoints * 100) / totalQuestions) * 100) / 100
    ).toFixed(2);

    await db.collection('users').updateOne(
        { email },
        {
            $set: {
                points: savedUser?.points + points,
                questionsAnswered: savedUser?.questionsAnswered + questions,
                score,
            },
        }
    );

    return res.json({
        message: 'Saved successfully',
    });
};

export default handler;
