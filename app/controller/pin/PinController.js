const { isEmpty } = require('lodash');
const { importFileToDb } = require('../../service/createPinService');
const { Pin } = require('../../../db/models');
exports.index = async (req, res) => {
  if (req.session.user) {
    res.render('pin/index');
  } else {
    return res.redirect('/');
  }
};

exports.storePin = async (req, res) => {
  try {
    const result = await importFileToDb('uploads/' + req.file.filename);
    if (result) {
      return res.status(200).send({ code: 200, message: 'create success' });
    }
  } catch (error) {
    return res.status(500).send({ code: 500, message: error });
  }
};

exports.viewPin = async (req, res) => {
  try {
    const data = await Pin.findAll({ raw: true, nest: true });
    res.render('pin/view-pin', { response: data });
  } catch (error) {
    return res.status(500).send(error);
  }
};
