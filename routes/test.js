const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validateUrlPathParam } = require("../utils/argUtil");

const { User, Role } = require("../models");

router.get("/", async (req, res) => {
  role = await Role.findByPk(1);
  res.json(role);
});

module.exports = router;
