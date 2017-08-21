const {SHA256} = require('crypto-js')
const bcrypt = require('bcryptjs');



//SHA256 est un de plusieurs mode de compression, en 256-bits.
/*
AVEC CRYPTO

//simple hashing, donnera toujours la meme chose pour ce string
let  message = 'Je suis user num 3';
const hash = SHA256(message);

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

const data = {
  id: 4
}
const token = {
  data,
  hash: SHA256(JSON.stringify(data)+ process.env.JWT_SECRET).toString()
}

 const resultHash = SHA256(JSON.stringify(token.data) + process.env.JWT_SECRET).toString();

if(resultHash === token.hash) {
  console.log('Le data n\'a pas été tempéré')
} else {
  console.log('ne trust pas ca')
}
*/


/*
//AVEC JSON WEB TOKEN
const jwt = require('jsonwebtoken');

const data = {
  id: 10
}
      //data et secret
const token = jwt.sign(data, '123abc');
console.log(token)
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTUwMzAyMjA2Mn0.w9QlRYXLyypiM2t_6uI9vQjt93Y26bwuvgfllUGSf2Y

const decode = jwt.verify(token, '123abc');
console.log(decode)
//{ id: 10, iat: 1503022243 } malade !!
*/

///hash ET salt

const password = '123abc';

//CREER LE HASH ET SALT
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
  //  console.log(hash) //$2a$10$pxEBmiSQRGm/tbslmirBxOZuAukKBxU2KLqgq/WymyqoKwdT6fJHq
  })
})  //10 est la longueur, donc un brut force est tuff.

//LIRE LE HASH ET SALT
const hashedPas = '$2a$10$pxEBmiSQRGm/tbslmirBxOZuAukKBxU2KLqgq/WymyqoKwdT6fJHq';
bcrypt.compare(password, hashedPas, (err, result) => {
  console.log(result); //TRUE
})
