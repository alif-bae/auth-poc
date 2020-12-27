const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");

// require controllers
const groupController = require("../controllers/groupController");

router.get("/", [passport.authenticate("jwt", { session: false })], groupController.groupList);
router.get("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], groupController.groupDetail);
router.post("/", [passport.authenticate("jwt", { session: false })], groupController.groupCreate);
router.put("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], groupController.groupEdit);
router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), validatePathParam],
  groupController.groupDelete
);

module.exports = router;
