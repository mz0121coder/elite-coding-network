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

  // GET ALL POSTS

router.get("/", authMiddleware, async (req, res) => {
    const { pageNumber } = req.query;
  
    try {
      const number = Number(pageNumber);
      const size = 8;
      const { userId } = req;
  
      const loggedUser = await FollowerModel.findOne({ user: userId }).select(
        "-followers"
      );
  
      let posts = [];
  
      if (number === 1) {
        if (loggedUser.following.length > 0) {
          posts = await PostModel.find({
            user: {
              $in: [
                userId,
                ...loggedUser.following.map((following) => following.user),
              ],
            },
          })
            .limit(size)
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        }
        //
        else {
          posts = await PostModel.find({ user: userId })
            .limit(size)
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        }
      }
  
      //
      else {
        const skips = size * (number - 1);
  
        if (loggedUser.following.length > 0) {
          posts = await PostModel.find({
            user: {
              $in: [
                userId,
                ...loggedUser.following.map((following) => following.user),
              ],
            },
          })
            .skip(skips)
            .limit(size)
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        }
        //
        else {
          posts = await PostModel.find({ user: userId })
            .skip(skips)
            .limit(size)
            .sort({ createdAt: -1 })
            .populate("user")
            .populate("comments.user");
        }
      }
  
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });

  
// GET POST BY ID

router.get("/:postId", authMiddleware, async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.postId)
        .populate("user")
        .populate("comments.user");
  
      if (!post) {
        return res.status(404).send("Post not found");
      }
  
      return res.json(post);
    } catch (error) {
      console.error(error);
      return res.status(500).send(`Server error`);
    }
  });