import { NextApiRequest, NextApiResponse } from 'next';

import errors from '@utils/errors';
import { updateScore } from '@lib/player';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, points, questions } = JSON.parse(req.body);

    if (!name) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_NAME });
    }

    try {
        const result = await updateScore(name, points, questions);

        return res.json({
            message: 'Saved successfully',
            player: result,
        });
    } catch (error) {
        res.statusCode = 500;

        return res.json(error?.message);
    }
};

export default handler;
