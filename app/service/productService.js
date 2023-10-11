const { Service, Category, Subcategory } = require('../../db/models');

exports.storeProduct = async (jsonData, file) => {
  const path = '/uploads/' + file.filename;

  console.log(jsonData);
  new Promise(async (resolve, reject) => {
    const result = await Service.create({
      image: path,
      slug: jsonData.slug,
      title: jsonData.title,
      category_id: jsonData.category_id,
      sub_category_id: jsonData.sub_category_id,
      description: jsonData.description,
      property_type: jsonData.property_type,
      price: jsonData.price,
    });
    if (result) {
      resolve(result);
    }
    reject;
  });
};

exports.productListService = async () => {
  const result = await Service.findAll({
    include: [
      {
        model: Category,
      },
      { model: Subcategory },
    ],
    raw: true,
    nest: true,
    order: [['id', 'DESC']],
  });
  return result;
};
