module.exports.add = (a,b) => a + b;

module.exports.square = (a) => a * a;


module.exports.setName = ( user = {}, fullName) => {
  let names = fullName.split(' ');
  user.first = names[0];
  user.lastName = names[1];
  //console.log(user)
  return user;
};


module.exports.asyncAdd = (a, b, cb) => {
  setTimeout(() => {
    cb(a+b)
  },1000)  ///pas mettre plus de 1000 sinon ca chi et je sais pas pourquoi.
}


module.exports.asyncSquare = (a, cb) => {
  cb(a * a);
}
