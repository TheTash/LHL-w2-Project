const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000; // default port 8080


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs",
 "9sm5xK": "http://www.google.com"
};


function generateRandomString() {
 var newURL = 6;
 var charSet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 result= "";
    for( var i = 0; i < newURL; i++ )
       result += charSet[Math.floor(Math.random() * charSet.length)];
   return result;
}

app.get("/urls/new", (req, res) => {
 res.render("urls_new");
});

app.post("/urls", (req, res) => {
 let longURLKeyValue = req.body;
 let longURL = longURLKeyValue['longURL'];
 let shortURL = generateRandomString();
 urlDatabase[shortURL] = longURL;
 res.redirect("urls");
});

app.get("/u/:shortURL", (req, res) => {
 let shortURL = req.params.shortURL;
 let longURL = urlDatabase[shortURL];
 res.redirect(longURL);
});


app.get("/urls/:id", (req, res) => {
 let templateVars = { shortURL: req.params.id, longURL : urlDatabase[req.params.id]};
 res.render("urls_show", templateVars);
});


app.get("/urls", (req, res) => {
 let templateVars = { urls: urlDatabase };
 console.log(templateVars)
 res.render("urls_index", templateVars);
});
app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect("/urls/");
})

app.get("/", (req, res) => {
 res.end("welcome to urlSpeeedDial!");
});

app.get("/urls.json", (req, res) => {
 res.json(urlDatabase);
});
app.get("/hello", (req, res) => {
 res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
 console.log(`urlSpeeedDial dialing into port ${PORT}!`);
});


//params = collection of the url object
// giving a new site an old key
app.post("/urls/", (req, res) => {
  urlDatabase[req.params.s] = req.body['newURL'];
  console.log(urlDatabase);
  res.redirect('/urls')
})

// login creation
app.post("/login", (req, res) => {
  let logIn = req.body['username'];
  console.log(logIn);
  res.cookie('username', logIn);
  res.redirect('/urls');
});
