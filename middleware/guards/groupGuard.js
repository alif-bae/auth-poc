const { getPermissions } = require("../guards/baseGuard")

async function guardGroupList(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardGroupId(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardGroupCreate(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = {
  guardGroupList,
  guardGroupId,
  guardGroupCreate,
};
