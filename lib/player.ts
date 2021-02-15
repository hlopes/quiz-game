import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '@utils/mongodb';
import errors from '@utils/errors';

import { Player } from '../types/Player';

const TOP = 10;

export const getTopPlayers = async () => {
    const { db } = await connectToDatabase();

    return await db
        .collection('players')
        .find()
        .limit(TOP)
        .sort({ ['statistics.points']: -1 })
        .toArray();
};

export const login = async (name, password) => {
    const { db } = await connectToDatabase();

    if (!process.env.JWT_SECRET) {
        throw new Error(errors.SECRET_NOT_DEFINED.message);
    }

    const savedUser: Player = await db.collection('players').findOne({ name });

    if (!savedUser) {
        // Register
        const hashed = await bcrypt.hash(password, 12);

        if (hashed) {
            const player = {
                name,
                password: hashed,
                statistics: {
                    points: 0,
                    questionsAnswered: 0,
                },
                preferences: {
                    numQuestions: 3,
                    gender: '',
                },
            };

            await db.collection('players').insertOne(player);

            const token = jwt.sign(
                { _id: player.name },
                process.env.JWT_SECRET
            );

            return {
                player: { ...player, password: null },
                token,
            };
        }
    }

    const doMatch: boolean = await bcrypt.compare(password, savedUser.password);

    if (doMatch) {
        const token = jwt.sign({ _id: savedUser.name }, process.env.JWT_SECRET);

        // Remove password
        const { _id, name, statistics, preferences } = savedUser;

        return {
            token,
            player: { _id, name, statistics, preferences },
        };
    }

    throw new Error(errors.USER_NOT_FOUND.message);
};

export const updatePreferences = async (name, numQuestions, gender) => {
    const { db } = await connectToDatabase();

    const savedPlayer = await db.collection('players').findOne({ name });

    const preferences = {
        numQuestions,
        gender,
    };

    await db.collection('players').updateOne(
        { name },
        {
            $set: {
                preferences,
            },
        }
    );

    return {
        ...savedPlayer,
        preferences,
    };
};

export const updateScore = async (name, points, questions) => {
    const { db } = await connectToDatabase();

    const savedPlayer = await db.collection('players').findOne({ name });

    const statistics = {
        points: savedPlayer?.statistics?.points + parseInt(points, 10),
        questionsAnswered:
            savedPlayer?.statistics?.questionsAnswered +
            parseInt(questions, 10),
    };

    await db.collection('players').updateOne(
        { name },
        {
            $set: { statistics },
        }
    );

    return {
        ...savedPlayer,
        statistics,
    };
};
