import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    questionsAnswered: {
        type: Number,
        required: true,
        default: 0,
    },
    score: {
        type: Number,
        required: true,
        default: 0,
    },
});

try {
    mongoose.model('User');
} catch (error) {
    mongoose.model('User', userSchema);
}
