const { isEmpty } = require('lodash');
var slugify = require('slugify');
const {
  storeProduct,
  productListService,
} = require('../../service/productService');
const {
  categoryList,
  subCategoryListById,
} = require('../../service/categoryService');

exports.createService = async (req, res) => {
  if (req.session.user) {
    const catData = await categoryList();
    res.render('service/create-service', { response: catData });
  } else {
    return res.redirect('/');
  }
};

exports.viewService = async (req, res) => {
  try {
    const data = await productListService();
    res.render('service/view-services', { response: data });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.storeService = async (req, res) => {
  try {
    const slug = slugify(req.body.title, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    const jsonData = {
      title: req.body.title,
      category_id: req.body.category_id,
      sub_category_id: req.body.sub_category_id,
      description: req.body.description,
      property_type: req.body.property_type,
      price: req.body.price,
      slug: slug,
    };

    console.log('jsonData', jsonData);
    await storeProduct(jsonData, req.file)
      .then((result) => {
        return res
          .status(200)
          .send({ code: 200, message: 'Service create success' });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getSubCategory = async (req, res) => {
  const data = await subCategoryListById(req.body.category_id)
    .then((result) => {
      return res.status(200).send({ response: result });
    })
    .catch((err) => {
      return res.status(500).send({ code: 500, err: err });
    });
};
