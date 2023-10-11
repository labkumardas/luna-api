const { isEmpty } = require('lodash');
const {
  storeBannerService,
  viewBannerService,
} = require('../../service/bannerService');
const { User, Banner } = require('../../../db/models');

exports.createBanner = async (req, res) => {
  try {
    res.render('pages/banner-create');
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.viewBanner = async (req, res) => {
  try {
    const data = await Banner.findAll({ raw: true, nest: true });
    res.render('pages/banner-view', { response: data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
exports.storeBanner = async (req, res) => {
  console.log(req.body);

  if (isEmpty(req.body.title)) {
    req.flash('error', 'Please put title!');
    return res.redirect('/');
  }
  if (isEmpty(req.body.description)) {
    req.flash('error', 'Please put description!');
    return res.redirect('/');
  }
  try {
    const { title, description } = req.body;

    await storeBannerService(title, description, req.file)
      .then((result) => {
        return res
          .status(200)
          .send({ code: 200, message: 'Banner create success' });
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  } catch (error) {
    return res.status(500).send(error);
  }
};
