const express = require("express");
const { analyzeText } = require("../controllers/analyzeController");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const { checkAttempts } = require("../middleware/analyzeMiddleware");

// User must be logged in and have attempts
router.post("/check", checkAttempts, analyzeText);

module.exports = router;
