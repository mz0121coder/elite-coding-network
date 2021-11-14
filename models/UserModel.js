const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, select: false },

  username: { type: String, required: true, unique: true, trim: true },

  dpLink: { type: String },

  newMessageAlert: { type: Boolean, default: true },

  unreadMsg: { type: Boolean, default: false },

  unreadNotification: { type: Boolean, default: false },

  role: { type: String, default: "user", enum: ["user", "root"] },

  resetToken: { type: String },

  expireToken: { type: Date },
});
