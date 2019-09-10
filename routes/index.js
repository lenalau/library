const express = require('express');
const router = express.Router();

/* GET home page. */
// /users
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/books', function (req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/books/add', (req, res, next) => {
//   res.render("book-add");
// });

// // router.get('/books/edit', (req, res, next) => {
// //   res.render("book-edit");
// // });
// router.get('/books/edit', (req, res, next) => {
//   Book.findOne({ _id: req.query.book_id })
//     .then((book) => {
//       res.render("book-edit", { book });
//     })
//     .catch((error) => {
//       console.log(error);
//     })
// });


module.exports = router;



