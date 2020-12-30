const roleService = require("../../services/roleService");
const { getPermissions } = require("../guards/baseGuard")

async function guardRoleList(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardRoleId(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    const roles = await roleService.getByGroupIds(req.permissions.allowedGroupIds);
    const roleIds = roles.map((role) => role.id);
    if (!roleIds.includes(parseInt(req.params.id))) {
      // manager can only get/update/delete roles in groups they manage
      res.status(403).send("Forbidden");
    } else {
      next();
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardRoleCreate(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    if (!req.permissions.allowedGroupIds.includes(parseInt(req.body.groupId))) {
      // manager can only create roles in groups they manage
      res.status(403).send("Forbidden");
    } else {
      next()
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = {
  guardRoleList,
  guardRoleId,
  guardRoleCreate,
};
