const { guardCollectionList, guardCollectionId, guardCollectionCreate } = require("./collectionGuard");
const { guardRoleList, guardRoleId, guardRoleCreate } = require("./roleGuard");
const { guardItemList, guardItemId, guardItemCreate } = require("./itemGuard");
const { guardUserList, guardUserId, guardUserCreate } = require("./userGuard");
const { guardGroupList, guardGroupId, guardGroupCreate } = require("./groupGuard");

const ResourceGuards = {
  role: {
    list: guardItemList,
    id: guardRoleId,
    new: guardRoleCreate,
  },
  collection: {
      list: guardCollectionList,
      id: guardCollectionId,
      new: guardCollectionCreate
  },
  item: {
    list: guardItemList,
    id: guardItemId,
    new: guardItemCreate
  },
  user: {
      list: guardUserList,
      id: guardUserId,
      new: guardUserCreate
  },
  group: {
      list: guardGroupList,
      id: guardGroupId,
      new: guardGroupCreate
  },
};

function authorize(resource, method) {
  return ResourceGuards[resource][method];
}

module.exports = {
    authorize
}