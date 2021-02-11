import { ObjectID } from 'mongodb';
import { connectToDatabase } from '@utils/mongodb';
import errors from '@utils/errors';

export const getPreferencesByEmail = async (email) => {
    const { db } = await connectToDatabase();

    return await db.collection('preferences').findOne({
        ['user.email']: email,
    });
};

export const getPreferencesByUserId = async (userId) => {
    const { db } = await connectToDatabase();

    const userIdObject = new ObjectID(userId);

    const foundUser = await db
        .collection('users')
        .findOne({ _id: userIdObject });

    if (!foundUser) {
        throw new Error(errors.INVALID_EMAIL.errorCode.toString());
    }

    const foundPreferences = await db.collection('preferences').findOne({
        ['user._id']: foundUser._id,
    });

    if (!foundPreferences) {
        return {
            numQuestions: 3,
            gender: '',
        };
    }

    return foundPreferences;
};

export const updatePreferences = async (email, numQuestions, gender) => {
    const { db } = await connectToDatabase();

    return await db.collection('preferences').updateOne(
        { 'user.email': email },
        {
            $set: {
                numQuestions,
                gender,
            },
        }
    );
};
