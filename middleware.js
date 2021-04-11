const ExpressError = require('./utils/ExpressError');
const { applicationSchema, commentSchema } = require('./schemas.js');
const Application = require('./models/application');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}


module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const application = await Application.findById(id)
    if (!application.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that!');
        return res.redirect(`/applications/${application._id}`)
    }
    next();
}

module.exports.isCommentAuthor = async(req, res, next) => {
    const { id, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash('error', 'You dont have permission to do that!');
        return res.redirect(`/applications/${id}`)
    }
    next();
}

module.exports.validateApplication = (req, res, next) => {
    const { error } = applicationSchema.validate(req.body);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



module.exports.checkProfileOwnership = async(req, res, next) => {
    //if user is logged in
    if (req.isAuthenticated()) {
        User.findById(req.params.id, function(err, foundUser) {
            if (err || !foundUser) {
                req.flash('error', 'Something Went Wrong!');
                res.redirect('back');
            } else {
                //if user is logged in, do they own the profile?
                if (foundUser.equals(req.user._id)) {
                    next();
                } else {
                    //otherwise redirect
                    req.flash('error', "You don't have permission to do that.");
                    res.redirect('back');
                };
            };
        });
    } else {
        //if not, redirect.
        req.flash('error', "You need to be logged in to do that.");
        res.redirect('back');
    };
};

module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}