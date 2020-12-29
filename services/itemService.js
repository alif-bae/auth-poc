const { Item } = require("../models");
const collectionService = require("../services/collectionService");

async function getItemList(groupIds) {
  const whereClause = {};
  if (groupIds) {
    const groupCollections = await collectionService.getByGroupIds(groupIds);
    whereClause.collectionId = groupCollections.map((collection) => collection.id);
  }
  const items = await Item.findAll({ where: whereClause });
  return items;
}

async function getItemById(itemId) {
  const item = await Item.findByPk(itemId);
  if (!item) {
    throw { status: 404, message: "item does not exist" };
  } else {
    return item;
  }
}

async function getByGroupIds(groupIds) {
  const groupCollections = await collectionService.getByGroupIds(groupIds);
  const collectionIds = groupCollections.map((collection) => collection.id);
  const items = await Item.findAll({ where: { collectionId: collectionIds } });
  return items;
}

async function createItem(name, collectionId) {
  const newItem = await Item.create({
    name: name,
    collectionId: collectionId,
  });
  if (!newItem) {
    throw { status: 422, message: "could not create item" };
  } else {
    return newItem;
  }
}

async function updateItem(itemId, name) {
  const [rows, item] = await Item.update(
    {
      name: name,
    },
    {
      where: {
        id: itemId,
      },
      plain: true,
    }
  );

  if (!rows) {
    throw { status: 404, message: "item does not exist" };
  } else {
    return getItemById(itemId);
  }
}

async function deleteItem(itemId) {
  const rows = await Item.destroy({
    where: {
      id: itemId,
    },
  });
  if (rows) {
    return true;
  } else {
    throw { status: 404, message: "item does not exist" };
  }
}

async function deleteByCollectionIds(collectionIds) {
  const rows = await Item.destroy({
    where: {
      collectionId: collectionIds,
    },
  });
  if (!rows) {
    throw { status: 404, message: "collection(s) not found" };
  } else {
    return true;
  }
}

module.exports = {
  getItemList,
  getItemById,
  getByGroupIds,
  createItem,
  updateItem,
  deleteItem,
  deleteByCollectionIds,
};
