const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { distributeUserToAstrologer } = require("../services/flowService");


exports.registerUser = async (req, res) => {
  console.log("request...")
  try {
    const user = new User({ name: req.body.name, password: req.body.password });
    await user.save();
    res.json({ success: true, userId: user._id });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    console.log(user)
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jsonwebtoken.sign({ userId: user._id }, "processenvJWT_SECRET", { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in login" });
  }
};


exports.connectUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const result = await distributeUserToAstrologer(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error connecting user" });
  }
};
