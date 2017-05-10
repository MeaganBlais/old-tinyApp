const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080; // default port 8080

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));


function generateRandomString() {
  let result = '';
  let charset = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i=0; i < 6; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

 //DELETE TESTING FEATURE
app.get('/test', (req, res) => {
  res.send(generateRandomString())
})

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
  let templateVars = {urls: urlDatabase};
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:id', (req, res) => {
  let templateVars = { shortURL: req.params.id };
  res.render('urls_show.ejc', templateVars);
});

app.post('/urls', (req, res) => {
  console.log(req.body); //debug stmt to see POST parameteres
  res.send('Ok'); //placeholder? - we will replace this
});

app.listen(PORT, () => {
  console.log('Example app listening on port ${PORT}!');
});
