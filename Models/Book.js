import mongoose  from "mongoose";
const Schema = mongoose.Schema;
const bookSchema=new Schema({
    bookName :{
        type : String,
        required : true,
    },
    authorName :{
        type: String,
        required : true,
    },
    issueStatus :{
         type : String,
         default : "Available",
    },
    issuedTo:[
         {
            type:Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    issuedDate:{
        type:Date,
        default:Date.now(),
    },
    dueDate:{
        type:Date,
       default: Date.now()+15*24*3600,
    },
    fine:{
        type:Number,
        default:0,
    }
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
