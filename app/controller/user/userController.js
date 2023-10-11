const {
  userListSerice,
  adminListSerice,
  userEmailCheck,
  userPhoneCheck,
  storeUserData,
  userRoleService,
} = require('../../service/userService');
const { isEmpty } = require('lodash');
const bcrypt = require('bcryptjs');
const { Role } = require('../../../db/models');
exports.userList = async (req, res) => {
  try {
    const data = await userListSerice();
    console.log(data);
    res.render('user/view-user', { response: data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.adminList = async (req, res) => {
  try {
    const data = await adminListSerice();
    console.log(data);
    res.render('user/view-admin', { response: data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.userCreate = async (req, res) => {
  try {
    const roleData = await userRoleService();
    res.render('user/create-user', { response: roleData });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.userStore = async (req, res) => {
  try {
    const emailCheck = await userEmailCheck(req.body.email);
    const phoneCheck = await userPhoneCheck(req.body.phone);
    const path = '/uploads/' + req.file.filename;

    let isAdmin;
    const roleData = await Role.findOne({
      where: {
        slug: req.body.role,
      },
      raw: true,
      nest: true,
    });
    console.log(roleData);
    if (roleData.slug == 'admin') {
      isAdmin = 1;
    } else {
      isAdmin = 0;
    }
    const jsonData = {
      name: req.body.username,
      isAdmin: isAdmin,
      role_slug: roleData.slug,
      role_id: roleData.id,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
      Pin: req.body.Pin,
      password: bcrypt.hashSync(req.body.password, 8),
      photo: path,
    };
    console.log(jsonData);
    if (!isEmpty(emailCheck)) {
      return res
        .status(403)
        .send({ code: 403, message: 'Email already exist' });
    }
    if (!isEmpty(phoneCheck)) {
      return res
        .status(403)
        .send({ code: 403, message: 'Phone Number already exist' });
    }

    await await storeUserData(jsonData)
      .then((result) => {
        return res
          .status(200)
          .send({ code: 200, message: 'User create success' });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
