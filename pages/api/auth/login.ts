import { NextApiRequest, NextApiResponse } from 'next';

import errors from '@utils/errors';
import { login } from '@lib/player';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, password } = JSON.parse(req.body);

    if (!name || !password) {
        res.statusCode = 422;

        return res.json({ ...errors.LOGIN_FORM_DATA_MISSING });
    }

    try {
        const result = await login(name, password);

        return res.json(result);
    } catch (error) {
        res.statusCode = 500;

        return res.json(error?.message);
    }
};

export default handler;
