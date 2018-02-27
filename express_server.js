const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // default port 8080

const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine", "ejs");


const urlDatabase = {
  "userRandomID": {
    "b2xVn2": "http://www.lighthouselabs.com",
    "9sm5xK": "http://www.google.com"
  },
  "user2RandomID": {
   "9sm5xK": "http://www.google.com"
  }
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

  //console.log(users);

  if (req.cookies["user_id"] === undefined){
    res.status(403).render('urls_login');
  } else {
    let templateVars = {
      user: users[req.cookies["user_id"]]
    };

    res.render("urls_new", templateVars);
    console.log(users[req.cookies["user_id"]]);
    console.log(urlDatabase, 'the urlDatabase as seen in /urls/new');

    }
  });


// --- app.get and app.post '/urls'
app.get("/urls", (req, res) => {
  if (req.cookies["user_id"] === undefined){
    res.status(403).render('urls_login');
  } else {
    let templateVars = {
      urls: urlDatabase[req.cookies["user_id"]],
      user: users[req.cookies['user_id']]
    };

    res.render("urls_index", templateVars);
  }
});

app.post("/urls", (req, res) => {
 let longURLKeyValue = req.body;
 let longURL = longURLKeyValue['longURL'];
 let shortURL = generateRandomString();

 urlDatabase[req.cookies["user_id"]][shortURL] = longURL;

 console.log(urlDatabase[req.cookies["user_id"]][shortURL], 'this should output the scrambled key of new website that user has added');
console.log(shortURL, 'generated key');
console.log(urlDatabase, 'the urlDatabase object');

 res.redirect("urls");
});


app.get("/u/:shortURL", (req, res) => {
 let shortURL = req.params.shortURL;
 let longURL =  urlDatabase[req.cookies["user_id"]][shortURL];
 //urlDatabase[shortURL]

 res.redirect(longURL);
});


app.post("/urls/:id/", (req, res) => {
  urlDatabase[req.cookies["user_id"]][req.params.id] = req.body['newURL'];
  res.redirect('/urls')
});

app.get("/urls/:id", (req, res) => {

 let templateVars = {
   shortURL: req.params.id,
   longURL : urlDatabase[req.cookies["user_id"]][req.params.id],
   user: users[req.cookies["user_id"]]};

 res.render("urls_show", templateVars);
});


app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.cookies["user_id"]][req.params.id];
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


// login creation
app.get("/login", (req, res) =>{
  res.render("urls_login");
});

app.post("/login", (req, res) => {
  let user;
  let logIn = req.body.email;
  let password = req.body.password;

  for (let userKey in users ) {
    if ( logIn === users[userKey]['email'] && password === users[userKey]['password']) {
      user = users[userKey];
    }
  }
  if (user) {
    res.cookie('user_id', user.id);

  } else {
    res.status(403).send("username or password don't match.");
  }

  res.redirect('/urls');
});

app.post("/logout", (req, res) => {
  res.clearCookie('user_id')
  res.redirect('/urls');
});

//registration page
app.get("/register", (req,res) => {
  res.render("user_reg");
});


app.post("/register", (req, res) => {
if(req.body.email === '' || req.body.password === ''){
  res.status(404).send('Not found');
}
for (var userKey in users){
  if(req.body['email'] === users[userKey]['email']) {
    res.status(404).send("This username is taken, friend.");
  }
}
let newID = generateRandomString();
users[newID] = {
  id: newID,
  email: req.body.email,
  password: req.body.password
};

res.cookie("user_id", newID);
console.log(users);
res.redirect("/urls");
});

// cookies get done in registration
// generateRandomString = res.cookie = newID
//wrt logIn, userID is from usersobject


app.listen(PORT, () => {
 console.log(`urlSpeeedDial is dialed in to port ${PORT}!`);
});
