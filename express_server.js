var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs")

var urlDatabase = {
 "b2xVn2": "http://www.lighthouselabs.ca",
 "9sm5xK": "http://www.google.com"
};


function generateRandomString() {
 var newURL = 6;//the size of string
 var charSet = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //from where to create
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
 console.log("trying to get value " + longURL);
 let shortURL = generateRandomString();
 urlDatabase[shortURL] = longURL;
 console.log(urlDatabase);

 res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

///// --------------- Check this OUTTTT
app.get("/u/:shortURL", (req, res) => {
 let shortURL = req.params.shortURL;
 let longURL = urlDatabase[shortURL];
 res.redirect(longURL);
});
//////////////////////---------- ___________________

app.get("/urls/:id", (req, res) => {
 let templateVars = { shortURL: req.params.id, longURL : urlDatabase[req.params.id]};
 res.render("urls_show", templateVars);
});
app.post("/urls/:id/delete", (req, res) => {
  // after deleting redirect to urls_index page'/urls'

})

app.get("/urls", (req, res) => {
 let templateVars = { urls: urlDatabase };
 res.render("urls_index", templateVars);
});

app.get("/", (req, res) => {
 res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
 res.json(urlDatabase);
});
app.get("/hello", (req, res) => {
 res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
 console.log(`Example app listening on port ${PORT}!`);
});
