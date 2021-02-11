import { connectToDatabase } from '@utils/mongodb';

export const getTopPlayers = async () => {
    const { db } = await connectToDatabase();

    const users = await db
        .collection('preferences')
        .find()
        .limit(10)
        .sort({ ['user.points']: -1 })
        .toArray();

    return users.map(({ user }) => user);
};

export const getUserByEmail = async (email) => {
    const { db } = await connectToDatabase();

    const preferencesWithUser = await db
        .collection('preferences')
        .findOne({ 'user.email': email });

    if (preferencesWithUser) {
        return preferencesWithUser;
    }

    await db.collection('users').updateOne(
        { email },
        {
            $set: {
                points: 0,
                questionsAnswered: 0,
            },
        }
    );

    const user = await db.collection('users').findOne({ email });

    await db
        .collection('preferences')
        .insertOne({ user, numQuestions: 3, gender: '' });

    return {
        user,
        numQuestions: 3,
        gender: '',
    };
};
