const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //ES6 faut dire quel type de promise.


//je devrais essayer en enlevant db , juste mongoose.connect
const db = mongoose.connect('mongodb://localhost/TodoApp', {
  useMongoClient: true,
})
.then(con => {
  console.log('connection reussi...')
})
.catch(err => {
  console.log(err)
});


module.exports = {
  mongoose,
  db
}
