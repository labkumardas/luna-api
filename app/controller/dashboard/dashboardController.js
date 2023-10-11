exports.index = async (req, res) => {
  return res.status(200).send({ code: 200, message: 'Api for luna' });
};
