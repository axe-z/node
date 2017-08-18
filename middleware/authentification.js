
const {User} = require('./../models/user');

const authentification = (req, res, next) => {
    const token = req.header('x-auth');
    
    User.findByToken(token)
   .then(user => {
     if (!user) {
      return Promise.reject()   ///va pitcher en bas dans catch!!
      }
       req.user = user;             //on va le mettre sur req
       req.token = token;
       next();                     //next, sinon ca arrete la ..
   })
   .catch(err => {
    	res.status(401).send();
   });
};


module.exports = { authentification };
