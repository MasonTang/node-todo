'use strict';

const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    }
});

UserSchema.methods.serialize = function () {
    return {
        id: this._id,
        username: this.username || ''
    };
};

UserSchema.methods.validatePassword = function (password) {
    return bcryptjs.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
    return bcryptjs.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };