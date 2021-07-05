const Raid = require('../models/raid');
const { cloudinary } = require('../cloudinary');
const Expansion = require('../models/expansion');

module.exports.index = async(req, res, next) => {
    const raids = await Raid.find({});
    res.render('raids/index', { raids });
}

module.exports.renderNewForm = async(req, res) => {
    const expansions = await Expansion.find({});
    res.render('raids/new', {expansions});
}

module.exports.createRaid = async(req, res, next) => {
    const expansion = await Expansion.findById(req.body.expansion);
    const raid = new Raid(req.body.raid);
    raid.banner = req.files.map(f => ({ url: f.path, filename: f.filename }));
    expansion.raids.push(raid);
    await raid.save();
    await expansion.save();
    console.log(raid);
    req.flash('success', 'Successfully added raid to your collection!');
    res.redirect(`/expansions`)
}

