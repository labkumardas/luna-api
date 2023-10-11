const { User, Banner } = require('../../db/models');
const { SessionHelper } = require('../helper/SessionManagment');

exports.storeBannerService = async (title, description, file) => {
  const path = '/uploads/' + file.filename;
  new Promise(async (resolve, reject) => {
    console.log(path, title, description);
    const result = await Banner.create({
      image: path,
      description: description,
      title: title,
    });
    if (result) {
      resolve(result);
    }
    reject;
  });
};
