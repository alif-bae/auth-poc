const collectionService = require("../../services/collectionService");
const { getPermissions } = require("../guards/baseGuard");

async function guardCollectionList(req, res, next) {
  req.permissions = await getPermissions(req.user, true);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardCollectionId(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    const collections = await collectionService.getByGroupIds(req.permissions.allowedGroupIds);
    const collectionIds = collections.map((collection) => collection.id);
    if (!collectionIds.includes(parseInt(req.params.id))) {
      // manager can only get/update/delete collections in groups they manage
      res.status(403).send("Forbidden");
    } else {
      next();
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

async function guardCollectionCreate(req, res, next) {
  req.permissions = await getPermissions(req.user, false);
  if (req.permissions.isGlobalManager) {
    next();
  } else if (req.permissions.allowedGroupIds.length) {
    if (!req.permissions.allowedGroupIds.includes(parseInt(req.body.groupId))) {
      // manager can only create collections in groups they manage
      res.status(403).send("Forbidden");
    }
  } else {
    res.status(403).send("Forbidden");
  }
}

module.exports = {
  guardCollectionList,
  guardCollectionId,
  guardCollectionCreate,
};
