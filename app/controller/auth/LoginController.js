const { isEmpty } = require('lodash');
const { authService } = require('../../service/loginService');

exports.userLogin = async (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect('/dashboard');
    } else {
      res.render('auth/login');
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.checkLogin = async (req, res) => {
  const password = req.body.password;
  if (isEmpty(password)) {
    req.flash('error', 'Please put password!');
    return res.redirect('/');
  }
  if (isEmpty(req.body.email)) {
    req.flash('error', 'Please put email!');
    return res.redirect('/');
  }
  try {
    await authService(req)
      .then((result) => {
        if (result) {
          const responseData = {
            isLoggedIn: req.session?.user.isLoggedIn,
            role: req.session?.user.role,
            name: req.session?.user.name,
            Isadmin: req.session?.user.Isadmin,
          };
          return res.status(200).send({ message: responseData });
        } else {
          return res.render('auth/login');
        }
      })
      .catch((err) => {
        console.log(err);
        if ((err = 'invalide_password')) {
          return res.status(500).send({ message: 'invalide_password' });
        }
        if ((err = 'invalide_email_or_password')) {
          return res
            .status(500)
            .send({ message: 'invalide_email_or_password' });
        }
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};
exports.errorPage = async (req, res) => {
  return res.send('fsaf');
};
