const Contact = require('../models/Contact');
const ErrorResponse = require('../utils/errorResponse');

//@desc get all contacts
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

exports.addContact = async (req, res, next) => {
  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });
    const contact = await newContact.save();

    res.json(contact);
  } catch (err) {
    next(err);
  }
};

exports.updateContact = async (req, res, next) => {
  const { name, email, phone, type } = req.body;

  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ErrorResponse('Contact Not Found', 404));
    }

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not Authorized', 401));
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      {
        new: true,
      }
    );
    res.json(contact);
  } catch (err) {
    next(err);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return next(new ErrorResponse('Contact Not Found', 404));
    }

    //make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return next(new ErrorResponse('Not Authorized', 401));
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Removed' });
  } catch (err) {
    next(err);
  }
};
