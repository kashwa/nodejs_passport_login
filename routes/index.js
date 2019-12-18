/**
 * for routes like /dashboard OR /homepage.
 * 
 * we're gonna use Express router.
 */
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Welcom Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
    name: req.user.name
}));

module.exports = router;