const BlogArticle = require("../../models/BlogArticle");
const mongoose = require("mongoose");

const likeBlog = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const blog = await BlogArticle.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if userId already exists in the likes array
    if (blog.likes.some((like) => like.id.equals(userId))) {
      return res.status(200).json("blog liked successfully");
    }

    // Check if userId exists in the dislike array and remove it
    blog.dislike = blog.dislike.filter((dislike) => !dislike.id.equals(userId));

    // Add userId to the likes array
    blog.likes.push({ id: userId });
    await blog.save();

    res.status(200).json("blog liked successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = likeBlog;
