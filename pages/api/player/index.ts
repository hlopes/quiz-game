import errors from '@utils/errors';
import { getUserByName } from '@lib/user';

const handler = async (req, res) => {
    if (!req.query.name) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const data = await getUserByName(req.query.name);

    return res.json(data);
};

export default handler;
