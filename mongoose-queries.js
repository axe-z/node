//const mongoose = require('mongoose');
const { mongoose, db } = require('./db/mongoose');
const {ObjectID} = require('mongodb'); //mongoNative
//const {app} = require('./../serveur');
const { Todo } = require('./models/todo');

const id = '599100ab170cdc199ba831c8';

////find, un id, retourne un array de doc, ici juste un parce que id.. mais ..
Todo.find({
  completed: false           //pas besoin de new ObjectId
})
.limit(3)
.then(todos => {
 console.log(todos)
})
.catch(err => {
  console.log(err)
});

//findOne   ici retourne qu une seul truc, obj, pas d array
Todo.findOne({
  _id: id
})
.then(todo => {
  if(!todo){
    console.log('rien de retouné')
  }
 console.log(todo)
});


///best pour un id.
Todo.findById(id)
.then(todo => {
  if(!todo){
    console.log('rien de retouné')
  }
 console.log(todo)
});




 ///avec ObjectID , on peut avant de faire un query verifie si valid ou pas, ObjectID vient du native mongo, pas mongoose.


const { User } = require('./models/user');
const idUser = '598fa32586a4460dd493cf64';

 if(ObjectID.isValid(idUser)){
   console.log('oui User!!!')

   User.findById(idUser)
   .then(user => {
     if(!user){
       console.log('rien de retouné')
     }
    console.log(user)
   });
 }


 
/*
{ _id: 598fa32586a4460dd493cf64,
   email: 'benoit@axe-z.com',
   name: 'Axe-Z',
   __v: 0
 }
  */
