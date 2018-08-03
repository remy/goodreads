require('@remy/envy');
const goodreads = require('@remy/goodreads-api-node');
const distanceInWordsStrict = require('date-fns/distance_in_words_strict');

module.exports = {
  getReviews,
};

function getReviews({ id, token, secret }) {
  const gr = goodreads({
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET,
  });

  gr.initOAuth(process.env.CALLBACK_URL); // doesn't do anything, but required hack
  gr.setAccessToken({ token, secret });

  return gr
    .getReviewsByUser(id, {
      v: 2,
      shelf: 'read',
      per_page: 200,
      sort: 'date_read',
    })
    .then(res => {
      return res.reviews.review
        .filter(({ body }) => body.trim())
        .map(
          ({ body, rating, started_at, read_at, spoiler_flag, url, ..._ }) => ({
            book: {
              author: _.book.authors.author.name,
              title: _.book.title,
              image: _.book.image_url,
              url: _.book.link,
              description: _.book.description.trim().replace(/<br \/>/g, '\n'),
            },
            review: body.trim().replace(/<br \/>/g, '\n'),
            rating,
            spoiler: spoiler_flag,
            started_at,
            read_at,
            duration:
              started_at && read_at
                ? distanceInWordsStrict(new Date(started_at), new Date(read_at))
                : 'unknown',
            url,
          })
        );
    });
}
