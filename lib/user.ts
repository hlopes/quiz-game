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

export const getUserByName = async (name) => {
    const { db } = await connectToDatabase();

    const preferencesWithUser = await db
        .collection('preferences')
        .findOne({ 'user.name': name });

    if (preferencesWithUser) {
        return preferencesWithUser;
    }

    await db.collection('users').updateOne(
        { name },
        {
            $set: {
                points: 0,
                questionsAnswered: 0,
            },
        }
    );

    const user = await db.collection('users').findOne({ name });

    await db
        .collection('preferences')
        .insertOne({ user, numQuestions: 3, gender: '' });

    return {
        user,
        numQuestions: 3,
        gender: '',
    };
};
