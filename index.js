import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/student", (req, res) => {
  res.render("student.ejs");
});

app.get("/admin", (req, res) => {
  res.render("admin.ejs");
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("Registered");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(port, () => {
  console.log(`The port ${port} is up and running`);
});
