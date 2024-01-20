import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./Models/User.js";
import Book from "./Models/Book.js";
import methodOverride from "method-override";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
const MONGO_URL = "mongodb://127.0.0.1:27017/library";
const date = new Date();
date.setHours(0, 0, 0, 0);
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}
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

app.get("/admin", async (req, res) => {
  const bookDatas = await Book.find();
  console.log(bookDatas);

  res.render("admin.ejs", { bookDatas });
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

let UserId = null;
app.post("/login", async (req, res) => {
  //   console.log(req.body);
  const { username, password } = req.body;
  const user = await User.findOne({ userName: username });
  //console.log(user);
  UserId = user._id;
  if (
    user.role == 0 &&
    user.userName === username &&
    user.password === password
  ) {
    res.redirect("/admin");
  } else if (user.userName === username && user.password === password) {
    res.redirect("/student");
  } else {
    res.redirect("/login");
  }
  //   console.log(user);
});

//LOGOUT USER
app.get("/logout", (req, res) => {
  res.redirect("/");
});

//issue books
app.get("/issue", (req, res) => {
  res.render("issue.ejs");
});
app.post("/issue", async (req, res) => {
  console.log(req.body.id);
  const booktoadd = await Book.findById(req.body.id);
  const user = await User.findById(UserId);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const dateString = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  booktoadd.issueStatus = "Issued";
  booktoadd.issuedTo = user.userName;
  booktoadd.issuedDate = dateString;
  let a = Number(dateString.charAt(dateString.length - 1));
  let b = Number(dateString.charAt(dateString.length - 2));

  booktoadd.dueDate = dateString;
  console.log(booktoadd);
  await user.books.push(booktoadd);
  user.save();
  res.redirect("/student");
});

app.listen(port, () => {
  console.log(`The port ${port} is up and running`);
});

app.post("/admin", async (req, res) => {
  const { bookName, authorName } = req.body;
  const newBook = new Book({
    bookName: bookName,
    authorName: authorName,
  });
  let result = await newBook.save();
  //   console.log(result);
  res.redirect("/admin");
});

app.delete("/books/:id", async (req, res) => {
  console.log(req.params);
  let { id } = req.params;
  console.log("hello");
  //  res.send(req.params) ;
  const book = await Book.findById(id);
  console.log(book);
  await Book.findByIdAndDelete(id);

  res.redirect("/admin");
});

//SEarch an item
app.get("/search", (req, res) => {
  res.render("search.ejs");
});
app.post("/search", async (req, res) => {
  //console.log(req.body);
  const bookid = req.body.id;
  const data = await Book.findById(bookid);
  console.log(data);
  res.render("searchresult.ejs", { data });
});
