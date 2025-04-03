const express = require("express");
const router = express.Router();
const { getUsers, createUsers } = require("../controllers/userController");

router.get("/:linkId", getUsers);

router.post("/:linkId", createUsers);

module.exports = router;
