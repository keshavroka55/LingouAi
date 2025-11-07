const express = require("express");
const router = express.Router();
const { joinWaitlist } = require("../controllers/waitlistController");


// User must be logged in and have attempts
router.post("/join", joinWaitlist);

module.exports = router;
