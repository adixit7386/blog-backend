const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogComment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blogComment", commentSchema);
