const { User, UserRole, Role } = require("../models");
const groupService = require("../services/groupService");

const groupList = async (req, res) => {
  const groups = await groupService.getGroupist();
  res.status(200).json(groups);
};

const groupDetail = async (req, res) => {
  try {
    req_group_id = parseInt(req.params.id);
    const group = await groupService.getUserById(req_group_id);
    res.status(200).json(group);
  } catch (err) {
    if (err.status == 404) {
      res.status(err.status).json(err.message);
    } else (
      next(err)
    )
  }
};

const groupCreate = async (req, res) => {
  try {
    if (!req.body.name) {
      throw ({'status': 400, 'message': 'name is required'});
    }

    new_group = await groupService.createGroup(req.body.name, req.body.password);
    if (!new_group) {
      throw {status: 422, message: 'could not create group'};
    } else {
      res.status(201).json({message: "group created successfully"});
    }
  } catch (err) {
    if (err.status == 400 || err.status == 422) {
      res.status(err.status).json(err.message)
    } else {
      next(err)
    };
  }
};

const groupEdit = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send("Bad Request");
  }

  group = await groupService.updateGroup(req.params.id, req.body.name);
  if (!group) {
    res.status(404).send("Not Found");
  } else {
    res.status(200).json(group);
  }
};

const groupDelete = async (req, res) => {
  try {
    const result = await groupService.deleteGroup(req.params.id);
    if (result == 0) {
      res.status(204).send("Deleted");
    } else if (result == 1) {
      res.status(400).send("Not Found");
    }
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

module.exports = {
  groupList,
  groupDetail,
  groupCreate,
  groupEdit,
  groupDelete,
};
