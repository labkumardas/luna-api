const dashboardController = require('../controller/dashboard/dashboardController');

module.exports = function (app) {
  app.get(`/`, dashboardController.index);
};
