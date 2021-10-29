const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    url: String,
    filename: String
});


const RaidSchema = new Schema({
    title: String,
    releaseDate: Date,
    progress: String,
    banner: [BannerSchema],

});

module.exports = mongoose.model('Raid', RaidSchema);