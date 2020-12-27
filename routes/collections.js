const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");

// require controllers
const collectionController = require("../controllers/collectionController");

router.get("/", [passport.authenticate("jwt", { session: false })], collectionController.collectionList);
router.get("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], collectionController.collectionDetail);
router.post("/", [passport.authenticate("jwt", { session: false })], collectionController.collectionCreate);
router.put("/:id", [passport.authenticate("jwt", { session: false }), validatePathParam], collectionController.collectionEdit);
router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), validatePathParam],
  collectionController.collectionDelete
);

module.exports = router;
