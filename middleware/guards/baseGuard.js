async function getPermissions(user, includeRegular) {
  const userRoles = await user.getRoles();
  const permissions = {
    isGlobalManager: false,
    allowedGroupIds: [],
  };

  for (role of userRoles) {
    if (role.role == "globalManager") {
      permissions.isGlobalManager = true;
      permissions.allowedGroupIds = [];
      break;
    }
    if (role.role == "manager") {
      permissions.allowedGroupIds.push(role.groupId);
    }
    if (role.role == "regular" && includeRegular) {
      permissions.allowedGroupIds.push(role.groupId);
    }
  }
  return permissions;
}

module.exports = {
  getPermissions
};
