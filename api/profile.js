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

  // GET FOLLOWERS OF USER
router.get("/followers/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId }).populate(
        "followers.user"
      );
  
      return res.json(user.followers);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  // GET FOLLOWING OF USER
router.get("/following/:userId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId }).populate(
        "following.user"
      );
  
      return res.json(user.following);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });

  // FOLLOW A USER
router.post("/follow/:followUserId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
      const { followUserId } = req.params;
  
      const user = await FollowerModel.findOne({ user: userId });
      const toFollow = await FollowerModel.findOne({ user: followUserId });
  
      if (!user || !toFollow) {
        return res.status(404).send("User not found");
      }
  
      const isFollowingUser =
        user.following.length > 0 &&
        user.following.filter(
          (following) => following.user.toString() === followUserId
        ).length > 0;
  
      if (isFollowingUser) {
        return res.status(401).send("User Already Followed");
      }
  
      await user.following.unshift({ user: followUserId });
      await user.save();
  
      await toFollow.followers.unshift({ user: userId });
      await toFollow.save();
  
      await newFollowerAlert(userId, followUserId);
  
      return res.status(200).send("Updated");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  // UNFOLLOW A USER
router.put("/unfollow/:unfollowUserId", authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
      const { unfollowUserId } = req.params;
  
      const user = await FollowerModel.findOne({
        user: userId,
      });
  
      const toUnfollow = await FollowerModel.findOne({
        user: unfollowUserId,
      });
  
      if (!user || !toUnfollow) {
        return res.status(404).send("User not found");
      }
  
      const isFollowingUser =
        user.following.length > 0 &&
        user.following.filter(
          (following) => following.user.toString() === unfollowUserId
        ).length === 0;
  
      if (isFollowingUser) {
        return res.status(401).send("User Not Followed before");
      }
  
      const deleteFollowing = await user.following
        .map((following) => following.user.toString())
        .indexOf(unfollowUserId);
  
      await user.following.splice(deleteFollowing, 1);
      await user.save();
  
      const deleteFollower = await toUnfollow.followers
        .map((follower) => follower.user.toString())
        .indexOf(userId);
  
      await toUnfollow.followers.splice(deleteFollower, 1);
      await toUnfollow.save();
  
      await deleteFollowerAlert(userId, unfollowUserId);
  
      return res.status(200).send("Updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("server error");
    }
  });
  
  // UPDATE PROFILE
router.post("/update", authMiddleware, async (req, res) => {
    try {
      const { userId } = req;
  
      const { bio, github, at, connectdevelop, linkify, dpLink } = req.body;
  
      let profileSections = {};
      profileSections.user = userId;
  
      profileSections.bio = bio;
  
      profileSections.social = {};
  
      if (github) profileSections.social.github = github;
  
      if (at) profileSections.social.at = at;
  
      if (linkify) profileSections.social.linkify = linkify;
  
      if (connectdevelop) profileSections.social.connectdevelop = connectdevelop;
  
      await ProfileModel.findOneAndUpdate(
        { user: userId },
        { $set: profileSections },
        { new: true }
      );
  
      if (dpLink) {
        const user = await UserModel.findById(userId);
        user.dpLink = dpLink;
        await user.save();
      }
  
      return res.status(200).send("Success");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server Error");
    }
  });
  
  
  
  