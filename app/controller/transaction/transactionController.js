exports.index = async (req, res) => {
  try {
    res.render('transaction/view-transaction');
  } catch (error) {
    return res.status(500).send(error);
  }
};
