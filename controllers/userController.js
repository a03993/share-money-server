const User = require("../models/User");
const Link = require("../models/Link");

exports.getUsers = async (req, res) => {
  try {
    const { linkId } = req.params;

    const link = await Link.findOne({ linkId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    const users = await User.find({ linkId });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { name, color } = req.body;

    if (!name || !color) {
      return res.status(400).json({ error: "name and color are required" });
    }

    const link = await Link.findOne({ linkId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    const newUser = new User({
      name,
      color,
      linkId,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
