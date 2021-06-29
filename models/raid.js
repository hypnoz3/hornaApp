const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BannerSchema = new Schema({
    url: String,
    filename: String
});

const ExpansionSchema = new Schema({
    title: String
});

const RaidSchema = new Schema({
    title: String,
    releaseDate: Date,
    expansion_id: String,
    banner: [BannerSchema],

});

module.exports = mongoose.model('Raid', RaidSchema);