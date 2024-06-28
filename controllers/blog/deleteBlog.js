const BlogArticle = require("../../models/BlogArticle");
const BlogContent = require("../../models/BlogContent");
const mongoose = require("mongoose");

const deleteBlog = async (req, res) => {
  try {
    const writtenBy = req.user._id;
    const toDeleteBlog = await BlogArticle.findById(req.params.id);
    if (!toDeleteBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (
      writtenBy != toDeleteBlog.writtenBy.toString() &&
      req.user.isAdmin === false
    ) {
      return res.status(404).json({ message: "unauthorized" });
    }
    const blog = await BlogArticle.findByIdAndDelete(req.params.id);

    await BlogContent.deleteMany({
      _id: { $in: blog.contents.map((c) => c.id) },
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBlog;
