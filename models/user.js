const mongoose = require('mongoose');
const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlenght: 3,
    trim: true        //va laisser au max 1 espace entre les mots. enleve le trop au debut et fin.
  },
  name: {
    type: String,
    minlenght: 3
  }
});



const createUser = (emailAd, nom) =>  {
 return  new User({
   email: emailAd,
   name: nom
 }).save()
 .then(data => {
  console.log(data)
 })
 .catch(err => {
   console.log(err)
 });
}

//createUser('ben@axe-z.com', 'Benoit2');

// let ben = new User({
//   email: 'benoit@axe-z.com',
//   name: "Axe-Z"
// })
// .save()
// .then(data => {
//  console.log(data)
// })
// .catch(err => {
//   console.log(err)
// });

module.exports = { User, createUser}
