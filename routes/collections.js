const express = require("express");
const router = express.Router();
const passport = require("passport");

const collectionController = require("../controllers/collectionController");
const authenticate = passport.authenticate("jwt", { session: false });
const { authorize } = require("../middleware/guards/authGuard");
const { validatePathParam } = require("../middleware/utils/argUtil");

// GET /collection/
router.get("/", [authenticate, authorize("collection", "list")], collectionController.collectionList);

// GET /collection/:id
router.get(
  "/:id",
  [authenticate, authorize("collection", "id"), validatePathParam],
  collectionController.collectionDetail
);

// POST /collection/
router.post("/", [authenticate, authorize("collection", "new")], collectionController.collectionCreate);

// UPDATE /collection/:id
router.put(
  "/:id",
  [authenticate, validatePathParam, authorize("collection", "id")],
  collectionController.collectionEdit
);

// DELETE /collection/:id
router.delete(
  "/:id",
  [authenticate, validatePathParam, authorize("collection", "id")],
  collectionController.collectionDelete
);

module.exports = router;
