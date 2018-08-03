// 3rd party
require('@remy/envy');
const express = require('express');
const session = require('express-session');
const LevelStore = require('level-session-store')(session);
const tmpdir = require('os').tmpdir;

// local
const passport = require('./lib/passport');

// boot vars
const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.set('json spaces', 2);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: new LevelStore(`${tmpdir()}/goodreads.store`),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes'));
app.listen(port, () => console.log(`Listening on ${port}`));
