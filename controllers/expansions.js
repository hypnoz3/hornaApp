const { cloudinary } = require('../cloudinary');
const Expansion = require('../models/expansion');
const Raid = require('../models/raid');


module.exports.index = async(req, res, next) => {
    const {title} = req.query;
    if (title) {
    const expansions = await Expansion.find({title}).populate({
        path:'raids',
        options: {sort: {releaseDate: 1}}}).sort('releaseDate');
        res.render('expansions/index', { expansions, title });
    } else {
        const expansions = await Expansion.find({title: 'Shadowlands'}).populate({
            path:'raids',
            options: {sort: {releaseDate: 1}}}).sort('releaseDate');
            res.render('expansions/index', { expansions, title });
        }
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
    res.redirect(`/expansions`)
}