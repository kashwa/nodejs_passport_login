/**
 * for routes like /user/login OR /user/register.
 * 
 * we're gonna use Express router.
 */
const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Login page
router.get('/login', (req, res) => res.render('login'));

// Register page
router.get('/register', (req, res) => res.render('register'));

// Handle Register request.
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields.
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill all fields' });
    }

    // Check Passwords match
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        // Validation Succeed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // User Exists.
                    errors.push({ msg: 'Email already exists' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // Set password to hash
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', "You are now Registered, and can Login!");
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    }))
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;