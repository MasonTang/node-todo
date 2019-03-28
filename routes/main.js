module.exports = function (app) {
    const express = require('express');
    const mongoose = require('mongoose');
    const { User } = require('../users/models');
    const { Todo } = require('../models/todo');
    const bodyParser = require('body-parser');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const flash = require('req-flash');
    const jwt = require('jsonwebtoken')
    const passport = require('passport');
    const jwtAuth = passport.authenticate('jwt', { session: false });
    


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({ secret: '123' }));
    app.use(flash());

    //render to different pages
    app.get('/login', (req, res) => {
        res.redirect('/html/login.html')
    })
    app.get('/signup', (req, res) => {
        res.redirect('/html/signup.html')
    })

 ///////Data
///////////////////////
    app.get('/user', (req,res) => {
        User
            .find()
            .then(result => res.json(result))
            .catch(errorHandler)
    })

    app.get('/todo', jwtAuth, (req,res) => {
        Todo
            .find({user: req.user.id})
            .then(todo => res.json(todo))
            .catch(errorHandler)
    })

    app.post('/todo', jwtAuth, (req, res) => {
        const requiredFields = ['todo']
        for (let i = 0; i < requiredFields.length; i++) {
            const field = requiredFields[i];
            if (!(field in req.body)) {
                const message = `Missing \`${field}\` in request body`;
                console.error(message);
                return res.status(400).send(message);
            }
        }
        Todo
            .create({
                todo:req.body.todo,
                user: req.user.id
            })
            .then(todo => res.json(todo))
            .catch(errorHandler)
    })
}






//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }
    //if they aren't redirect them to the home page
    else {
        res.redirect('/')
    }
}

//route middleware to make sure a user is logged in as an admin
function isAdmin(req, res, next) {

    //if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.level == 'admin') {
        return next();
    }
    //if they aren't redirect them to the home page
    else {
        res.redirect('/')
    }
}

function errorHandler(err) {
    console.error(err);
}