/**
 * for routes like /dashboard OR /homepage.
 * 
 * we're gonna use Express router.
 */
const express = require('express');
const router = express.Router();

// Welcom Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;