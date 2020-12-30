const { Collection, sequelize } = require("../models");

async function getCollectionList(groupIds) {
  const whereClause = {};
  if (groupIds.length) {
    whereClause.groupId = groupIds;
  }
  collections = await Collection.findAll({ where: whereClause });
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

async function getByGroupIds(groupIds) {
  const collections = await Collection.findAll({
    where: {
      groupId: groupIds,
    },
  });
  return collections;
}

async function deleteByGroupIds(groupIds) {
  const groupCollections = await getByGroupIds(groupIds);
  const collectionIds = groupCollections.map((col) => col.id);
  if (!collectionIds.length) {
    return
  } else {
    await deleteCollection(collectionIds);
  }
}

module.exports = {
  getCollectionList,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getByGroupIds,
  deleteByGroupIds,
};

const itemService = require("../services/itemService");

