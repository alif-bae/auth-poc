const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");
const { authorize } = require("../middleware/guards/authGuard");
const roleController = require("../controllers/roleController");
const authenticate = passport.authenticate("jwt", { session: false });

// GET /role/
router.get("/", [authenticate, authorize("role", "list")], roleController.roleList);

// GET /role/:id
router.get("/:id", [authenticate, authorize("role", "id"), validatePathParam], roleController.roleDetail);

// POST /role/
router.post("/", [authenticate, authorize("role", "new")], roleController.roleCreate);

// UPDATE /role/:id
router.put("/:id", [authenticate, validatePathParam, authorize("role", "id")], roleController.roleEdit);

// DELETE /role/:id
router.delete("/:id", [authenticate, validatePathParam, authorize("role", "id")], roleController.roleDelete);

module.exports = router;
