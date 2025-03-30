// routes/linkRoutes.js
const express = require("express");
const router = express.Router();
const { createLink, getLinkDetails } = require("../controllers/linkController");

router.post("/", createLink);
router.get("/:linkId", getLinkDetails);

module.exports = router;
