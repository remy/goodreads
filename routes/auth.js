const express = require('express');
const passport = require('../lib/passport');
const router = express.Router();
module.exports = router;

router.get('/', passport.authenticate('goodreads'));

router.get(
  '/callback',
  passport.authenticate('goodreads', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);
