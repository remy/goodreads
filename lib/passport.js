const passport = require('passport');
const GoodreadsStrategy = require('passport-goodreads').Strategy;

const { GOODREADS_KEY, GOODREADS_SECRET, CALLBACK_URL } = process.env;

const filter = ({ id, displayName, token, tokenSecret }) => ({
  id,
  displayName,
  token,
  tokenSecret,
});

passport.serializeUser((user, done) => done(null, filter(user)));
passport.deserializeUser((obj, done) => done(null, filter(obj)));

passport.use(
  new GoodreadsStrategy(
    {
      consumerKey: GOODREADS_KEY,
      consumerSecret: GOODREADS_SECRET,
      callbackURL: CALLBACK_URL,
    },
    (token, tokenSecret, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(() => done(null, { ...profile, token, tokenSecret }));
    }
  )
);

module.exports = passport;
