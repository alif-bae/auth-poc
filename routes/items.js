const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");

// require controllers
const itemController = require("../controllers/itemController");

router.get("/", [passport.authenticate("jwt", { session: false })], itemController.itemList);
router.get("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], itemController.itemDetail);
router.post("/", [passport.authenticate("jwt", { session: false })], itemController.itemCreate);
router.put("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], itemController.itemEdit);
router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), validatePathParam],
  itemController.itemDelete
);

module.exports = router;
