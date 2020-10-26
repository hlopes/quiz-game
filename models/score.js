const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const scoreSchema = new mongoose.Schema({
    points: {
        type: Number,
        required: true,
        default: 0,
    },
    user: {
        type: ObjectId,
        ref: 'User',
    },
});

try {
    mongoose.model('Score');
} catch (error) {
    mongoose.model('Score', scoreSchema);
}
