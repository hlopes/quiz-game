import mongoose from 'mongoose';

import '../models/user';
import '../models/score';

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState || !process.env.MONGODB_URI) {
        return;
    }

    await mongoose.connect(encodeURI(process.env.MONGODB_URI), mongoOptions);
};

const addDatabase = (handler) => async (req, res) => {
    await connectToDatabase();

    return handler(req, res);
};

export default addDatabase;
