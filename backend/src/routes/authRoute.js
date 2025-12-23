const express = require("express");
const { authenticateUser } = require('../middleware/authMiddleware');
const { register, login, getAllUsers, getAttempts } = require("../controllers/authController");
const router = express.Router();

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

router.get("/getallusers", getAllUsers);

router.get("/credits",authenticateUser, getAttempts)

module.exports = router;