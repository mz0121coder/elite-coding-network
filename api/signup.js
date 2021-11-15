const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");
const NotificationModel = require("../models/NotificationModel");
const ChatModel = require("../models/ChatModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const userPng =
  "https://res.cloudinary.com/dg997wl2l/image/upload/v1636133790/user_default_y3bzvv.png";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 1) return res.status(401).send("Invalid");

    if (!regexUserName.test(username)) return res.status(401).send("Invalid");

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) return res.status(401).send("Username already taken");

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    email,
    username,
    password,
    bio,
    github,
    at,
    connectdevelop,
    linkify,
  } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");

  if (password.length < 6) {
    return res.status(401).send("Password must be at least 6 characters");
  }

  try {
    let user;
    user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) {
      return res.status(401).send("User already registered");
    }

    user = await UserModel.findOne({ username: username.toLowerCase() });
    if (user) {
      return res.status(401).send("Username already taken");
    }

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      dpLink: req.body.dpLink || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileSections = {};
    profileSections.user = user._id;

    profileSections.bio = bio;

    profileSections.social = {};
    if (github) profileSections.social.github = github;
    if (at) profileSections.social.at = at;
    if (linkify) profileSections.social.linkify = linkify;
    if (connectdevelop) profileSections.social.connectdevelop = connectdevelop;

    await new ProfileModel(profileSections).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();
    await new NotificationModel({ user: user._id, notifications: [] }).save();
    await new ChatModel({ user: user._id, chats: [] }).save();

    const payload = { userId: user._id };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
