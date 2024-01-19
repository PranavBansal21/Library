import mongoose from "mongoose";
import Book from "./Models/Book.js";
import data from "./init/booksdata.js";
import User from "./Models/User.js";

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

const init = async () => {
  const user = await User.findById("65aa42263c6632faab5d71f3");
  console.log(user);
  await user.books.push("65aa699efcef99c28356e7ed");
  await user.books.push("65aa699efcef99c28356e7ee");
  user.save();
  console.log(user);
};
init();
