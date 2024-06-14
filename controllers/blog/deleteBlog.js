const BlogArticle = require("../../models/BlogArticle");
const BlogContent = require("../../models/BlogContent");

const deleteBlog = async (req, res) => {
  try {
    const blog = await BlogArticle.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await BlogContent.deleteMany({
      _id: { $in: blog.contents.map((c) => c.id) },
    });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteBlog;
