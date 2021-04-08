const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    url: String,
    filename: String
});

const ExpansionSchema = new Schema({
    title: String,
    releaseDate: Date,
    banner: [BannerSchema],
    raid: {
        type: Schema.Types.ObjectId,
        ref: 'Raid'
    }
});

module.exports = mongoose.model('Expansion', ExpansionSchema);