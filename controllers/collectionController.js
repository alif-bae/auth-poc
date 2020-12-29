const collectionService = require("../services/collectionService");

const collectionList = async (req, res) => {
  const collections = await collectionService.getCollectionList(req.permissions.allowedGroupIds);
  res.status(200).json(collections);
};

const collectionDetail = async (req, res, next) => {
  try {
    const reqCollectionId = parseInt(req.params.id);
    const collection = await collectionService.getCollectionById(reqCollectionId);
    res.status(200).json(collection);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const collectionCreate = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw { status: 400, message: "name is required" };
    }
    if (!req.body.groupId) {
      throw { status: 400, message: "groupId is required" };
    }

    const newCollection = await collectionService.createCollection(req.body.name, parseInt(req.body.groupId));
    if (!newCollection) {
      throw { status: 422, message: "could not create collection" };
    } else {
      res.status(201).json(newCollection);
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

const collectionEdit = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw { status: 400, message: "name is required" };
    }
    const reqCollectionId = parseInt(req.params.id);
    const collection = await collectionService.updateCollection(reqCollectionId, req.body.name);
    res.status(200).json(collection);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

const collectionDelete = async (req, res, next) => {
  try {
    const reqCollectionId = parseInt(req.params.id);
    await collectionService.deleteCollection([reqCollectionId]);
    res.status(200).json({message: 'collection deleted successfully'});
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else {
      next(err);
    }
  }
};

module.exports = {
  collectionList,
  collectionDetail,
  collectionCreate,
  collectionEdit,
  collectionDelete,
};
