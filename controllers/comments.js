const Application = require('../models/application');
const Comment = require('../models/comment');

module.exports.createComment = async(req, res) => {
    const application = await Application.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    application.comments.push(comment);
    await comment.save();
    await application.save();
    req.flash('success', 'Created new comment');
    res.redirect(`/applications/${application._id}`);
}

module.exports.deleteComment = async(req, res) => {
    const { id, commentId } = req.params;
    await Application.findByIdAndUpdate(id, { $pull: { comments: commmentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', 'Successfully deleted comment.');
    res.redirect(`/applications/${id}`);
}