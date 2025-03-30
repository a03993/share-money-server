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
    if (!link) return res.status(404).json({ error: "Link not found" });

    const users = await User.find({ linkId });

    const expenses = await Expense.find({ linkId })
      .populate("payer", "name color")
      .populate("sharedBy", "name");

    const settlements = await Settlement.find({ linkId })
      .populate("payer", "name color")
      .populate("payee", "name color");

    res.json({
      linkId: link.linkId,
      createdAt: link.createdAt,
      expiresAt: link.expiresAt,
      isSettled: link.isSettled,
      users,
      expenses,
      settlements,
    });
  } catch (error) {
    console.error("Error fetching link details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
