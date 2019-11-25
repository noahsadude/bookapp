DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  image text,
  title text,
  authors text[],
  description text,
  shelf text,
  isbn text
);

INSERT INTO books (image, title, authors, description, shelf, isbn)
VALUES ('https://books.google.com/books?id=zyTCAlFPjgYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','The Google story','{"David A. Vise","Mark Malseed"}','Here is the story behind one of the most remarkable Internet
  successes of our time. Based on scrupulous research and extraordinary access
  to Google, ...', 'Business & Economics / Entrepreneurship', '9780553804577'),
  ;