const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working");
});

app.post("/signin", (req, res) => {
  signIn.handlesignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleregister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleprofile(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleimage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleimageurl(req, res);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("app is running on port 5000");
});
