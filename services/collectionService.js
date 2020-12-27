const { Collection, Item, sequelize } = require("../models");
const itemService = require("../services/itemService");

async function getCollectionList() {
  collections = await Collection.findAll();
  return collections;
}

async function getCollectionById(collectionId) {
  const collection = await Collection.findByPk(collectionId);
  if (!collection) {
    throw { status: 404, message: "collection does not exist" };
  } else {
    return collection;
  }
}

async function createCollection(name, groupId) {
  const newCollection = await Collection.create({
    name: name,
    groupId: groupId,
  });
  if (!newCollection) {
    throw { status: 422, message: "could not create collection" };
  } else {
    return newCollection;
  }
}

async function updateCollection(collectionId, name) {
  const [rows, collection] = await Collection.update(
    {
      name: name,
    },
    {
      where: {
        id: collectionId,
      },
      plain: true,
    }
  );

  if (!rows) {
    throw { status: 404, message: "collection does not exist" };
  } else {
    return getCollectionById(collectionId);
  }
}

async function deleteCollection(collectionIds) {
  const transaction = await sequelize.transaction();
  try {
    const deleted_items = await itemService.deleteByCollectionIds(collectionIds);
    const deleted_collection = await Collection.destroy({
      where: {
        id: collectionIds,
      },
    });
    if (deleted_collection) {
      return true;
    } else {
      throw { status: 404, message: "collection does not exist" };
    }
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

async function getByGroupId(groupId) {
  const collections = await Collection.findAll({
    where: {
      groupId: groupId,
    },
  });
  return collections;
}

async function deleteByGroupId(groupId) {
  const groupCollections = await getByGroupId(groupId);
  const collectionIds = groupCollections.map(col => col.id)
  await deleteCollection(collectionIds);
}

module.exports = {
  getCollectionList,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getByGroupId,
  deleteByGroupId,
};
