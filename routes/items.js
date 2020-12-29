const express = require("express");
const router = express.Router();
const passport = require("passport");

const itemController = require("../controllers/itemController");
const authenticate = passport.authenticate("jwt", { session: false });
const { authorize } = require("../middleware/guards/authGuard");
const { validatePathParam } = require("../middleware/utils/argUtil");

// GET /item/
router.get("/", [authenticate, authorize("item", "list")], itemController.itemList);

// GET /item/:id
router.get("/:id", [authenticate, authorize("item", "id"), validatePathParam], itemController.itemDetail);

// POST /item/
router.post("/", [authenticate, authorize("item", "new")], itemController.itemCreate);

// UPDATE /item/:id
router.put("/:id", [authenticate, validatePathParam, authorize("item", "id")], itemController.itemEdit);

// DELETE /item/:id
router.delete("/:id", [authenticate, validatePathParam, authorize("item", "id")], itemController.itemDelete);

module.exports = router;
