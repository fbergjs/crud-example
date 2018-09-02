const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/fbergjs-crud-example",
  { useNewUrlParser: true }
);

const nameSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
});

const User = mongoose.model("User", nameSchema);

// Routy
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/addname", (req, res) => {
  const myData = new User(req.body);
  myData
    .save()
    .then(item => {
      res.send("Meno bolo pridané do databázy");
    })
    .catch(err => {
      res.status(400).send("Nepodarilo sa pridať data do databázy!");
    });
});

app.get("/names", (req, res) => {
  User.find({}, function(err, users) {
    res.send(users);
  });
});

app.listen(port, () => {
  console.log("Server beží na porte " + port);
});
