const express = require("express");
const router = express.Router();
const passport = require("passport");
const { validatePathParam } = require("../middleware/utils/argUtil");

const AUTHENTICATE_USER =

// router middleware
async function get_permissions(req, res, next) {
  userRoles = await req.user.getRoles();
  const permissions = {
      'globalManager': false,
      'manager': [],
      'regular': []
  }

  for (role of userRoles) {
      if (role.role == 'globalManager') {
          permissions['globalManager'] = true
          break
      } else if (role.role == 'manager') {
          permissions.manager.push(role.groupId)
      } else if (role.role == 'regular') {
          permissions.regular.push(role.groupId)
      }
  }

  req.permissions = permissions
  next();
}


// require controllers
const userController = require("../controllers/userController");

// GET /user/
router.get("/", userController.userList);

// GET /user/:id
router.get(
  "/:id",
  [passport.authenticate("jwt", { session: false }),
   validatePathParam],
  userController.userDetail
);

// POST /user/
router.post("/", userController.userCreate);

// PUT /user/:id
router.put("/:id", validatePathParam, userController.userEdit);

// DELETE /user/:id
router.delete("/:id", validatePathParam, userController.userDelete);

module.exports = router;
