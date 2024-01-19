import mongoose from  "mongoose";
import Book from  "./Book.js";
import User from "./User.js";

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
 
    const demoBook={
        bookName:"xyz",
        authorName:"abc",
    }
    const demoUser={
        userName :"Gulkand"
    }
    const demo2User=await User.findOne({userName:"Gulkand"});
    console.log(demo2User);
    demo2User.books.push("65aa269ca99db827ef4ffd49");
    console.log(demo2User);
    await User.insertMany(demoUser);
    await Book.insertMany(demoBook);
    console.log("data was initialized");
  };
  
  initDB();