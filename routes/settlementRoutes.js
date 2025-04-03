const express = require("express");
const router = express.Router();
const {
  getSettlements,
  updateSettlement,
} = require("../controllers/settlementController");

router.get("/:linkId", getSettlements);
router.patch("/:settlementId", updateSettlement);

module.exports = router;
