const { cloudinary } = require('../cloudinary');
const Expansion = require('../models/expansion');
const Raid = require('../models/raid');

module.exports.index = async(req, res, next) => {
    const expansions = await Expansion.find({});
    const raids = await Raid.find({});
    res.render('expansions/index', { expansions, raids });
}

module.exports.renderNewForm = (req, res) => {
    res.render('expansions/new');
}

module.exports.createExpansion = async(req, res, next) => {
    const expansion = new Expansion(req.body.expansion);
    expansion.banner = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await expansion.save();
    console.log(expansion);
    req.flash('success', 'Successfully added expansion!');
    res.redirect(`/`)
}