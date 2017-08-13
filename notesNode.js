/////////////////////////////////////////GROS COUR NODE 12GIG/////////////////////////////////////////////
DE ANDREW MEAD

///////////////FS

FS - REQUIRE('FS') ///file systeme -inclus dans node donc pas de npm, mais on doit l importer.
const fs = require('fs');
//node6
fs.appendFile('greeting.txt', 'Bonjour! Benoit');

//maintenant avec les derniere version de node.js il faut ajouter un callback:
fs.appendFile('greeting.txt', 'Bonjour! Benoit', (err) => {
  console.log('done');  //un fichier va se creer avec comme contenu, le string qu on y met.
  if(err){
    console.log('ca chier')
  }
});

//donc utiliser node 7 et plus:
fs.appendFileSync('greeting.txt', 'Bonjour! Benoit');

///////////////FS

***************************************************************************************************

///////////////OS
const os = require('os');

let user = os.userInfo();
console.log(user) //info system.
// { uid: 502,
//   gid: 20,
//   username: 'axez',              //login
//   homedir: '/Users/axez',        //REP
//   shell: '/bin/bash' }           //veut dire osX

donc
 fs.appendFileSync('greeting2.txt', `Bonjour ${user.username} en sync `);  // Bonjour axez en sync

///////////////OS

***************************************************************************************************

///////////////MODULE - MODULE.EXPORTS
module est un object que tous les fichiers ont et permet de passer des function on data a d autre fichiers

DANS EXT.JS :
module.exports.age =  25;

DANS APP.JS :
const ext = require('./ext.js');
console.log(typeof ext) //obj

fs.appendFileSync('greeting2.txt', `Bonjour ${user.username} en sync, jai ${ext.age} ans`);
//: Bonjour axez en sync, jai 25 ans


//AVEC FN
DANS EXT.JS :
module.exports.add = (a,b) => {
  return a + b
}
//ensuite
DANS APP.JS :
const ext = require('./ext.js');
ext.add(2,6) //8

///////////////MODULE - MODULE.EXPORTS

***************************************************************************************************

///////////////LODASH
un paquet de conviniance method dans LODASH, un incontrounable autant pour front que back-end.

const _ = require('lodash');

examples:

 console.log(_.isString('Benoit')); //true

 const arr = [1,2,3,4,4,5,4,1,2,3]
 console.log(_.uniq(arr)) //[ 1, 2, 3, 4, 5 ] enlevev tous les doublons


///////////////LODASH

***************************************************************************************************

///////////////PROCESS
PROCESS est un obj, qui regroupe pas mal tout, l environement, des arguments ajouté, assert, etc...

Donc si on lance dans le terminal: NODE APP.JS LIST , list devient un argument: argv

console.log(process.argv) // [ '/usr/local/bin/node','/Users/axez/Desktop/Node_Essential/app.js', 'list' ]
Donc 1- node, le programme, 2-notr fichier de base, 3- ce qu on a ajouté , list.

Donc
const command = process.argv[2];
console.log(command) ///'list'

if (command === "add") {
	console.log("ajout d une note");
} else if (command === "list") {
	console.log("lister les listes");
} else if (command === "read") {
	console.log("lire la note");
} else if (command === "remove") {
	console.log("deleter la note");
} else {
	console.log("Command non reconnue");
}

Donc si je met dnas le terminal NODE APP.JS READ j aurai "lire la note"
Donc si je met dnas le terminal NODE APP.JS REMOVE j aurai "deleter la note"


MAINTENANT,
NODE APP.JS REMOVE --TITLE="SECRETS"

process.argv = [ '/usr/local/bin/node',
  '/Users/axez/Desktop/Node_Essential/app.js',
  'remove',
  '--title=secrets' ]



Il est donc possible de jouer avec ca. Et de creer des action ndas le terminal avec cet argument qu on peut modifier. les deux premiers sont hors de notre controle , mais ensuite, a nous d y voir si utilise

Mais il devient difficile de parser le data qu on y met, sauf avec un plugin yargs

//console.log(process.env.NODE) ///usr/local/bin/node -- c est un unix executable
///////////////PROCESS

