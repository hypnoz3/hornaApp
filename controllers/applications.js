const { cloudinary } = require('../cloudinary');
const Application = require('../models/application');

module.exports.index = async(req, res, next) => {
    const applications = await Application.find({}).populate('author');
    res.render('applications/index', { applications });
}

module.exports.renderNewForm = (req, res) => {
    res.render('applications/new');
}

module.exports.createApplication = async(req, res, next) => {
    const application = new Application(req.body.application);
    application.author = req.user._id;
    await application.save();
    console.log(application);
    req.flash('success', 'Thank you for submitting your application');
    res.redirect(`/`)
}

module.exports.showApplication = async(req, res) => {
    const application = await Application.findById(req.params.id).populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    }).populate('author');
    const applications = await Application.find({}).populate('author');
    if (!application) {
        req.flash('error', 'Cannot find that application!');
        res.redirect('/');
    }
    res.render('applications/show', { application, applications });
}