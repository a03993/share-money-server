const Expense = require("../models/Expense");
const Link = require("../models/Link");
const {
  calculateAndSaveSettlements,
} = require("../utils/calculateSettlements");

exports.getExpenses = async (req, res) => {
  try {
    const { linkId } = req.params;

    const expenses = await Expense.find({ linkId }).populate("payer sharedBy");

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { item, price, payer, sharedBy } = req.body;

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

    await calculateAndSaveSettlements(linkId);

    res.status(201).json(saved);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { expenseId } = req.params;

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    const link = await Link.findOne({ linkId: expense.linkId });
    if (!link) {
      return res.status(404).json({ error: "Link not found" });
    }

    if (link.isSettled) {
      return res.status(400).json({
        error: "This link is settled. Cannot delete expense.",
      });
    }

    const deleted = await Expense.findByIdAndDelete(expenseId);

    await calculateAndSaveSettlements(expense.linkId);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
