const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //ES6 faut dire quel type de promise.

//mongodb://axe-z:0123456@ds155631.mlab.com:55631/todoapp
//je devrais essayer en enlevant db , juste mongoose.connect
 //const db = mongoose.connect(process.env.MONGODB_URI, {
 mongoose.connect(process.env.MONGODB_URI, {
//  const db = mongoose.connect('mongodb://axe-z:0123456@ds155631.mlab.com:55631/todoapp' , {
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
}
