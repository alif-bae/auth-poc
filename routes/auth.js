const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { userCreate } = require("../controllers/userController");
const passport = require("passport");

function login(req, res) {
  const token = jwt.sign(
    {
      sub: req.body.email,
    },
    "supersecret"
  );

  res.status(200).json({ token: token });
}

function signup(req, res) {
  userCreate(req, res);
}

router.post("/login", passport.authenticate("local", { session: false }), login);
router.post("/signup", signup);

module.exports = router;