***************************************************************************************************

///////////////YARGS
 Va nous aider a traiter, comme bodyparser, pour les requests. dans le command line le process.ARGV.
Creant un obj clair avec les argv

const argv = yargs.argv;
Va creer un object et bien separer les key et meme values.

avec node app.js remove --title="secrets"
console.log(argv) //{ _: [ 'remove' ], title: 'secrets', '$0': 'app.js' }

node app.js add :
{ _: [ 'add' ], '$0': 'app.js' }

node app.js add encrypted :
{ _: [ 'add', 'encrypted' ], '$0': 'app.js' }




la methode Avancé :
 POUR CREER UNE VARIABLE IL FAUT METTRE LE --DEVANT LE KEY, ET = POUR LA VALUE, SI PLUS D UN MOT "ENTRE".

 const command = process.argv[2];  //va voir si READ LIST REMOVE..
 const argv = yargs.argv; //va parser et mettre dans un obj de key valued pair.

 if (command === "add") {
   ext.addnote(argv.title, argv.body);
 } else if (command === "list") {
   ext.getAll();
 } else if (command === "read") {
   ext.getNote(argv.title);
 } else if (command === "remove") {
   ext.removeNote(argv.title, argv.body);
 } else {
 	console.log("Command non reconnue");
 }

exemple complet:
Dans app.js
if (command === "add") {
  ext.addnote(argv.title, argv.body);
}

Dans ext.js
const addnote = (title, body) => {
  console.log('ajout de note', title, body)
};

module.exports = addnote

node app.js add --title=secret --body="Ceci est mon secret"
DONNE:
AJOUT DE NOTE SECRET CECI EST MON SECRET

node app.js remove --title=Ben --body="drole bcp plus chaque jour Ben"
DONNE:
delete de note Ben

IMPORTANT
SUITE DE YARGS ligne 350


///////////////YARGS

***************************************************************************************************

///////////////JSON
Parce en JS les key non pas besoin de "" ou peuvent utiliser les '' , JSON.stringify(obj) va parser l object et le mettre en vrai json. et ce meme obj va devenir un simple string. Et son inverse JSON.parse(string)

//JSON.stringify()
const obj = {
  name: "Ben"
}

let stringObj = JSON.stringify(obj);
console.log(typeof stringObj);         //string
console.log(stringObj)                 //{"name":"Ben"}


//JSON.parse()
let personString = '{"name": "Ben", "age" : 40}';
let personObj = JSON.parse(personString);
console.log(typeof personObj)           //obj
console.log(personObj)                  //{ name: 'Ben', age: 40 }


exercise, creer et lire un fichier JSON
const fs = require('fs');

let originalNote = {
  title: 'Un titre cool',
  body: 'du contenu'
}
let ori = JSON.stringify(originalNote); //convertir en json
fs.writeFileSync('./notes.json', ori);     //va creer un fichier et mettre le json

//lire et refaire un obj js.
let noteString = fs.readFileSync('notes.json');
let note = JSON.parse(noteString)
console.log(note) //{ title: 'Un titre cool', body: 'du contenu' }



EXERCISE PLUS AVANCE:
on va creer un fichier notes-data.json
aux traver du terminal en y mettant des argv.
add demande un title et un body
si y a rien au depart. creer le fichier
si on en ajoute un autre, il doit suivre et ne pas effacer
et s assurer qu il n y a pas de doublons avec filter.


const fs = require('fs');
///si on lance dans le terminal : node app.js add --title=entrevue3 --body="super parfait322"

const addnote = (title, body) => {
    let notes = [];
    let note = {
      title,
      body
    };

    //verifier si le fichier n est pas encore la
    try {    //pour partir du bon endroit dans le fichier si deja du stock
      let noteString = fs.readFileSync('notes-data.json');
      notes = JSON.parse(noteString); // le contenu actuel.
    } catch(e){
      //console.log(e)
    }

    let duplicateNotes = notes.filter(note => {
      return note.title === title // si le titre qu on met est le meme , c est donc un doublons.
    })
    if(duplicateNotes.length === 0) {  //donc seulement si y a pas de situation de doublons on write.
      //pour ecrire
      notes.push(note); // si y a rien , ca push , si y a quelques chose, sa ajoute.
      fs.writeFileSync('notes-data.json', JSON.stringify(notes))
    };
};




