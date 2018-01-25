var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000; // default port 8080

var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine", "ejs");


var urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs.com",
 "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

function generateRandomString() {
 var newURL = 6;
 var charSet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 var result= "";
    for( var i = 0; i < newURL; i++ )
       result += charSet[Math.floor(Math.random() * charSet.length)];
   return result;
}

app.get("/urls/new", (req, res) => {
  let templateVars = {login: req.cookies['username']};
 res.render("urls_new", templateVars);
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
 console.log(longURL)
});

app.post("/urls/:id/", (req, res) => {
  urlDatabase[req.params.id] = req.body['newURL'];
  console.log(urlDatabase);
  res.redirect('/urls')
})

app.get("/urls/:id", (req, res) => {
 let templateVars = { shortURL: req.params.id, longURL : urlDatabase[req.params.id], login: req.cookies['username']};
 res.render("urls_show", templateVars);
});


app.get("/urls", (req, res) => {
 let templateVars = { urls: urlDatabase, login: req.cookies['username'] };
 console.log(templateVars)
 res.render("urls_index", templateVars);
});

app.post("/urls/:id/delete", (req, res) => {
  let shortURL = req.params.id;
  delete urlDatabase[shortURL];
  res.redirect("/urls");
})

app.get("/", (req, res) => {
 res.end("Mahalo!");
});

app.get("/urls.json", (req, res) => {
 res.json(urlDatabase);
});
app.get("/hello", (req, res) => {
 res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
 console.log(`urlSpeeedDial is dialed in to port ${PORT}!`);
});

// login creation


app.post("/login", (req, res) => {
  let logIn = req.body['username'];
  res.cookie('username', logIn);
  res.redirect('/urls');
});
app.post("/logout", (req, res) => {
  let logout = req.body['username']
  res.clearCookie('username', logout)
  res.redirect('/urls');
})

//registration page
app.get("/register", (req,res) => {
  res.render("user_reg");
})

app.post("/register", (req, res) => {
  let newUser = req.body["email"]
  console.log(newUser, 'email');
  res.cookie('email');
  res.render("user_reg");
});
