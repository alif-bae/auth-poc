const itemService = require("../services/itemService");

const itemList = async (req, res) => {
  const items = await itemService.getItemList(req.permissions.allowedGroupIds);
  res.status(200).json(items);
};

const itemDetail = async (req, res, next) => {
  try {
    const reqItemId = parseInt(req.params.id);
    const item = await itemService.getItemById(reqItemId);
    res.status(200).json(item);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const itemCreate = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw { status: 400, message: "name is required" };
    } else if (!req.body.collectionId) {
      throw { status: 400, message: "collectionId is required" }
    }

    const newItem = await itemService.createItem(req.body.name, parseInt(req.body.collectionId));
    if (!newItem) {
      throw { status: 422, message: "could not create item" };
    } else {
      res.status(201).json(newItem);
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const itemEdit = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw { status: 400, message: "name is required" };
    }
    const reqItemId = parseInt(req.params.id);
    const item = await itemService.updateItem(reqItemId, req.body.name);
    res.status(200).json(item);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const itemDelete = async (req, res, next) => {
  try {
    const reqItemId = parseInt(req.params.id);
    result = await itemService.deleteItem(reqItemId);
    res.status(204).json({ message: "item deleted successfully" });
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

module.exports = {
  itemList,
  itemDetail,
  itemCreate,
  itemEdit,
  itemDelete,
};
