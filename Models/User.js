import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Book from "./Book.js";
const userSchema=new Schema({
    userName :{
        type : String,
        required : true,
    },
    books :[
       {
        type:Schema.Types.ObjectId,
        ref : "Book",
       }
    ]
    
});
const User = mongoose.model("User", userSchema);
export default User;
