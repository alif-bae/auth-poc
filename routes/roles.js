const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");

const roleController = require("../controllers/roleController");
const {roleGuard} = require("../middleware/guards/roleGuard");

// GET /role/
router.get("/", [passport.authenticate("jwt", { session: false }), roleGuard("list")], roleController.roleList);

// GET /role/:id
// router.get(
//   "/:id",
//   [passport.authenticate("jwt", { session: false }), roleGuard("detail"), validatePathParam],
//   roleController.roleDetail
// );

// POST /role/
router.post("/", [passport.authenticate("jwt", { session: false }), roleGuard("create")], roleController.roleCreate);

// UPDATE /role/:id
router.put(
  "/:id",
  [passport.authenticate("jwt", { session: false }), validatePathParam, roleGuard("update")],
  roleController.roleEdit
);

// DELETE /role/:id
router.delete(
  "/:id",
  [passport.authenticate("jwt", { session: false }), validatePathParam, roleGuard("delete")],
  roleController.roleDelete
);

module.exports = router;
