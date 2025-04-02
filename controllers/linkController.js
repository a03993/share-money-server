const Link = require("../models/Link");
const User = require("../models/User");
const Expense = require("../models/Expense");
const Settlement = require("../models/Settlement");
const { nanoid } = require("nanoid");

exports.createLink = async (req, res) => {
  try {
    const now = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(now.getMonth() + 1);

    const customLinkId = `lets-shared-on-${nanoid(10)}`;

    const newLink = new Link({
      linkId: customLinkId,
      createdAt: now,
      expiresAt: oneMonthLater,
    });

    const savedLink = await newLink.save();

    res.status(201).json(savedLink);
  } catch (error) {
    console.error("Error creating link:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getLinkDetails = async (req, res) => {
  try {
    const { linkId } = req.params;

    const link = await Link.findOne({ linkId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    const users = await User.find({ linkId });

    const expenses = users.map((user) => ({
      ...user.toObject(),
      personalExpenses: [],
    }));

    res.status(200).json({
      ...link.toObject(),
      expenses,
    });
  } catch (err) {
    console.error("Error fetching link:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
