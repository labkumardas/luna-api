const { Category, Subcategory } = require('../../../db/models');

exports.index = async (req, res) => {
  res.render('pages/view-booking');
};
