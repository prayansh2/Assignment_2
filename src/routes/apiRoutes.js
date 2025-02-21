const express = require("express");
const { registerUser, loginUser, connectUser } = require("../controllers/userController");
const { createAstrologer, setAstrologerPriority } = require("../controllers/astrologerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/connect", authMiddleware, connectUser);


router.post("/create-astrologer", createAstrologer);
router.post("/set-priority", setAstrologerPriority);

module.exports = router;
