const { ensureAuthenticated } = require("../config/auth");
const Book = require("../Models/Book");
const express = require("express");
const router = express.Router();

// index page for books visite: http://localhost:5000/books
router.get("/", ensureAuthenticated, (req, res) => {
  console.log("getting all books!");
  Book.find({}).exec((err, books) => {
    if (err) {
      console.error(err);
    } else {
      // resend Books view and data here.
      res.render('../views/books/index', { books })
    }
  });
});

router.get("/:id", ensureAuthenticated, (req, res) => {
  Book.findOne({
    _id: req.params.id
  }).exec((err, book) => {
    if (err) {
      res.send(err);
    } else {
      console.log("searching for book!");
      res.render('../views/books/show', { book })
    }
  });
});

module.exports = router;
