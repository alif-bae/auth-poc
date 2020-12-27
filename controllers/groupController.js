const { User, UserRole, Role } = require("../models");
const groupService = require("../services/groupService");

const groupList = async (req, res) => {
  const groups = await groupService.getGroupList();
  res.status(200).json(groups);
};

const groupDetail = async (req, res, next) => {
  try {
    const reqGroupId = parseInt(req.params.id);
    const group = await groupService.getGroupById(reqGroupId);
    res.status(200).json(group);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message});
    } else (
      next(err)
    )
  }
};

const groupCreate = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw {status: 400, message: 'name is required'};
    }

    const newGroup = await groupService.createGroup(req.body.name);
    if (!newGroup) {
      throw {status: 422, message: 'could not create group'};
    } else {
      res.status(201).json({message: "group created successfully"});
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json({message: err.message})
    } else {
      next(err)
    };
  }
};

const groupEdit = async (req, res, next) => {
  try {
    if (!req.body.name) {
      throw ({status: 400, message: 'name is required'});
    }
    const reqGroupId = parseInt(req.params.id);
    const group = await groupService.updateGroup(reqGroupId, req.body.name);
    res.status(200).json(group);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message});
    } else {
      next(err)
    }
  }
};

const groupDelete = async (req, res, next) => {
  try {
    const reqGroupId = parseInt(req.params.id);
    await userService.deleteUser(reqGroupId);
    res.status(204).json({message: 'group deleted successfully'})
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json({message: err.message})
    } else {
      next(err)
    }
  }
};

module.exports = {
  groupList,
  groupDetail,
  groupCreate,
  groupEdit,
  groupDelete,
};
