const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/userController");

router.get("/:linkId", getUsers);

router.post("/:linkId", createUser);

module.exports = router;
