const mongoose = require("mongoose");

const astrologerSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  connections: { type: Number, default: 0 },
  isTopAstrologer: { type: Boolean, default: false },
});

const Astrologer = mongoose.model("Astrologer", astrologerSchema);
module.exports = Astrologer;
