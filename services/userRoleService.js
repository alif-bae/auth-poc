const { UserRole, Role } = require("../models");

async function getByGroupId(groupId) {
  const groupRoles = await Role.findAll({
    where: {
      groupId: groupId,
    },
  });
  const groupRoleIds = groupRoles.map((role) => role.id);
  if (groupRoleIds) {
    const userRoles = await UserRole.findAll({
      where: {
        roleId: groupRoleIds,
      },
    });
    return userRoles;
  } else {
    return;
  }
}

async function deleteByGroupId(groupId) {
  const groupUserRoles = await getByGroupId(groupId);
  const userRoleIds = groupUserRoles.map((userRole) => userRole.id);
  await UserRole.destroy({
    where: {
      id: userRoleIds,
    },
  });
  return;
}

async function deleteByRoleId(roleId) {
    await UserRole.destroy({
        where: {
            roleId: roleId
        }
    })
    return
}

async function deleteByUserId(userId) {
    await UserRole.destroy({
        where: {
            userId: userId
        }
    })
}

module.exports = {
  getByGroupId,
  deleteByGroupId,
  deleteByRoleId,
  deleteByUserId
};
