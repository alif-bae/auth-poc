const { Role, sequelize } = require("../models");
const userRoleService = require("../services/userRoleService")

async function getRoleList() {
  roles = await Role.findAll();
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

async function createRole(name, userId) {
  const newRole = await Role.create({
    name: name,
    userId: userId,
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
      name: name,
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
  const transaction = await sequelize.transaction
  try {
    await userRoleService.deleteByRoleId(roleId)
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
    await transaction.roleback()
    throw(err)
  }
}

async function getByGroupId(groupId) {
  const groupRoles = Role.findAll({
    where: {
      groupId: groupId,
    },
  });
}

async function deleteByGroupId(groupId) {
  const transaction = await sequelize.transaction();
  try {
    await userRoleService.deleteByGroupId(groupId)
    const rows = await Role.destroy({
      where: {
        groupId: groupId
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
  getByGroupId,
  deleteByGroupId,
};
