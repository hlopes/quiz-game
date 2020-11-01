import mongoose from 'mongoose';

import connectToDatabase from '../../utils/dbMiddleware';

const User = mongoose.model('User');

const handler = async (req, res) => {
    try {
        const top = await User.find().limit(10).sort({ score: -1 });

        return res.json({ top });
    } catch (error) {
        res.statusCode = 500;

        return res.json({ error });
    }
};

export default connectToDatabase(handler);
