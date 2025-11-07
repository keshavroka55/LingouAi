const waitlistModel = require("../models/waitlistModel");

const joinWaitlist = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required to join the waitlist" });
    }

    // ✅ Check if email already exists
    const existingUser = await waitlistModel.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ error: "Email already joined the waitlist" });
    }

    // ✅ Save new waitlist entry
    const newWaitlistEntry = new waitlistModel({ email });
    await newWaitlistEntry.save();

    return res.status(200).json({ message: "Successfully joined waitlist" });
  } catch (error) {
    console.error("Error joining waitlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  joinWaitlist,
};
