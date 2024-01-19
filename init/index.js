import mongoose from "mongoose";
import Book from "../Models/Book.js";
import data from "./booksdata.js";

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

const initDB = async () => {
  console.log(data);
  await Book.deleteMany({});
  await Book.insertMany(data.data);
  console.log("data was initialized");
};

initDB();
