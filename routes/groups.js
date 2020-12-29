const express = require("express");
const router = express.Router();
const passport = require("passport");

const groupController = require("../controllers/groupController");
const authenticate = passport.authenticate("jwt", { session: false });
const { authorize } = require("../middleware/guards/authGuard");
const { validatePathParam } = require("../middleware/utils/argUtil");

// GET /group/
router.get("/", [authenticate, authorize("group", "list")], groupController.groupList);

// GET /group/:id
router.get(
  "/:id",
  [authenticate, authorize("group", "id"), validatePathParam],
  groupController.groupDetail
);

// POST /group/
router.post("/", [authenticate, authorize("group", "new")], groupController.groupCreate);

// UPDATE /group/:id
router.put(
  "/:id",
  [authenticate, validatePathParam, authorize("group", "id")],
  groupController.groupEdit
);

// DELETE /group/:id
router.delete(
  "/:id",
  [authenticate, validatePathParam, authorize("group", "id")],
  groupController.groupDelete
);

module.exports = router;
