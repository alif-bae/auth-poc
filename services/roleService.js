const { Role, sequelize } = require("../models");
const userRoleService = require("../services/userRoleService");

async function getRoleList(groupIds) {
  const whereClause = {};
  if (groupIds.length) {
    whereClause.groupId = groupIds;
  }
  roles = await Role.findAll({ where: whereClause });
  return roles;
}

async function getRoleById(roleId) {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw { status: 404, message: "role does not exist" };
  } else {
    return role;
  }
}

async function createRole(name, groupId) {
  const newRole = await Role.create({
    groupId: groupId,
    role: name
  });
  if (!newRole) {
    throw { status: 422, message: "could not create role" };
  } else {
    return newRole;
  }
}

async function updateRole(roleId, name) {
  const [rows, role] = await Role.update(
    {
      role: name,
    },
    {
      where: {
        id: roleId,
      },
      plain: true,
    }
  );

  if (!rows) {
    throw { status: 404, message: "role does not exist" };
  } else {
    return getRoleById(roleId);
  }
}

async function deleteRole(roleId) {
  const transaction = await sequelize.transaction;
  try {
    await userRoleService.deleteByRoleId(roleId);
    const rows = await Role.destroy({
      where: {
        id: roleId,
      },
    });
    if (rows) {
      return true;
    } else {
      throw { status: 404, message: "role does not exist" };
    }
  } catch (err) {
    await transaction.roleback();
    throw err;
  }
}

async function getByGroupIds(groupIds) {
  const groupRoles = await Role.findAll({
    where: {
      groupId: groupIds,
    },
  });
  return groupRoles;
}

async function deleteByGroupId(groupId) {
  const groupRoles = await getByGroupIds(groupId)
  if (!groupRoles.length) {
    return
  }
  const transaction = await sequelize.transaction();
  try {
    await userRoleService.deleteByGroupId(groupId);
    const rows = await Role.destroy({
      where: {
        groupId: groupId,
      },
    });
    if (rows) {
      return true;
    } else {
      throw { status: 404, message: "collection(s) not found" };
    }
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

module.exports = {
  getRoleList,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  getByGroupIds,
  deleteByGroupId,
};
