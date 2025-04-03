const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/:linkId", getExpenses);
router.post("/:linkId", createExpense);
router.delete("/:expenseId", deleteExpense);

module.exports = router;
