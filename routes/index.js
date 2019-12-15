/**
 * for routes like /dashboard OR /homepage.
 * 
 * we're gonna use Express router.
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('welcome'))

module.exports = router;