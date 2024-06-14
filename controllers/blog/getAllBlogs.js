const BlogArticle = require("../../models/BlogArticle");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogArticle.find().populate("contents.id");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllBlogs;
