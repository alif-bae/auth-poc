const authenticate = (resource, method) => (req, res, next) => {
    const user = req.user;
    const isGlobalManager = user.getRoles().then((data) => {
        for (role of data) {
            data
        }
    })

    if (req.permissions["globalManager"]) {
        // global manager can get any user
      }

}

async function get_permissions(req, res, next) {
    userRoles = await req.user.getRoles();
    const permissions = {
        'globalManager': false,
        'manager': [],
        'regular': []
    }

    for (role of userRoles) {
        if (role.role == 'globalManager') {
            permissions['globalManager'] = true
            break
        } else if (role.role == 'manager') {
            permissions.manager.push(role.groupId)
        } else if (role.role == 'regular') {
            permissions.regular.push(role.groupId)
        }
    }

    req.permissions = permissions
    next();
  }


const AUTHENTICATE_USER = {
    'userDetail': userDetailGaurd
}

async function userDetailGaurd(req, res, next) {
    req_user_id = parseInt(req.params.id);
    if (req.permissions["globalManager"]) {
      // global manager can get any user
    } else if (req.permissions["manager"].length) {
      // manager can only get their own user and users in the group they manage
      manageableGroupIDs = req.permissions["manager"];
      const roles = await Role.findAll({
        attribites: ["id"],
        where: { groupId: manageableGroupIDs },
      });
      const roleIds = roles.map((role) => role.id);
      const userRoles = await UserRole.findAll({
        attribites: ["userId"],
        where: {roleId: roleIds},
      });
      const userIds = userRoles.map((userRole) => userRole.userId);
      if (!req_user_id in userIds) {
        res.status(403).send("Forbidden");
      }
    } else if (req.permissions["regular"].length) {
      // regular user can only get their own user
      if (req_user_id != req.user.id) {
        res.status(403).send("FORBIDDEN");
      }
    }
    next()
}