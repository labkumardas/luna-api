const AuthController = require('../controller/auth/LoginController');

module.exports = function (app) {
  app.get(`/`, AuthController.userLogin);
  app.post(`/error`, AuthController.errorPage);
  app.post(`/login`, AuthController.checkLogin);
};
