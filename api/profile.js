const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const ProfileModel = require("../models/ProfileModel");
const bcrypt = require("bcryptjs");
const {
  newFollowerAlert,
  deleteFollowerAlert,
} = require("../utilsServer/notifs");

// GET PROFILE INFO
router.get("/:username", authMiddleware, async (req, res) => {
    try {
      const { username } = req.params;
  
      const user = await UserModel.findOne({ username: username.toLowerCase() });
      if (!user) {
        return res.status(404).send("No User Found");
      }
  
      const profile = await ProfileModel.findOne({ user: user._id }).populate(
        "user"
      );
  
      const followerStats = await FollowerModel.findOne({ user: user._id });
  
      return res.json({
        profile,
  
        numberOfFollowers:
          followerStats.followers.length > 0 ? followerStats.followers.length : 0,
  
        numberFollowing:
          followerStats.following.length > 0 ? followerStats.following.length : 0,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });

  // GET POSTS OF USER
router.get(`/posts/:username`, authMiddleware, async (req, res) => {
    try {
      const { username } = req.params;
  
      const user = await UserModel.findOne({ username: username.toLowerCase() });
      if (!user) {
        return res.status(404).send("No User Found");
      }
  
      const posts = await PostModel.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments.user");
  
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  