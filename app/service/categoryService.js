const { Category, Subcategory } = require('../../db/models');

exports.categoryList = async () => {
  const result = await Category.findAll({
    raw: true,
    nest: true,
  });
  return result;
};
exports.subCategoryListById = async (id) => {
  const result = await Subcategory.findAll({
    where: { category_id: id },
    raw: true,
    nest: true,
  });
  return result;
};
