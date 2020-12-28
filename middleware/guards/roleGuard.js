const roleService = require('../../services/roleService')

function roleGuard(action) {
  switch (action) {
    case "list":
      return roleListGuard;
    case "detail":
      return roleDetailGuard;
    case "create":
      return roleCreateGuard;
    case "update":
      return roleUpdateGuard;
    case "delete":
      return roleDeleteGuard;
    default:
      throw { message: "invalid action for roleGuard" };
  }
}

async function getPermissions(user, can_read) {
  const userRoles = await user.getRoles();
  const permissions = {
    isGlobalManager: false,
    allowedGroupIds: [],
  };

  for (role of userRoles) {
    if (role.role == "globalManager") {
      permissions.isGlobalManager = true;
      permissions.allowedGroupIds = [];
      break;
    }
    if (role.role == "manager") {
      permissions.allowedGroupIds.push(role.groupId);
    }
    if (role.role == "regular" && can_read == true) {
      permissions.allowedGroupIds.push(role.groupId);
    }
  }
  return permissions;
}

async function roleListGuard(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function roleDetailGuard(req, res, next) {
  req.permissions = await getPermissions(req, res, next);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function roleCreateGuard(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    if (!req.permissions.allowedGroupIds.includes(parseInt(req.body.groupId))) {
      // manager can only create roles in groups they manage
      res.status(403).send("Forbidden")
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

async function roleUpdateGuard(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    const roles = await roleService.getByGroupIds(req.permissions.allowedGroupIds)
    const roleIds = roles.map(role => role.id)
    if (!roleIds.includes(parseInt(req.params.id))) {
      // manager can only update roles in groups they manage
      res.status(403).send("Forbidden")
    } else {
      next()
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

async function roleDeleteGuard(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    const roles = await roleService.getByGroupIds(req.permissions.allowedGroupIds)
    const roleIds = roles.map(role => role.id)
    if (!roleIds.includes(parseInt(req.params.id))) {
      // manager can only delete roles in groups they manage
      res.status(403).send("Forbidden")
    } else {
      next()
    }
  } else {
    res.status(403).send("Forbidden");
  }
}


module.exports = {
  roleGuard,
};
