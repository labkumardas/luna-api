const { User, Role } = require('../../db/models');
const bcrypt = require('bcryptjs');
const { SessionHelper } = require('../helper/SessionManagment');

exports.authService = async (req) => {
  const password = req.body.password;

  const userCheck = await User.findOne({
    where: {
      email: req.body.email,
      isAdmin: 1,
    },
    raw: true,
    nest: true,
  });

  if (userCheck) {
    let passwordIsValid = bcrypt.compareSync(password, userCheck.password);
    if (!passwordIsValid) {
      throw new Error('invalide_email_or_password');
    }
    return await SessionHelper(req, userCheck, (isLoggedIn = true));
  } else {
    throw new Error('invalide_email_or_password');
  }
};
