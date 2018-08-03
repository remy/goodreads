# Goodreads review JSON export

A mini project to collect all my [Goodread](https://www.goodreads.com/api/index#reviews.list) book reviews in a JSON format. As I intend to publish these on my own site one day.

## Usage

Currently hosted on [goodreads.isthe.link](https://goodreads.isthe.link), but you can host it yourself locally or anywhere else.

1. Auth at `/auth`
2. Visit `/reviews` to get a JSON object of the last 200 books you reviewed in your _read_ shelf.
3. Do as you please with your JSON.

## Notes

- The instance is ephemeral and thus the sessions only last as long as the instance is running. Upon wake or new deploys old sessions will be trashed. Sorry!
