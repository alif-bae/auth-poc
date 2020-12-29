const { getPermissions } = require("../guards/baseGuard")

async function guardUserList(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardUserId(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardUserCreate(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = {
  guardUserList,
  guardUserId,
  guardUserCreate,
};