MAINTENANT ON VA REFORMATER POUR QUE  ERTAINE FUNCTION SOIT UTILISABLE POUR LES AUTRES ACTION DU CRUD

const fs = require('fs');

const fetchNotes = () => {
	try {
		let noteString = fs.readFileSync("notes-data.json");
		return JSON.parse(noteString); // Retourne le contenu actuel [{},{}]
	} catch (e) {
		return [];      //on va retourner un array vide au cas d un error.
	}
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}
//ADD
const addnote = (title, body) => {
    let notes = fetchNotes(); //retourne ce qu on a , ou un arr vide.
    let note = {title,body};
  let duplicateNotes = notes.filter(note => {
      return note.title === title
    })
    if(duplicateNotes.length === 0) {
      notes.push(note);
      saveNotes(notes);
      return note;
    };
};
//DANS APP.JS
if (command === "add") {
	let note = ext.addnote(argv.title, argv.body);
	if (note !== undefined) {
		//ou if (note) undefined est falsy.
		console.log("Bravo !" + note); //{ title: 'entrevue6', body: 'super cooltrippant' }
	} else {
		console.log("une erreur s'est produit.");
	}
}

//TERMINAL
// node app.js add --title=entrevue6 --body="super cooltrippant"


//REMOVE
const removeNote = (title) => {
  let notes = fetchNotes();
  let filteredNote = notes.filter(note => {
    return note.title !== title;
  });
  saveNotes(filteredNote);
  return notes.length !== filteredNote.length //si o ndelete ca devrait pas etre pareil.
};

//app.js
if (command === "remove") {
 let noteRemoved = ext.removeNote(argv.title);
 let message = noteRemoved ?  `${argv.title} a ete retiré` : 'rien n est arrivé' ;
 console.log(message);

//TERMINAL
//node app.js remove --title=entrevue6

/*
command remove
{ _: [ 'remove' ], title: 'entrevue6', '$0': 'app.js' }
entrevue6 a ete retiré
*/



///////////////JSON

***************************************************************************************************

///////////////YARGS PART II
LES METHODES

const argv = yargs.command('add', 'ajout d\'une nouvelle note', {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Contenue',
    demand: true,
    alias: 'b'
  }
})
.help()
.argv;
  title: {
    describe: 'Title of note',
    demand: true,       //required
    alias: 't'          //shortcut.
  }
})
.help()
.argv;

//node app.js list --help
// Options:
//   --help       Show help                                               [boolean]
//   --title, -t  Title of note                                          [required]
//   --body, -b   Contenue                                               [required]


AU FINAL:
let titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const argv = yargs.command('add', 'ajout d\'une nouvelle note', {
  title: titleOptions,
  body: {
    describe: 'Contenu de la note',
    demand: true,
    alias: 'b'
  }
})
.command('list', 'lire les notes')
.command('read', 'verifier une note', {
  title: titleOptions
}).command('remove', 'detruire une note', {
  title: titleOptions
})
.help()
.argv;


const command = argv._[0] //donne le add , list ,read ou remove

if (command === "add") {
  let note = ext.addnote(argv.title, argv.body);
  if(note !== undefined){   //ou if (note) undefined est falsy.
    console.log('Bravo ! voici le detail: ' )  //{ title: 'entrevue6', body: 'super cooltrippant' }
    ext.logNote(note)
  } else {
    console.log('une erreur s\'est produit. on ne peut pas douler.');
  }
}

else if (command === "list") {
  const allNote = ext.getAll();
  console.log(`afficher les ${allNote.length} notes`);
  allNote.forEach( note => {
    ext.logNote(note)
  });
}

else if (command === "read") {
  const noteTitle = ext.getNote(argv.title);
  if(noteTitle) {
    console.log('Oui il y a un ' + noteTitle.title + ' voici le contenu ' + noteTitle.body);
  } else {
    console.log(`non desole aucun titre ${argv.title} n'a ete retrouve`  );
  }
}

