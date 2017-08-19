const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

///on ne peut pas mettre de methodes sur un model. Alors on va utiliser une Schema
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
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
//on va changer la reponse usuel pour prevenir la fuite d info privees
UserSchema.methods.toJSON = function (){
	let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email'])  //pour ne pas retourner info importante et privee.
}

//Fn normale, on a besoin du this
UserSchema.methods.generateAuthToken = function() {
	let user = this;
	let access = "auth";
	let token = jwt
		.sign({ _id: user._id.toHexString(), access: access }, "abc123").toString();

	user.tokens.push({ access, token });
	return user.save().then(() => {	//met rien
		return token;
	});
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

/*
UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};
*/


//const bcrypt = require('bcryptjs');

UserSchema.pre('save', function (next) { //FN ON A BESOIN DU THIS
  var user = this; //pour pouvoir faire user.truc ou ici password.
///POUR NE PAS HASHER UN HASH ET FUCKER LE CHIEN
  if (user.isModified('password')) {   //is.modifier retourne un bool de mongoose
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => { //c est la form de la fn hash
        user.password = hash;  //ici on set le password a etre le salt qui nous revient
        next();  //next sinon ca bloque ici
      });
    });
  } else {
    next();
  }
});


const User = mongoose.model('User', UserSchema);




module.exports = { User}
