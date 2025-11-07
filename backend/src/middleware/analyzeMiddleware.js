const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");
const checkAttempts = async (req, res, next) => {
    try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Fetch user (exclude password automatically)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.attempts <= 0) {
    return res.status(403).json({ 
      grammarIssues: 0,
      styleSuggestions: 0,
      readabilityScore: 0,
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      issues: [
          {
              type: "Error",
              message: "You are out of credits, login.",
              position: 0,
              severity: "medium"
          }
      ],
      analyzedOptions: "Error",
      timestamp: "2025-11-04T12:12:00.677Z"
      });
    }

    // Deduct one attempt
    user.attempts -= 1;
    await user.save();

    next();

  } catch (error) {
    console.error("Error fetching attempts:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
      grammarIssues: 0,
      styleSuggestions: 0,
      readabilityScore: 0,
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      issues: [
          {
              type: "Error",
              message: "You are out of credits, login.",
              position: 0,
              severity: "medium"
          }
      ],
      analyzedOptions: "Error",
      timestamp: "2025-11-04T12:12:00.677Z"
      });
    }

    res.status(500).json({ 
      grammarIssues: 0,
      styleSuggestions: 0,
      readabilityScore: 0,
      wordCount: 0,
      sentenceCount: 0,
      avgWordsPerSentence: 0,
      issues: [
          {
              type: "Error",
              message: "Server error. Please try again later.",
              position: 0,
              severity: "medium"
          }
      ],
      analyzedOptions: "Error",
      timestamp: "2025-11-04T12:12:00.677Z"
    });
  }
};

module.exports = { checkAttempts };
