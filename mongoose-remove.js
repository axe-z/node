//const mongoose = require('mongoose');
const { mongoose, db } = require('./db/mongoose');
const {ObjectID} = require('mongodb'); //mongoNative
//const {app} = require('./../serveur');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


/////delete tout, si y a pas de param.
// Todo.remove({}).then(res => {
//   console.log(result)
// });
//retourne l info sur combien a ete detruit.


/*//va retourner lui qui est parti
Todo.findOneAndRemove({_id: '599454c89037f52b8ba6f788'})
.then(data => {
 console.log(data)
})
.catch(err => {
  console.log(err)
});
//va retourner l item
*/

/*
//By ID
Todo.findByIdAndRemove('5994554d09f1552bb5931821')
.then(data => {
 console.log(data)
})
.catch(err => {
  console.log(err)
});

//retourne
// { _id: 5994554d09f1552bb5931821,
//   text: 'ceci vient dmlabs3',
//   completed: false,
//   completedAt: 1502893389954,
//   __v: 0 }
*/
