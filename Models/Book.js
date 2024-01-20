import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  issueStatus: {
    type: String,
    default: "Available",
  },
  issuedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  issuedDate: {
    type: String,
  },
  dueDate: {
    type: String,
  },
});
const Book = mongoose.model("Book", bookSchema);
export default Book;
