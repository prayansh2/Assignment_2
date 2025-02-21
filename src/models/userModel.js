const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  connectedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer", default: null },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
