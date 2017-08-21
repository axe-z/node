const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlenght: 3,
    trim: true        //va laisser au max 1 espace entre les mots. enleve le trop au debut et fin.
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator:{
    type: mongoose.Schema.Types.ObjectId,    //_id d ailleurs .. 
    required: true
  }
});




module.exports = {Todo}






// c est un constructor qui fait une instance de Todo.
// let newTodo = new Todo({
//   text: 'Marcher    avec mongoose5',
//   completed: false,
//   completedAt: Date.now()
// })
//
// //retourne une promesse
// newTodo.save()
// .then(data => {
//  console.log(data)
// })
// .catch(err => {
//   console.log(err)
// });
