// routes/linkRoutes.js
const express = require("express");
const router = express.Router();
const { createLink, getLink } = require("../controllers/linkController");

router.post("/", createLink);
router.get("/:linkId", getLink);

module.exports = router;
