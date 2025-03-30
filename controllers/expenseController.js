const Expense = require("../models/Expense");
const Link = require("../models/Link");

exports.createExpense = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { item, price, payer, sharedBy } = req.body;

    // check if link exists & if it's settled
    const link = await Link.findOne({ linkId });
    if (!link) return res.status(404).json({ error: "Link not found" });
    if (link.isSettled)
      return res
        .status(400)
        .json({ error: "This link is settled. Cannot add expense." });

    if (!item || !price || !payer || !sharedBy || sharedBy.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const expense = new Expense({
      item,
      price,
      payer,
      sharedBy,
      linkId,
    });

    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
