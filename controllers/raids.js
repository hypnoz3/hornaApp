const Raid = require('../models/raid');
const { cloudinary } = require('../cloudinary');

module.exports.index = async(req, res, next) => {
    const raids = await Raid.find({});
    res.render('raids/index', { raids });
}

module.exports.renderNewForm = (req, res) => {
    res.render('raids/new');
}

module.exports.createRaid = async(req, res, next) => {
    const raid = new Raid(req.body.raid);
    raid.banner = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await raid.save();
    console.log(raid);
    req.flash('success', 'Successfully added raid to your collection!');
    res.redirect(`/`)
}