const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");

router.get("/:searchInput", authMiddleware, async (req, res) => {
  try {
    const { searchInput } = req.params;
    const { userId } = req;
    if (searchInput.length === 0) return;

    const results = await UserModel.find({
      name: { $regex: searchInput, $options: "i" },
      $nor: [{ _id: userId }],
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
});

module.exports = router;
