const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    playstyle: String,
    role1: String,
    role2: String,
    role3: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});


module.exports = mongoose.model('Application', ApplicationSchema);