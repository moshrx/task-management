const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' }  // 'admin' or 'user'
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
