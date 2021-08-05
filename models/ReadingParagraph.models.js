const mongoose = require('mongoose');
const { Schema } = mongoose;

const readingSchema = new Schema({
    name: String,
    paragraph: String,
    questions: [{
        index: String,
        selections: [String],
        answer: String
    }]
}, {
    collection: 'Reading'
});

const Reading = mongoose.model('Reading', readingSchema);

module.exports = Reading;