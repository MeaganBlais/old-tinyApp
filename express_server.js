const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 8080; // default port 8080
var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

function generateRandomString() {
  let result = '';
  let charset = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i=0; i < 6; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

//  DELETE TESTING FEATURE
// app.get('/test', (req, res) => {
//   res.send(generateRandomString())
// })
//  DELETE TESTING FEATURE

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  console.log(45, req.cookies.username);
  let templateVars = {
    username: req.cookies["username"],
    urls: urlDatabase
  };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];  //REVEIW THIS FOR SOLID UNDERSTANDING
  res.redirect(longURL);
});

app.get('/urls/:id', (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render('urls_show', templateVars);
});

app.post('/urls', (req, res) => {
  console.log(req.body); //debug stmt to see POST parameteres
  res.send('Ok'); //placeholder? - we will replace this
});

app.post('/login', (req, res) => {
  console.log('/login', req.body); //test
  res.cookie('username', req.body.username); // set cookie name and value
  res.redirect('/urls');
}); 

app.post('/urls/:id', (req, res) => {
  console.log('you did it!');
  res.redirect('/urls');
});

app.post('/urls/:id/delete', (req, res) => {
  delete urlDatabase[req.params.id];
  // delete urls['id']; --- this is incorrect code. there is no 'id', it is simply a container waiting for input
  res.redirect('/urls');
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
