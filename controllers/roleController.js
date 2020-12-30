const roleService = require("../services/roleService");
const userRoleService = require("../services/userRoleService")

const roleList = async (req, res, next) => {
  try {
    const roles = await roleService.getRoleList(req.permissions.allowedGroupIds);
    res.status(200).json(roles);
  } catch (err) {
    next(err)
  }
};

const roleDetail = async (req, res, next) => {
  try {
    const reqRoleId = parseInt(req.params.id);
    const role = await roleService.getRoleById(reqRoleId);
    res.status(200).json(role);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const roleCreate = async (req, res, next) => {
  try {
    if (!req.body.role) {
      throw { status: 400, message: "name is required" };
    } else if (!req.body.groupId) {
      throw { status: 400, message: "groupId is required" }
    }

    const newRole = await roleService.createRole(req.body.role, parseInt(req.body.groupId));
    if (!newRole) {
      throw { status: 422, message: "could not create role" };
    } else {
      res.status(201).json(newRole);
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const roleEdit = async (req, res, next) => {
  try {
    if (!req.body.role) {
      throw { status: 400, message: "name is required" };
    }
    const reqRoleId = parseInt(req.params.id);
    const role = await roleService.updateRole(reqRoleId, req.body.role);
    res.status(200).json(role);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

const roleDelete = async (req, res, next) => {
  try {
    const reqRoleId = parseInt(req.params.id);
    result = await roleService.deleteRole(reqRoleId);
    res.status(204).json();
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({ message: err.message });
    } else next(err);
  }
};

module.exports = {
  roleList,
  roleDetail,
  roleCreate,
  roleEdit,
  roleDelete,
};
