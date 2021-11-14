const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const uuid = require("uuid").v4;
const {
  newLikeAlert,
  deleteLikeAlert,
  newCommentAlert,
  deleteCommentAlert,
} = require("../utilsServer/notifs");

// CREATE A POST

router.post("/", authMiddleware, async (req, res) => {
    const { text, location, picUrl } = req.body;
  
    if (text.length < 1)
      return res.status(401).send("Text must be at least 1 character");
  
    try {
      const newPost = {
        user: req.userId,
        text,
      };
      if (location) newPost.location = location;
      if (picUrl) newPost.picUrl = picUrl;
  
      const post = await new PostModel(newPost).save();
  
      const postAdded = await PostModel.findById(post._id).populate("user");
  
      return res.json(postAdded);
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });