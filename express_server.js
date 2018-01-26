const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // default port 8080

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine", "ejs");


const urlDatabase = {
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
/*
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
*/

app.get("/urls/new", (req, res) => {
  let templateVars = {login: req.cookies["user_id"]};
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
 let templateVars = { shortURL: req.params.id, longURL : urlDatabase[req.params.id], login: req.cookies['username']};//<<<===
 res.render("urls_show", templateVars);
});


app.get("/urls", (req, res) => {
 let templateVars = { urls: urlDatabase, login: req.cookies['username'] };//<====

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
app.get("/login", (req, res) =>{
  res.render("/urls_login.ejs");
})

app.post("/login", (req, res) => {
  let logIn = req.body['username'];
  res.cookie('username', logIn); //<====
  res.redirect('/urls');
});
app.post("/logout", (req, res) => {
  let logout = req.body['username'] //<====
  res.clearCookie('username', logout)
  res.redirect('/urls');
});

//registration page
app.get("/register", (req,res) => {
  res.render("user_reg");
});


app.post("/register", (req, res) => {

if(!req.body.email || !req.body.pass){
  res.status(404).send('Not found');
}
for (var userKey in users){
if(req.body['email'] == users[userKey]['email']){
  res.status(404).send("username and password don't match, friend.");
}
}
let newID = generateRandomString();
users[newID] = {
  id: newID,
  email: req.body['email'],
  password: req.body['pass']
};
res.cookie("user_id", newID);  /// WHERE THE MAGIC HAPPENS "users_id stores value of newID"

res.redirect("/urls");
});

// cookies get doen in registration
// generateRandomString = res.cookie = newID
//wrt logIn, userID is from usersobject
