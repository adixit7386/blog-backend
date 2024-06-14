const BlogArticle = require("../../models/BlogArticle");
const mongoose = require("mongoose");

const dislikeBlog = async (req, res) => {
  try {
    // console.log(req.user._id);
    const userId = new mongoose.Types.ObjectId(req.user._id);
    // console.log(userId);
    const blog = await BlogArticle.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if userId already exists in the dislike array
    if (blog.dislike.some((dislike) => dislike.id.equals(userId))) {
      // console.log("userid already exists");
      return res.status(200).json(blog);
    }

    // Check if userId exists in the likes array and remove it
    blog.likes = blog.likes.filter((like) => !like.id.equals(userId));

    // Add userId to the dislike array
    blog.dislike.push({ id: userId });
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = dislikeBlog;
