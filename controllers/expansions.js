const { cloudinary } = require('../cloudinary');
const Expansion = require('../models/expansion');
const Raid = require('../models/raid');


module.exports.index = async(req, res, next) => {
    const expansions = await Expansion.find({_id: "60dc58717404dd38d85c4307"}).populate({
        path:'raids',
        options: {sort: {releaseDate: 1}}}).sort('releaseDate');
    res.render('expansions/index', { expansions  });
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