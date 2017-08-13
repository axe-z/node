///////////////REQUIRE
// const fs = require('fs');
// const os = require('os');
const _ = require('lodash');
const mongoose = require('mongoose');
const mongodb = require('mongodb');




































///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec AXIOS ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////
/*
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
*/





///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec AXIOS ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec CB ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////

/*
const yargs = require('yargs');
//const request = require('request');
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather.js')

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


///GETWEATHER.JS PREND LAT, LNG, ET CB

weather.getWeather(45.6019541, -73.7192987, (errorMessage, results) => {
  if ( errorMessage ) {
     console.log( errorMessage )
   } else {
     console.log( results.today )
     console.log( results.temp )
   }
});
}
*/

///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app avec CB ////                            ////
///////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////
///                        ////Weather app////                                                  ////
///////////////////////////////////////////////////////////////////////////////////////////////
/*const request = require('request');

request({
  url:'https://api.forecast.io/forecast/d80d824fdc71f6544304bfd33d681253/45.6019541,-73.7192987?units=ca&lang=fr',
  json: true
}, (error, response, body) => {
//  console.log(JSON.stringify(body, undefined, 2)); ////
//longue maniere ....
// if(error){
//   console.log('marche pas');
// }
// else if (response.statusCode === 404) {
//   console.log('aucune reponse avec ces coordonees')
// }
// else if (response.statusCode === 200) {
//   console.log(typeof body) //obj
//   console.log(body.currently.temperature) // 67.95
//   console.log(body.daily.summary)
//   //Pluie faible lundi jusqu’à samedi prochain, avec des températures atteignant 29°C mercredi.
// }
//Short maniere
if (!error &&  response.statusCode === 200) {
  console.log(typeof body) //obj
  console.log(Math.round(body.currently.temperature)) // 26
  console.log( body.currently.temperature) // 26.49
  console.log(body.daily.summary)
} else {
  console.log('Un probleme est survenu')
}

});

*/
/*///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///ASYNC REQUEST /////                                         ////
///////////////////////////////////////////////////////////////////////////////////////////////
const yargs = require('yargs');
const request = require('request');

//le yargs
const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Adresse pour rechercher la temperature',
    string: true      //yargs va parser en string.
  }
}).help().alias('help', 'h').argv;

//node app.js -a="5261 garnier montreal"
console.log(argv)
//Donne cet OBJECT:
// { _: [],
//   help: false,
//   h: false,
//   a: '5261 garnier montreal',
//   address: '5261 garnier montreal',
//   '$0': 'app.js'
// }

//console.log(encodeURIComponent('5161 garnier montreal')) //5161%20garnier%20montreal
//console.log(encodeURIComponent(argv.a));  //5161%20garnier%20montreal  VOILA

const geocode = require('./geocode/geocode')
//importer le request.


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage)
  } else {
    console.log(JSON.stringify(results, null, 2));
  }

});


///////////////////////////////////////////////////////////////////////////////////////////////
///                        ///ASYNC REQUEST /////                                         ////
///////////////////////////////////////////////////////////////////////////////////////////////
*/

//
// const addresse = encodeURIComponent(argv.a);
// //le request a google.
//
// request({
//   url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addresse}`,
//   json: true                //va recevoir du json, et ca le transforme en obj.
// }, (error, response, body) => {
//  //console.log(JSON.stringify(response, null, 2))
//  //console.log(JSON.stringify(body, null, 2)) //permet de bien voir l arbre. null et separer de 2 caracteres
// if(error) {  //null si pas.
//   console.log('un erreur s\'est produit', response.statusCode)
//   // console.log(response.statusCode) //plus facile a trouver dans le body.
// } else if (body.status === 'ZERO_RESULTS') {  //bonne idee de faire des test sur le site, pour voir les erreurs.
//    console.log('Aucun resultat retrouvé')
//  } else if (body.status === 'OK') {  //OK quand tout es beau.
//     const {lat, lng } = body.results[0].geometry.location;
//     console.log('lat: ' + lat,'lng: ' +  lng) //45.5351737 -73.5854221
//     console.log('Adresse: ', body.results[0].formatted_address)
//  };
// });

/*
reponse body:
{
  results: [
    {
      address_components: [Array],
      formatted_address: '5261 Rue Garnier, Montréal, QC H2J 3T3, Canada',
      geometry: [Object],
      partial_match: true,
      place_id: 'Ei81MjYxIFJ1ZSBHYXJuaWVyLCBNb250csOpYWwsIFFDIEgySiAzVDMsIENhbmFkYQ',
      types: [Array]
    }
  ],
  status: 'OK'
}
*/

// reponse body.results[0].geometry.location :
// { lat: 45.5351737, lng: -73.5854221 }

// const {lat, lng } = body.results[0].geometry.location;
// console.log(lat, lng)  //45.5351737 -73.5854221




















///////////////////////////////////////////////////////////////////////////////////////////////
///                        /////debut YARGS module 2-3-4///                                     ////
///////////////////////////////////////////////////////////////////////////////////////////////
 //const ext = require('./ext.js');
//const yargs = require('yargs');

// const command = process.argv[2];
// //console.log("command " +  command)

//yargs PART1
// const argv = yargs.argv;
//console.log(argv) //{ _: [ 'remove' ], title: 'secrets', '$0': 'app.js' }
// const command = argv._[0]
/*
//yargs PART2
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


*/


///////////////////////////////////////////////////////////////////////////////////////////////
///                        /////fin de YARGS module 2-3-4///                                     ////
///////////////////////////////////////////////////////////////////////////////////////////////




// const express = require('express');

//const mongoose = require('mongoose');

// const app = express();
//const bodyParser = require('body-parser');  //middleware qui etait avant par default avant dans express...
//////////////////////////////////////////////////////////////////////////
//mongo connection, plusieurs versions....
//mongoose.Promise = global.Promise;
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//  console.log("it's done")
// });
//AVEC LA DERNIERE VERSION. CECI EST LA BONNE MANIERE
// const promise = mongoose.connect('mongodb://localhost/example', {
//   useMongoClient: true,
//   /* other options */
// });
//
// promise.then((db) => {
//   console.log("it's done")
//   //console.log(db.base.modelSchemas.Book.obj.title)
// })
//////////////////////////////////////////////////////////////////////////







//MONGO CONNECTION//////////////////////////////////////////////////////////////////////////
// const port = 3050;
//
// app.listen(port, (err) => {
//   console.log(`roule sur le port 3050 ... mais moi sur ${port}`)
//   if(err) {
//     console.log(err)
//   }
// });
//MONGO CONNECTION//////////////////////////////////////////////////////////////////////////




//module.exports = app;
