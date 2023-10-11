const { User } = require('../../db/models');

isAuthorized = (req, res, next) => {
  if (req.session.user == undefined) {
    return res.redirect('/');
  }
  if (req.session.user.userId) {
    User.findOne({
      where: {
        id: req.session.user.userId,
        isAdmin: 1,
      },
    }).then((user) => {
      if (user) {
        next();
      } else {
        return res.redirect('/');
      }
    });
  } else {
    return res.redirect('/');
  }
};
module.exports = isAuthorized;
