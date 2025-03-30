const express = require("express");
const router = express.Router();
const { createExpense } = require("../controllers/expenseController");

router.post("/:linkId", createExpense);

module.exports = router;
