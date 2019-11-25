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
VALUES ('http://books.google.com/books/content?id=dG1KAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','The Google story','{"David A. Vise","Mark Malseed"}','Here is the story behind one of the most remarkable Internet
  successes of our time. Based on scrupulous research and extraordinary access
  to Google, ...', 'Business & Economics / Entrepreneurship', '9780553804577'),
  ('http://books.google.com/books/content?id=wDO5AAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','The Annals of Science','{"Hamilton Lanphere Smith"}','Vol. 2 includes the transactions of the Cleveland Academy of Natural Sciences.', 'Business & Economics / Entrepreneurship', '5770553804978'),
('http://books.google.com/books/content?id=iZzIIZh03nQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
'The Threat of Race',
'{"David Theo Goldberg"}',
'Written by a renowned scholar of critical race theory, The Threat of Race explores how the concept of race has been historically produced and how it continues to be articulated, if often denied, in today’s world. A major new study of race and racism by a renowned scholar of critical race theory Explores how the concept of race has been historically produced and how it continues to be articulated - if often denied - in today’s world Argues that it is the neoliberal society that fuels new forms of racism Surveys race dynamics throughout various regions of the world - from Western and Northern Europe, South Africa and Latin America, and from Israel and Palestine to the United States',
'Business & Economics / Entrepreneurship',
'5770553804978')
;