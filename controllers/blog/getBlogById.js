const BlogArticle = require("../../models/BlogArticle");

const getBlogById = async (req, res) => {
  try {
    const blog = await BlogArticle.findById(req.params.id)
      .populate("contents.id")
      .populate("comments.id");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getBlogById;
