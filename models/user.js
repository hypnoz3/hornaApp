const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AvatarSchema = new Schema({
    url: String,
    filename: String
});

AvatarSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_100');
});

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    avatar: [AvatarSchema],
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);