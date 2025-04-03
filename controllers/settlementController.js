const Expense = require("../models/Expense");
const Settlement = require("../models/Settlement");
const Link = require("../models/Link");

exports.getSettlements = async (req, res) => {
  try {
    const { linkId } = req.params;
    const settlements = await Settlement.find({ linkId });
    res.status(200).json(settlements);
  } catch (error) {
    console.error("Error fetching settlements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateSettlement = async (req, res) => {
  try {
    const { settlementId } = req.params;
    const { status } = req.body;

    if (!["pending", "done"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedSettlement = await Settlement.findByIdAndUpdate(
      settlementId,
      { status },
      { new: true }
    );

    if (!updatedSettlement) {
      return res.status(404).json({ error: "Settlement not found" });
    }

    if (status === "done") {
      await Link.findOneAndUpdate(
        { linkId: updatedSettlement.linkId },
        { isSettled: true }
      );
    }

    res.status(200).json(updatedSettlement);
  } catch (error) {
    console.error("Error updating settlement:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
