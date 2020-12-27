const { Group } = require("../models");


async function getGroupList() {
  const groups = await Group.findAll();
  return groups;
}

async function getById(groupId) {
  const group = await Group.findByPk(groupId);
  if (!group) {
    return;
  }
  return group;
}

async function createGroup(name) {
  const new_group = await Group.create({name: name});
  return new_group;
}

async function updateGroup(groupId, name) {
  const group = await getById(groupId);
  if (group) {
    group.name = name;
    const updatedGroup = await group.save();
    return updatedGroup;
  } else {
    return;
  }
}

async function deleteGroup(groupId) {
  group = await getById(userId);
  result = 1
  try {
    if (group) {
      await group.destroy();
      result = 0
    } else {
      result = 1
    }
    return result
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getGroupList,
  getById,
  createGroup,
  updateGroup,
  deleteGroup
};
