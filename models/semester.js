const mongoose = require('mongoose');
const User = require('../users/models')
mongoose.Promise = global.Promise;

const semesterSchema = mongoose.Schema({
    semester: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

semesterSchema.pre('find', function (next) {
    this.populate('user')
    next();
})

semesterSchema.pre('findOne', function (next) {
    this.populate('user')
    next();
})

semesterSchema.methods.seralize = function () {
    return {
        user: this.user,
        semester: this.semester,
        semesterId: this.semesterId
    }
}

const Semester = mongoose.model("Semester", semesterSchema)
module.exports = { Semester }