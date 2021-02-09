import { connectToDatabase } from '@utils/mongodb';

export const getPreferences = async (email) => {
    const { db } = await connectToDatabase();

    return await db.collection('preferences').findOne({
        ['user.email']: email,
    });
};
