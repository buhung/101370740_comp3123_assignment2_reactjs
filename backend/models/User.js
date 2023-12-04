const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash the password before saving it
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;