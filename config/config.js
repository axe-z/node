///////ENV
const env = process.env.NODE_ENV || 'development';  //soit test ou dev

if(env === 'development' || env === 'test') {
  const config = require('./config.json');
  //console.log(config)
  const envConfig = config[env];  ///va etre test ou development
  //console.log(envConfig)  //retourn lui en fonction
  //console.log(Object.keys(envConfig)); // sort un array des keys [ 'PORT', 'MONGODB_URI' ]

  Object.keys(envConfig).forEach( key => {
   process.env[key] = envConfig[key] //sort la value
  });
   console.log('env-*******', env)
}

//on a un fichier json

// if(env === 'development'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://axe-z:0123456@ds155631.mlab.com:55631/todoapp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
//
// module.exports = {
//  env
// }
