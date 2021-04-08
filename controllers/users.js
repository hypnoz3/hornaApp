const User = require('../models/user');
const { cloudinary } = require('../cloudinary');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async(req, res, next) => {
    try {
        const { email, username, password, avatar, firstName, lastName } = req.body;
        const user = new User({ email, username, avatar, firstName, lastName });
        user.avatar = req.files.map(f => ({ url: f.path, filename: f.filename }));
        const registeredUser = await User.register(user, password);
        console.log(user);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome to Horna!`);
            res.redirect('/home');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}


module.exports.userProfile = async(req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        req.flash('error', 'Cannot find that user!');
        res.redirect('/home');
    }
    res.render('users/profile', { user });

}

module.exports.renderUserEditForm = async(req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        req.flash('error', 'Cannot find that user!');
        return res.redirect('/users/:id');
    }
    res.render('users/edit', { user });
}

module.exports.updateUser = async(req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const user = await User.findByIdAndUpdate(id, {...req.body.user });
    const newAvatar = req.files.map(f => ({ url: f.path, filename: f.filename }));
    user.avatar.push(...newAvatar);
    await user.save();
    if (req.body.deleteavatar) {
        for (let filename of req.body.deleteavatar) {
            await cloudinary.uploader.destroy(filename);
        }
        await user.updateOne({ $pull: { avatar: { filename: { $in: req.body.deleteavatar } } } })
        console.log(user)
    }
    req.flash('success', 'Updated your profile!');
    res.redirect(`/users/${user._id}`)
}

module.exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted User!');
    res.redirect('/');
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}


module.exports.login = (req, res) => {
    const currentUser = req.body.username;
    req.flash('success', `Welcome back ${currentUser}!`);
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/');

}