import mongoose from 'mongoose';

import '../models/user';

import { URI } from '../config/keys';

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const connectToDatabase = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    await mongoose.connect(URI, mongoOptions);
};

const addDatabase = (handler) => async (req, res) => {
    await connectToDatabase();

    return handler(req, res);
};

export default addDatabase;
