'use strict'

//psql -d app_name -f schema.sql where app_name is your app
//heroku pg:psql --app app_name < schema.sql

const express = require('express');
const app = express();
const superagent = require('superagent');
require('dotenv').config();
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3000;

//tells express to use the built-in rules for ejs 
app.set('view engine', 'ejs');  

//tells express to find static files (like css) in the public dir
app.use(express.static('public')); 

//tells express to read all incoming body info (from the Books api)
app.use(express.urlencoded({extended:true}));

//connect to the SQL server; if unsuccessful, throw an error
client.connect();
client.on('error', err => console.error(err));

//Routes
app.get('/', buildIndex);
app.get('/search', newSearch);
app.post('/searchresults', searchAPI);
app.get('/book/:book_id', getOneBook);

//Helper Functions

async function getOneBook(req,res){
  let sql = 'SELECT * FROM books WHERE id=$1;'
  let result = await client.query(sql,[req.params.book_id]);
  res.render('pages/book', {searchResults:result.rows});
}

async function buildIndex(req,res){
  let sql = 'SELECT * FROM books;';
  let result = await client.query(sql);
  console.log('result.rows[0]: ', result.rows[0]);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  res.render('pages/index', {searchResults:result});
}

function newSearch(req, res){ //renders the search.ejs file in pages dir 
  res.render('pages/search')
}

async function searchAPI(req, res){
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';  //this is not the full URL
  //these if statements determine the rest of the URL
  if(req.body.search[1] === 'title' ) {url += `intitle:${req.body.search[0]}`;}
  if(req.body.search[1] === 'author' ) {url += `inauthor:${req.body.search[0]}`;}
  try{
    //wait for the result of the API call
    let result = await superagent.get(url);
    console.log('result.body.items: ', result.body.items);
    console.log('result.body.items[3].volumeInfo.categories: ', result.body.items[0].volumeInfo.categories);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    //instantiate book objects, and assign those objects to a new array
    let bookArray = result.body.items.map(bookResult => new Book(bookResult.volumeInfo));
    //console log the first book to make sure schema is ok
    console.log('bookArray[0]): ', bookArray[0]);

    //pass the array of book objects back to the response
    res.render('pages/searchresults', {searchResults:bookArray});
  }
  catch{
    //if something goes wrong, say something.
    errorHandler('Something has gone awry.', req, res);
  }
}

//Book constructor
function Book(info){
  this.image = info.imageLinks.thumbnail;
  this.title = info.title || 'No title available';
  this.authors = info.authors;
  this.description = info.description;
  this.isbn = info.industryIdentifiers[1].identifier; // isbn 13
  this.shelf = info.categories;
}

//DON'T FORGET TO HANDLE ERRORS!!!!

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

function errorHandler(error, req, res) {
  res.status(500).send(error);
  // res.render('pages/error');
}

app.listen(PORT, () => console.log(`server up on ${PORT}`));