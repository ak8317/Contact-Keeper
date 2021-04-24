const router = require('express').Router();

//Controllers
const {
  register,
  login,
  forgotPassword,
  resetpassword,
  authRoute,
} = require('../controllers/auth');
const auth = require('../middleware/auth');
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resetToken').put(resetpassword);

router.get('/auth', auth, authRoute);
module.exports = router;
