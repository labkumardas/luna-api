const { Role } = require('../../db/models');

exports.SessionHelper = async (req, userdata, isLoggedIn) => {
  const roleName = await Role.findOne({ where: { id: userdata.role_id } });
  sessionData = req.session;
  sessionData.user = {};
  let name = userdata.name;
  let userId = userdata.id;
  let Isadmin = userdata.isAdmin;
  let Sessiomnid = req.sessionID;
  sessionData.user.role = roleName.dataValues.slug;
  sessionData.user.name = name;
  sessionData.user.userId = userId;
  sessionData.user.Isadmin = Isadmin;
  sessionData.user.id = Sessiomnid;
  sessionData.user.isLoggedIn = isLoggedIn;
  return sessionData;
};
