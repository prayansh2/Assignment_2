const Astrologer = require("../models/astrologerModel");


exports.createAstrologer = async (req, res) => {
  try {
    const astrologer = new Astrologer({
      name: req.body.name,
      rating: req.body.rating,
      isTopAstrologer: req.body.isTopAstrologer || false,
    });

    await astrologer.save();
    res.json({ success: true, astrologerId: astrologer._id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating astrologer" });
  }
};

exports.setAstrologerPriority = async (req, res) => {
  try {
    const { astrologerId, isTopAstrologer } = req.body;

    await Astrologer.findByIdAndUpdate(astrologerId, { isTopAstrologer });
    res.json({ success: true, message: "Astrologer priority updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating astrologer priority" });
  }
};
