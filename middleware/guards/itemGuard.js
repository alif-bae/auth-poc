const { getPermissions } = require("../guards/baseGuard");

async function guardItemList(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardItemId(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    const items = await itemService.getByGroupIds(req.permissions.allowedGroupIds);
    const itemIds = items.map((item) => item.id);
    if (!itemIds.includes(parseInt(req.params.id))) {
      // manager can only get/update/delete items in groups they manage
      res.status(403).send("Forbidden");
    } else {
      next();
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardItemCreate(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    if (!req.permissions.allowedGroupIds.includes(parseInt(req.body.groupId))) {
      // manager can only create items in groups they manage
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = {
  guardItemList,
  guardItemId,
  guardItemCreate,
};

const itemService = require("../../services/itemService");
