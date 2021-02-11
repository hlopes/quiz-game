import { getPreferencesByUserId } from '@lib/preferences';
import errors from '@utils/errors';

const handler = async (req, res) => {
    const {
        query: { userid },
    } = req;

    if (!userid) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    try {
        const { numQuestions, gender } = await getPreferencesByUserId(userid);

        return res.json({
            numQuestions,
            gender,
        });
    } catch (error) {
        res.statusCode = 500;

        return res.json({ ...errors.GET_USER_PREFERENCES });
    }
};

export default handler;
