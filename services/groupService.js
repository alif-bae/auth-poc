const { Group } = require("../models");

async function getGroupList() {
  groups = await Group.findAll();
  return groups;
}

async function getGroupById(groupId) {
  const group = await Group.findByPk(groupId);
  if (!group) {
    throw { status: 404, message: "group does not exist" };
  } else {
    return group;
  }
}

async function createGroup(name) {
  const newGroup = await Group.create({
    name: name,
  });
  if (!newGroup) {
    throw { status: 422, message: "could not create group" };
  } else {
    return newGroup;
  }
}

async function updateGroup(groupId, name) {
  const [rows, group] = await Group.update(
    {
      name: name,
    },
    {
      where: {
        id: groupId,
      },
      plain: true,
    }
  );

  if (!rows) {
    throw { status: 404, message: "group does not exist" };
  } else {
    return getGroupById(groupId);
  }
}

async function deleteGroup(groupId) {
  const rows = await Group.destroy({
    where: {
      id: groupId,
    },
  });
  if (rows) {
    return true;
  } else {
    throw { status: 404, message: "group does not exist" };
  }
}

module.exports = {
  getGroupList,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
