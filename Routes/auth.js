const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {check, validationResult} = require('express-validator');
const { signup, signout, signin } = require('../Controllers/auth');

router.post('/signup', [check('email')
.notEmpty()
.withMessage("Email is required")
.bail()
.isEmail()
.withMessage("Must be an email")
 .custom(value => {
  console.log(value);
  return User.findOne({email: value}).then(user => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  })
}),
check('password')
.notEmpty()
.withMessage("Password is required")
.bail()
.isLength({min:3})
.withMessage("Password must be atleast 3 characters long"),
check('name')
.notEmpty()
.withMessage('Name is required'),
], signup);

router.post('/signin', [
    check('email')
    .notEmpty()
    .withMessage('Email is required'),

    check('password')
    .notEmpty()
    .withMessage('Password is required')
],signin);

router.get('/signout', signout);


module.exports = router;