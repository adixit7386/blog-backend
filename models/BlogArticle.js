const mongoose = require("mongoose");

const blogArticleSchema = new mongoose.Schema({
  blogTitle: { type: String, required: true },
  subtitle: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  contents: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "blogContent" },
    },
  ],
  comments: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "blogComment" },
    },
  ],
  domain: {
    type: String,
    required: true,
  },
  likes: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  dislike: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  writtenBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const BlogArticle = mongoose.model("BlogArticle", blogArticleSchema);

module.exports = BlogArticle;
