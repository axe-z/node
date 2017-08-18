///////ENV
const env = process.env.NODE_ENV || 'development';  //soit test ou dev
console.log('env-*******', env)
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://axe-z:0123456@ds155631.mlab.com:55631/todoapp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

module.exports = {
 env
}
