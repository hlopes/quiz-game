import mongoose from 'mongoose';

import connectToDatabase from '../../utils/dbMiddleware';
import errors from '../../utils/errors';

const User = mongoose.model('User');
const Score = mongoose.model('Score');

const handler = async (req, res) => {
    const { email, points } = JSON.parse(req.body);

    if (!email) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    const savedUser = await User.findOne({ email });

    if (!savedUser) {
        res.statusCode = 422;

        return res.json({ ...errors.INVALID_EMAIL });
    }

    await Score.updateOne({ user: savedUser }, { points });

    return res.json({
        message: 'Saved successfully',
    });
};

export default connectToDatabase(handler);
