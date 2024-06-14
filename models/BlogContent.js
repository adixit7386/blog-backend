const mongoose = require("mongoose");

const blogContentSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: { type: String, required: true },
  note: {
    type: String,
    default: "",
  },
});

const BlogContent = mongoose.model("blogContent", blogContentSchema);

module.exports = BlogContent;
