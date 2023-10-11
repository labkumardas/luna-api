const { User, Role } = require('../../db/models');

exports.userListSerice = async (req) => {
  const userCheck = await User.findAll({
    where: {
      isAdmin: 0,
    },
    raw: true,
    nest: true,
  });

  return userCheck;
};

exports.adminListSerice = async (req) => {
  const userCheck = await User.findAll({
    where: {
      isAdmin: 1,
    },
    raw: true,
    nest: true,
  });

  return userCheck;
};

exports.userEmailCheck = async (email) => {
  const checkUserEmail = await User.findOne({
    where: {
      email: email,
    },
    raw: true,
    nest: true,
  });

  return checkUserEmail;
};

exports.userPhoneCheck = async (phone) => {
  const checkUserPhone = await User.findOne({
    where: {
      phone: phone,
    },
    raw: true,
    nest: true,
  });

  return checkUserPhone;
};

exports.storeUserData = async (jsonData) => {
  const storeData = await User.create(jsonData);
  return storeData;
};
exports.userRoleService = async () => {
  const roleData = await Role.findAll({ raw: true, nest: true });
  return roleData;
};
