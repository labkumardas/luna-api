const { isEmpty } = require('lodash');
var slugify = require('slugify');
const { Category, Subcategory } = require('../../../db/models');

exports.createCategory = async (req, res) => {
  if (req.session.user) {
    const data = await Category.findAll({ raw: true, nest: true });
    res.render('category/create-category', { response: data });
  } else {
    return res.redirect('/');
  }
};

exports.storeCategory = async (req, res) => {
  if (isEmpty(req.body.title)) {
    req.flash('error', 'Please put title!');
    return res.redirect('/');
  }
  try {
    const { title } = req.body;
    const slug = slugify(title, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    await Category.create({ name: title, slug: slugify(slug) })
      .then((result) => {
        return res
          .status(200)
          .send({ code: 200, message: 'category create success' });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.viewCategory = async (req, res) => {
  if (req.session.user) {
    const data = await Category.findAll({ raw: true, nest: true });
    res.render('category/view-category', { response: data });
  } else {
    return res.redirect('/');
  }
};

exports.storeSubCategory = async (req, res) => {
  if (isEmpty(req.body.name)) {
    req.flash('error', 'Please put title!');
    return res.redirect('/');
  }
  if (isEmpty(req.body.categorySelect)) {
    req.flash('error', 'Please Select category!');
    return res.redirect('/');
  }

  try {
    const { categorySelect, name } = req.body;
    const slug = slugify(name, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi', // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
    await Subcategory.create({
      name: name,
      slug: slugify(slug),
      category_id: categorySelect,
    })
      .then((result) => {
        return res
          .status(200)
          .send({ code: 200, message: 'Sub category create success' });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.viewSubCategory = async (req, res) => {
  if (req.session.user) {
    res.render('category/view-subcategory');
  } else {
    return res.redirect('/');
  }
};
