var express = require("express"); // the API will invoke req.params and make routes around the webpage
var app = express();

var PORT = process.env.PORT || 8080; // default port 8080
app.set("view engine", "ejs");


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.end("Hello!");
  //this is the landing page of the website
});

app.listnen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
// the website address
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
