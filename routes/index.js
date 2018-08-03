const express = require('express');
const goodreads = require('../lib/goodreads');
const router = express.Router();
module.exports = router;

const HOST = process.env.HOST;

function requiresAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    login: `${HOST}/login`,
    logout: `${HOST}/logout`,
  });
}

router.use('/auth', require('./auth'));
router.get('/login', (req, res) => res.redirect('/auth'));
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/', requiresAuth, (req, res) => {
  // strip the token out
  const user = (({ displayName, id }) => ({ displayName, id }))(req.user);
  res.json({ ...user, reviews: `${HOST}/reviews`, logout: `${HOST}/logout` });
});

router.get('/reviews', requiresAuth, (req, res) => {
  goodreads
    .getReviews(req.user)
    .then(reviews => res.json(reviews))
    .catch(e => {
      console.log(e);
      res.status(500).json({ error: e.message });
    });
});
