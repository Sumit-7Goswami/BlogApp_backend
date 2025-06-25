// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//bussiness logic
 
const mongoose = require('mongoose');

exports.createComment = async (req, res) => {
  try {
    console.log("Create Comment API called"); // log check

    const { post, user, body } = req.body;

    if (!mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }

    const comment = new Comment({ post, user, body });
    const savedComment = await comment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate("comments");

    res.json({ post: updatedPost });

  } catch (err) {
    console.error("Create Comment Error:", err);  // important log
    return res.status(500).json({
      error: "Error while creating comment",
      message: err.message || "Something went wrong"
    });
  }
};
