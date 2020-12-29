const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");
const authenticate = passport.authenticate("jwt", { session: false });
const { authorize } = require("../middleware/guards/authGuard");
const { validatePathParam } = require("../middleware/utils/argUtil");

// GET /user/
router.get("/", [authenticate, authorize("user", "list")], userController.userList);

// GET /user/:id
router.get("/:id", [authenticate, authorize("user", "id"), validatePathParam], userController.userDetail);

// POST /user/
router.post("/", [authenticate, authorize("user", "new")], userController.userCreate);

// UPDATE /user/:id
router.put("/:id", [authenticate, validatePathParam, authorize("user", "id")], userController.userEdit);

// DELETE /user/:id
router.delete("/:id", [authenticate, validatePathParam, authorize("user", "id")], userController.userDelete);

module.exports = router;
