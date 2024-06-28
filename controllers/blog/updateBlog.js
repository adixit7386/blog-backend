const BlogArticle = require("../../models/BlogArticle");
const BlogContent = require("../../models/BlogContent");

const updateBlog = async (req, res) => {
  try {
    // console.log(req.params.id);
    console.log(req.body);
    const { blogTitle, contents, subtitle, thumbnail, domain, writtenBy } =
      req.body;
    const blog = await BlogArticle.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (contents) {
      console.log(contents);
      await BlogContent.deleteMany({
        _id: { $in: blog.contents.map((c) => c.id) },
      });
      const contentDocs = await BlogContent.insertMany(contents);
      blog.contents = contentDocs.map((doc) => ({
        id: doc._id,
      }));
    }

    blog.blogTitle = blogTitle || blog.blogTitle;
    blog.subtitle = subtitle || blog.subtitle;
    blog.thumbnail = thumbnail || blog.thumbnail;
    blog.domain = domain || blog.domain;
    blog.writtenBy = writtenBy || blog.writtenBy;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateBlog;
