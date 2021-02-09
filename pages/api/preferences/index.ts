import { connectToDatabase } from '@utils/mongodb';
import errors from '@utils/errors';

const handler = async (req, res) => {
    const { email, numQuestions = 10, gender = '' } = JSON.parse(req.body);

    if (!email) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const { db } = await connectToDatabase();

    await db.collection('preferences').updateOne(
        { 'user.email': email },
        {
            $set: {
                numQuestions,
                gender,
            },
        }
    );

    return res.json({
        message: 'Saved successfully',
    });
};

export default handler;
