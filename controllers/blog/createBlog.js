const BlogArticle = require("../../models/BlogArticle");
const BlogContent = require("../../models/BlogContent");
const mongoose = require("mongoose");

const createBlog = async (req, res) => {
  try {
    const { blogTitle, contents, subtitle, thumbnail, domain } = req.body;
    // console.log(blogTitle, contents);
    const writtenBy = new mongoose.Types.ObjectId(req.user._id);
    const contentDocs = await BlogContent.insertMany(contents);
    const contentIds = contentDocs.map((doc) => ({ id: doc._id }));

    const blogArticle = new BlogArticle({
      blogTitle,
      contents: contentIds,
      subtitle,
      thumbnail,
      domain,
      writtenBy: writtenBy,
    });
    await blogArticle.save();

    res.status(201).json(blogArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = createBlog;
