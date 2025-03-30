const Link = require("../models/Link");
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
