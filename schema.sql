DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  image text,
  title text,
  authors text,
  description text,
  shelf text
);

INSERT INTO books (image, title, authors, description, shelf)
VALUES ('http://placehold.it/128x200','test-title','test-authors','test_description','Top Shelf');