else if (command === "remove") {
  let noteRemoved = ext.removeNote(argv.title);
  let message = noteRemoved ?  `${argv.title} a ete retiré` : 'rien n est arrivé' ;
  console.log(message);
} else {
 console.log("Command non reconnue");
}


///////////////YARGS PART II

***************************************************************************************************

///////////////ARROW FUNCTION



//DANS UN OBJECT DEPUIS ES6

//les functions en es6 dans les obj

let obj = {
  name: "ben",
  sayhi: () => {
    console.log(arguments); //marche pas
    console.log(`allo je suis ${this.name}`)  //marche pas
  },
  sayhiEs6(){
    console.log(arguments);  // donne les args si y a .
    console.log(`allo je suis ${this.name} en es6`)  // va trouver le name.
  }
}
obj.sayhi('arg1', 'arg2');
//obj.sayhiEs6('arg1', 'arg2');


///////////////ARROW FUNCTION

***************************************************************************************************

///////////////ASYNC NODE

REQUEST est un package qui rend les call http tres simple c est le yargs, bodyparser des call http.
pour info : https://www.npmjs.com/package/request

https://maps.googleapis.com/maps/api/geocode/json?address=5261%20garnier%20montreal


const request = require('request');


request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=5261%20garnier%20montreal',
  json: true                //va recevoir du json, et ca le transforme en obj.
}, (error, response, body) => {
//ERREUR n'est pas un erreur de connection, mais si l adresse, l adresse est pas bonne,
//RESPONSE : info de la connection,status et inclut le body,  donc on pourrait response.body
// BODY est litt. la page web, le code.
 console.log(JSON.stringify(body, null, 2)) //permet de bien voir l arbre.

 const {lat, lng } = body.results[0].geometry.location;
 console.log('lat: ' + lat,'lng: ' +  lng) //45.5351737 -73.5854221
 console.log('Adresse: ', body.results[0].formatted_address)
});


si on veut faire ca par la console on va s aider avec yargs qui va nous donner un obj tout clean:

//le yargs
const argv = yargs.options({
  address: {
    demand: true,
    alias: 'a',
    describe: 'Adresse pour rechercher la temperature',
    string: true      //yargs va parser en string.
  }
}).help().alias('help', 'h').argv;   //on a ajouté un alias a help , juste -h

DONC si on entre :

//node app.js -a="5261 garnier montreal"


console.log(argv)
//Donne :
// { _: [],
//   help: false,
//   h: false,
//   a: '5261 garnier montreal',
//   address: '5261 garnier montreal',
//   '$0': 'app.js'
// }



 ENCODEURICOMPONENT

 console.log(encodeURIComponent('5161 garnier montreal')) //5161%20garnier%20montreal
 console.log(encodeURIComponent(argv.a));  //5161%20garnier%20montreal  VOILA !


 const addresse = encodeURIComponent(argv.a);
 //le request a google.
 request({
   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresse}`, //ici
   json: true                //va recevoir du json, et ca le transforme en obj.
 }, .....



Traiter les erreures possibles=>


request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresse}`,
  json: true                //va recevoir du json, et ca le transforme en obj.
}, (error, response, body) => {

if(error) {  //null si pas.
  console.log('un erreur s\'est produit', response.statusCode)
 //plus facile a trouver dans le body.
} else if (body.status === 'ZERO_RESULTS') {  //bonne idee de faire des test sur le site, pour voir les erreurs.
   console.log('Aucun resultat retrouvé')
 } else if (body.status === 'OK') {  //OK quand tout es beau. abus.

    const {lat, lng } = body.results[0].geometry.location;
    console.log('lat: ' + lat,'lng: ' +  lng) //45.5351737 -73.5854221
    console.log('Adresse: ', body.results[0].formatted_address)

 };
});

***************************************************************************************************


faire ca plus clean encore :

