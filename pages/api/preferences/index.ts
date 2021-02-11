import { updatePreferences } from '@lib/preferences';
import errors from '@utils/errors';

const handler = async (req, res) => {
    const { email, numQuestions = 10, gender = '' } = JSON.parse(req.body);

    if (!email) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    try {
        await updatePreferences(email, numQuestions, gender);

        return res.json({
            message: 'Saved successfully',
        });
    } catch (error) {
        res.statusCode = 500;

        return res.json({ ...errors.UPDATE_USER_PREFERENCES });
    }
};

export default handler;
