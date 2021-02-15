import { NextApiRequest, NextApiResponse } from 'next';

import errors from '@utils/errors';
import { updatePreferences } from '@lib/player';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, numQuestions = 3, gender = '' } = JSON.parse(req.body);

    if (!name) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_NAME });
    }

    try {
        const result = await updatePreferences(name, numQuestions, gender);

        return await res.json({
            message: 'Saved successfully',
            player: result,
        });
    } catch (error) {
        res.statusCode = 500;

        return res.json(error?.message);
    }
};

export default handler;