APP.JS
console.log(encodeURIComponent('5161 garnier montreal')) //5161%20garnier%20montreal
console.log(encodeURIComponent(argv.a));  //5161%20garnier%20montreal  VOILA

const geocode = require('./geocode/geocode')
//importer le request.

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(results, null, 2));
  }
});

LE GEOCODE :

const geocodeAddress = (address, callback) => {  //soit errorMessage ou results

  const addresseEncode = encodeURIComponent(address);
  //le request a google.

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`,
    json: true                      //va recevoir du json, et ca le transforme en obj.
}, (error, response, body) => {
if (error) {                       //null si pas.
                                    // console.log('un erreur s\'est produit', response.statusCode)
    callback('un erreur s\'est produit' + response.statusCode);
                                   // console.log(response.statusCode) //plus facile a trouver dans le body.

} else if (body.status === 'ZERO_RESULTS') {
                                    //bonne idee de faire des test sur le site, pour voir les erreurs.
                                   // console.log('Aucun resultat retrouvé')
     callback('Aucun resultat retrouvé')
} else if (body.status === 'OK') {  //OK quand tout es beau.

      callback( undefined , {           //undefined, pour passer le errorMessage !!!
        address: body.results[0].formatted_address,
        lat:  body.results[0].geometry.location.lat,
        lng:  body.results[0].geometry.location.lng
      });
                                    //const {lat, lng } = body.results[0].geometry.location;
                                    //console.log('lat: ' + lat,'lng: ' +  lng) //45.5351737 -73.5854221





 node app.js -a=H7M2C6
 {
   "address": "Laval, QC H7M 2C6, Canada",
   "lat": 45.6019541,
   "lng": -73.7192987
 }

///////////////ASYNC NODE


***************************************************************************************************

///////////////WEATHER APP avec CB

api key:
d80d824fdc71f6544304bfd33d681253

pour mettre les units en celcius :
https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/45.6019541,-73.7192987?units=ca

pour que le sommaire soit en Francais
https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/45.6019541,-73.7192987?units=ca&lang=fr


DANS WEATHER/WEATHER.JS

const request = require('request');
const getWeather = () => {
	request(
		{
			url:
				"https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/45.6019541,-73.7192987?units=ca&lang=fr",
			json: true
		},
		(error, response, body) => {
			if (!error && response.statusCode === 200) {
				console.log(typeof body); //obj
				console.log(Math.round(body.currently.temperature)); // 26
				console.log(body.currently.temperature); // 26.49
				console.log(body.daily.summary);
			} else {
				console.log("Un probleme est survenu");
			}
		}
	);
};
module.exports = {
  getWeather
}

donc ...


DANS APP.JS
donc dans l ordre on call dans le terminal : node app.js  -a "h2j 3w5"

geocode.geocodeAddress va retourner le lat et lng, avec ceux ci on peut faire fonctionner le getWeather()

le reste est simple.



//le yargs qui permet de faire node app.js  -a "mettre une addresse ou code postal"
const argv = yargs.options({
  a: {
    demand: false,
    alias: 'address',
    describe: 'Adresse pour rechercher la temperature',
    string: true      //yargs va parser en string.
  }
}).help().alias('help', 'h').argv;

 //console.log(argv)


//va prendre l adresse de ARGVS, et faire un request dessus, avec un CB qui separre error et results"
geocode.geocodeAddress(argv.a, (errorMessage, results) => {
	if (errorMessage) {
		console.log(errorMessage);
	} else {
		//console.log(results.lat);
		//console.log(results.lng);
    //console.log(results.address)
		weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
			if (errorMessage) {
				console.log(errorMessage);
			} else {
				//console.log(weatherResults.today);
				//console.log(weatherResults.temp);
				//console.log(weatherResults.apparentTemperature);
        console.log(`Il fait presentement ${weatherResults.temp} mais on ressent ${weatherResults.apparentTemperature}`);
			}
		});
	}
});



///////////////WEATHER APP avec CB

***************************************************************************************************

///////////////Promises

api key:
d80d824fdc71f6544304bfd33d681253

pour que le sommaire soit en Francais
https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/45.6019541,-73.7192987?units=ca&lang=fr

BASE D UNE PROMISE
une promesse va soit resolver ou rejecter, pas les deux

const test = temps => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			if (temps >= 2500) {
				res("brave");
			} else {
				rej("oups");
			}
		}, temps);
	});
};


test(2000).then((ceQuonRecoitDuRes) => {    //OUPS
  console.log('Sucess: ', ceQuonRecoitDuRes)
})
.catch(ceQuonRecoitCommeErr => {
  console.log('Error: ', ceQuonRecoitCommeErr)
});


Chaining de Promise(
)


//ou plus simple :
test(2900).then((ceQuonRecoitDuRes) => {    // pour chainer la promesse.
  console.log('Sucess: ', ceQuonRecoitDuRes)  //
  return test(2400);
})
.then((res)  => {
  console.log(res , 'Ben 2 then')
})
.catch(ceQuonRecoitCommeErr => {
  console.log('Error: ', ceQuonRecoitCommeErr, arguments)
});


///////////////Promises

***************************************************************************************************

///////////////WEATHER APP avec Promises avec Request
const request = require('request');

const geocodeAddress = (address) => {
	return new Promise((res, rej) => {
		const addresseEncode = encodeURIComponent(address);
		request(
			{
				url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`,
				json: true //va recevoir du json, et ca le transforme en obj.
			},
			(error, response, body) => {
				if (error) {
					rej("un erreur s'est produit" + response.statusCode);
				} else if (body.status === "ZERO_RESULTS") {
					rej("Aucun resultat retrouvé");
				} else if (body.status === "OK") {
					res({
						address: body.results[0].formatted_address,
						lat: body.results[0].geometry.location.lat,
						lng: body.results[0].geometry.location.lng
					});
				}
			}
		);
	});
};


