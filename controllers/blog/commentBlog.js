const BlogArticle = require("../../models/BlogArticle");
const BlogComment = require("../../models/BlogComment");

const mongoose = require("mongoose");

const commentBlog = async (req, res) => {
  try {
    //get the details
    const blogId = req.params.id;
    const username = req.body.username;
    const { comment } = req.body;
    //save the comment
    try {
      const blog = await BlogArticle.findById(blogId);
      if (!blog) {
        // console.log(blog);
        res.status(500).json("Blog Not Found");
      }
      const newComment = new BlogComment({
        username: new mongoose.Types.ObjectId(username),
        comment: comment,
      });
      const commentDocs = await newComment.save();
      //   console.log(commentDocs._id);
      blog.comments.push({ id: commentDocs._id });
      await blog.save();
      res.status(201).json("Data saved successfully");
    } catch (error) {
      res.status(201).json(error.message);
    }

    //link the comment to the blog
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = commentBlog;
