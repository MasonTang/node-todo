const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const todoSchema = mongoose.Schema({
    todo:String,
    user: {type: mongoose.Schema.ObjectId, ref:'User'}
})

todoSchema.pre('find', function(next) {
    this.populate('user')
    next();
})

todoSchema.pre('findOne', function (next) {
    this.populate('user')
    next();
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = { Todo }

//i need to get by userId