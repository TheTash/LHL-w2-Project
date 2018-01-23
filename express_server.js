var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.end('Hello!');
});

app.listen(PORT, function(){
  console.log('Example app listening on port', PORT, '!');
});

app.get('/urls', function(req, res){
  let templateVars = { urls: urlDatabase}
  res.render('urls_index', templateVars);
});
app.get('/urls/:id', function(req, res) {
  let templateVars = { shortUrl: req.params.id, longUrl : urlDatabase[req.params.id]};
  res.render("urls_shows", templateVars);
});


app.get('/hello', function (req, res) {
  res.end('<html><body>Hello <b>World</b></body></html>\n');
});
