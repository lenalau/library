const express = require('express');
const router = express.Router();
const Book = require('../models/book')
/* GET users listing. */
router.get('/add', function (req, res, next) {
  //here we display the books 
  res.render('book-add')
});
//route and a views Alle anzeigen 
// GET /books
router.get('/', function (req, res, next) {
  Book.find().then((dataWhatever) => {
    res.render('books', { books: dataWhatever })
  })
});

//submit button > post > db > /books > all books shown look in network
//Hendrik

router.post('/', function (req, res, next) {
  //add stuff to the DB
  //! post = body / param / 
  // console.log("req.body")
  const { title, description, author, rating } = req.body;
  console.log("title", title)

  let book = new Book({
    // // BEFORE DESTRUCTURE
    // title: req.body.title,
    // description: req.body.description,
    // author: req.body.author,
    // rating: req.body.rating,
    // // AFTER:
    // // title: title, OR title,...
    // //Destructure Trick, everything in this is in a var
    title,
    description,
    author,
    rating
  })
  book.save()
    .then(() => {
      //?
      res.redirect("/books");
    })
});
//edit
router.get('/edit', (req, res, next) => {
  Book.findOne({ _id: req.query.book_id })
    .then((book) => {
      res.render("book-edit", { book });
    })
    .catch((error) => {
      console.log(error);
    })
});

// /books/edit
router.post('/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  Book.update({ _id: req.query.book_id }, { $set: { title, author, description, rating } }, { new: true })
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});

router.get('/delete', (req, res, next) => {
  Book.findOneAndDelete({ _id: req.query.book_id })
    .then((book) => {
      // res.render("book-delete", { book });
      res.redirect("/books")
    })
    .catch((error) => {
      console.log(error);
    })
});
//details
// /books/s89304730746
router.get('/:bookId', (req, res, next) => {
  Book.findOne({ "_id": req.params.bookId })
    .then(book => {
      res.render("book-detail", { book: book });
    })
    .catch((error) => {
      console.log(error);
    })
});

// router.post('/delete?book_id={{this._id}}', (req, res, next) => {
//   const { title, author, description, rating } = req.body;
//   Book.remove({ _id: req.query.book_id }, { $set: { title, author, description, rating } }, { new: true })
//     .then((book) => {
//       res.redirect('/books');
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// });

// Book.remove({ _id: req.query.book_id }, function (err) {
//   if (!err) {
//     message.type = 'notification!';
//   }
//   else {
//     message.type = 'error';
//   }
// });

// Model.update({ query }, { $set: { key: value, key: value } }, { new: true })
//   .then()
//   .catch()
// // NOTES:
// router.post('/books/add', (req, res, next) => {
//   const { title, author, description, rating } = req.body;
//   const newBook = new Book({ title, author, description, rating })
//   newBook.save()
//     .then((book) => {
//       res.redirect('/books');
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// });

module.exports = router;

