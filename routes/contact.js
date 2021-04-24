const router = require('express').Router();
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
//Controllers
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} = require('../controllers/contact');

router.route('/').get(auth, getContacts);
router.route('/').post(auth, addContact);
router.route('/:id').put(auth, updateContact);
router.route('/:id').delete(auth, deleteContact);
module.exports = router;
