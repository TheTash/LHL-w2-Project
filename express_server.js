var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
var bodyParser = require('body-parser');

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; i--){
    return result;
  }
}
var rstring = generateRandomString(6,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

app.set('view engine', 'ejs');


app.listen(PORT, function(){
  console.log('Example app listening on port', PORT, '!');
});

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function (req, res) {
  res.end('Hello!');
});

app.get('/urls', function(req, res){
  let templateVars = { urls: urlDatabase}
  res.render('urls_index', templateVars);
});

app.get("/urls/new", function (req, res) {
  res.render("urls_new");
});
app.post("/urls", (req, res) => {
  console.log(req.body);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});
app.get('/urls/:id', function(req, res) {
  let templateVars = { shortUrl: req.params.id, longUrl : urlDatabase[req.params.id]};
  res.render("urls_shows", templateVars);
});

app.get('/hello', function (req, res) {
  res.end('<html><body>Hello <b>World</b></body></html>\n');
});
