const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlenght: 3,
    trim: true,        //va laisser au max 1 espace entre les mots. enleve le trop au debut et fin.
    unique: true,  //,
    validate: {
        validator: validator.isEmail,
        message: '{VALUE} n\'est pas un email valide'
    }
  }, //email
  password: {
    type: String,
    required: true,
    minlenght: 6,
  }, //password
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});




module.exports = { User}
