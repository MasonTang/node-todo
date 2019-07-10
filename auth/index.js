'use strict'

const { router } = require('./router');
const { localStrategy, jwtStrategy, GoogleStrategy } = require('./strategies');

module.exports = { router, localStrategy, jwtStrategy, GoogleStrategy };