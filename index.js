import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./Models/User.js";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

const MONGO_URL = "mongodb://127.0.0.1:27017/library";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/student", async (req, res) => {
  const studentBooks = await User.findOne(req.body.userName).populate("books");
  const books = studentBooks.books;
  res.render("student.ejs", { books, studentBooks });
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const newUser = new User({
    userName: username,
    password,
    role: 1,
  });
  let result = await newUser.save();
  //   console.log(result);
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  const user = await User.findOne({ userName: username });
  if (user.userName === username && user.password === password) {
    res.redirect("/student");
  } else {
    res.redirect("/login");
  }
  //   console.log(user);
});

app.post("/issue", (req, res) => {
  console.log(req.body);
  res.send("dfdf");
});

app.listen(port, () => {
  console.log(`The port ${port} is up and running`);
});