geocodeAddress('H7M 2C6')
.then(location => {
  console.log(JSON.stringify(location, null, 2));  //tout l obj.
  console.log(location.lat)   //45.6019541
})
.catch(err => {
  console.log(err)
})


///////////////WEATHER APP avec Promises avec Request

***************************************************************************************************

///////////////WEATHER APP avec Promises et Axios  .
POUR LE ROULER :
node playground/appPromise.js -a="H7M 2C6"

const yargs = require('yargs');
const axios = require('axios');

//le yargs qui permet de faire node app.js  -a "mettre une addresse ou code postal"
const argv = yargs.options({
  a: {
    demand: false,
    alias: 'address',
    describe: 'Adresse pour rechercher la temperature',
    string: true      //yargs va parser en string.
  }
}).help().alias('help', 'h').argv;

//console.log(argv)
const addresseEncode = encodeURIComponent(argv.address);
//node appPromise.js -a="H7M 2C6"
//console.log(addresseEncode) //H7M%202C6

const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${addresseEncode}`

axios
	.get(geocodeUrl)
	.then(response => {
		if (response.data.status === "ZERO_RESULTS") {
			throw new Error("Rien n'a ete trouvé a cette addresse");
		}
  //  else if (response.data.status === "OK") {   //pas vraiment necessaire
		const { lat, lng } = response.data.results[0].geometry.location;
		const weatherUrl = `https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/${lat},${lng}?units=ca&lang=fr`;
		return axios
			.get(weatherUrl)
			.then(res => {
				const temp = res.data.currently.temperature;
				const resume = res.data.daily.summary;
				const apparentTemperature = res.data.currently.apparentTemperature;

				console.log(`Il fait presentement ${Math.round(temp)} mais on ressent ${Math.round(apparentTemperature)} avec l'humidité`);
			})
			.catch(e => {
				console.log(e);
			});
//    }  //fin du else if OK
	})
	.catch(err => {
		//bonne idee de tester , en fermant sa connection , address 00000
		if (err === "ENOTFOUND") {
			console.log("pas capable de se connecter au serveur");
		} else {
			console.log(err);
		}
	});

///////////////WEATHER APP avec Promises et Axios


***************************************************************************************************
**************************************NODE ************************************************
***************************************************************************************************
***************************************************************************************************

 NEXT 

notesExpress.js
