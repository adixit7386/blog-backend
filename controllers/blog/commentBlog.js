const BlogArticle = require("../../models/BlogArticle");
const BlogComment = require("../../models/BlogComment");
const User = require("../../models/User");

const mongoose = require("mongoose");

const commentBlog = async (req, res) => {
  try {
    //get the details
    const blogId = req.params.id;
    const user = await User.findById(req.user._id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const username = user.username;
    const { comment } = req.body;
    //save the comment
    try {
      const blog = await BlogArticle.findById(blogId);
      if (!blog) {
        // console.log(blog);
        res.status(500).json("Blog Not Found");
      }
      const newComment = new BlogComment({
        username: user._id,
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
