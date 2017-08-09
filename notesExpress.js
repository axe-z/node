
***************************************************************************************************
***************************************************************************************************
***********************************   EXPRESS      ************************************************
***************************************************************************************************
Nodemon: "server": "nodemon server.js -e js,hbs"  -e js,hbs est pour qu il regarde ses extensions
///////////////Bonjour Express La base
const express = require('express');
const app = express();



///////////middleware

 App.use a besoin du ABSOLUTE PATH , c est a dire du disque dur a ici..
 et les fichier vont bouger... donc il y a une solution: __dirname qui devient l equivalant de tout le path jusqu au rep

app.use( express.static( __dirname + '/public'));

 LOCALHOST:3000/HELP.HTML  //et non pas public/help
 Dans static on peut y mettre notre css, js ... et ca devient un site normal
///////////middleware

/////////////Get routes
app.get('/' , (req, res) => {
  //res.send('<h1>Bonjour Express</h1>');  //Content-Type: text/html
  res.send({                               //Content-Type: json
    nom: "Benoit",
    likes: [
      'bass',
      'ordi'
    ]
  })
});

app.get('/about' , (req, res) => {
 res.send('<h1>Page About</h1>');
});

app.get('/bad' , (req, res) => {
 first je savais pas que
});
/////////////Get routes

/////////////Serveur
app.listen(3000, () => {
  console.log('ca roule sur 3000')
});

///////////////Bonjour Express !

***************************************************************************************************

///////////////Templating: HANDLEBARS BASE
pour info:
www.handlebarsjs.com

Template comments with {{!-- --}} or {{! }}.

var context = {
  title: "My First Blog Post!",
  author: {
    id: 47,
    name: "Yehuda Katz"
  },
  body: "My first post. Wheeeee!"
};

<div class="entry">
  <h1>{{title}}</h1>
  <h2>By {{author.name}}</h2>
  <div class="body">
    {{body}}
  </div>
</div>


MAIS EXPRESS UTILISE UNE VERSION QUI LUI EST PROPRE ET FAITE POUR EXPRESS:
https://www.npmjs.com/package/hbs

npm install --save hbs

var hbs = require('hbs');
app.set('view engine', 'hbs');

FAIRE UN REP VIEWS , SUR LA RACINE DU REP ET UN FICHIER ABOUT.HBS
METTRE DU HTML

POUR LE ROULER ENSUITE:
app.get('/about' , (req, res) => {
 res.render('about.hbs', {
    currentYear: new Date().getFullYear(),
    title: 'About page'
 });
});

localhost:3000/about
et Bam ! express va avec hbs faire un render de cette page et l afficher.


<body>
  <h1>{{title}}</h1>
  <p>Lorem \</p>
  <footer>
    <p>COPYRIGHT {{currentYear}}</p>
  </footer>
</body>


///////////////Templating: HANDLEBARS BASE

***************************************************************************************************

///////////////Templating: HANDLEBARS PARTIALS

premierement, les partials est pour se garder ca DRY .
on doit dire a hbs ou regarder pour les partials dans server.js


///HBS
hbs.registerPartials(__dirname + '/views/partials') //faire le rep
app.set('view engine', 'hbs');

Dans le rep partials , on va y mettre footer.hbs

<footer>
  <p>Copyrights {{currentYear}} {{name}}</p>
</footer>

POUR AJOUTER UN PARTIALS AILLEURS:

{{> footer}}  //nom du fichier, simple comme ca.

<header>
    <p><a href="/">icone de logo {{name}}</a></p>
    <p><a href="/about">About</a></p>
    <h1>{{name}} {{title}} </h1>
</header>

ENSUITE
  {{> header}}



il n est pas necessaire d avoir un render de footer . Si c est simple, mais si on y met uen valeur cette variable doit etre dispo DANS TOUS LES PAGES pour ainsi dire , TOUS LES RENDER .. donc si NAME n est pas dans about. meme si on est dnas home et que lui l a , il ne va pas montrer NAME avant que la variable soit dnas les renders de tous les path.  Donc mieux vaut utiliser des variables externes.

comme ceci sur server.js avec registerHelper:
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});





PASSER DU JAVASCRIPT AVEC HBS ET hbs.registerHelper:

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

DANS HOME.HBS
<p>{{ screamIt welcomeMessage}}</p> // welcomeMessage devient l arg: BENOIT LAFRANCE VOUS ACCUEIL



///////////////Templating: HANDLEBARS PARTIALS




///////////////EXPRESS MIDDLEWARE ( TOUS LES APP.USE SONT DU MIDDLEWARE )
NEXT EST LA POUR PASSER LA MAIN APRES QU UN MIDDLEWARE A FAIT SA JOB
app.use((req, res, next) => { ... next()});


// Sans next , ce qui suit n arrivera pas
app.use((req, res, next) => {

 const now = new Date().toString();
 const log = `${now}: ${req.method} ${req.url}`   //Sun Aug 06 2017 13:10:30 GMT-0400 (EDT): GET / (donc la racine)
 //console.log(log);

 //ici on va faire un log de tous les entre, /n est pour skipper une ligne
 fs.appendFileSync('server.log', log + '\n');

  //si je call pas next, ce qui arrive en bas arrivera pas.
 next()
});



QUAND LE SITE EST EN MAINTENANCE ACTIVER CECI:
app.use((req, res, next) => {
  res.render('maintenance.hbs');
next();
});


///////////////EXPRESS MIDDLEWARE ( TOUS LES APP.USE SONT DU MIDDLEWARE )

***************************************************************************************************
VOIR VIDEO 7 - 8 - 9 de andrewmead ( fantasssstic ) de node. pour faire une key ssh si jamais je change d ordi.


///////////////GIT
git --version
//git version 2.11.0 (Apple Git-81)


0- git init   - faire une fois..
//va creer un fichier .git

git status
// Initial commit
// Untracked files:
//   (use "git add <file>..." to include in what will be committed)
//
//         app.js
//         node_modules/
//         notesExpress.js
//         notesMongoose.js
//         notesNode.js
//         package-lock.json
//         package.json
//         playground/
//         public/
//         server.js
//         server.log
//         views/
//
// nothing added to commit but untracked files present (use "git add" to track)


git add nomDuFichier     ex: git add package.json
//pour ajouter a ce que l on veut tracker

git status va nous montrer que le package.json est maintenant dnas la liste verte(que ca va tracker)


git add public/   --va ajouter le rep a tracker.

.gitignore    //creer un fichier .gitignore:
// node_modules/
// server.log
// playground/


git commit -m 'initial commit'

git push

A PARTIR D ICI :
.gitignore
0- git init  //creation , ensuite aller sur github pour les liens.- faire une fois..

1- git status

2- git add .    //. ajoute TOUT

3- git commit -m 'deuxieme commit'

4- git push

fin
/*
les SSH KEYS
j en ai une , pour verifier :
ls -al ~/.ssh
//-rw-------   1 axez  staff  3247 Apr 11 10:34 id_rsa
//-rw-r--r--   1 axez  staff   740 Apr 11 10:34 id_rsa.pub

*/
///////////////GIT


///////////////HEROKU
dans SERVER.js
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});


herooku a besoin du start script dans package.json
  "start": "node server.js",


0-heroku create  //va creer la db - faire une fois..


1- git push heroku  //va pitcher le contenu du git sur heroku


2- heroku open   //va ouvrir le site avec notre stock.


///////////////HEROKU




///////////////MOCHA
dans le rep utils 2 fichiers : utils.js et utils.test.js

on exports de utlis ver utils.test des functions qu on va tester:
module.exports.add = (a,b) => a + b;
module.exports.square = (a) => a * a;
dasn package :

"test": "mocha **/*.test.js",
"moc": "nodemon --exec 'npm test'"    //ceci est pour automatiser.
"moc": "nodemon --exec  \"npm test\""    //pour fonctionner AUSSI dans windows

dans le test :
const utils = require('./utils.js');

describe("add", () => {
	it("should be 44", () => {
		let res = utils.add(11, 33);
		if(res === 44) {
      console.log('bravo')
    };
	});
  it('square', () => {
      let res = utils.square(3)
      if(res !== 9) {
        throw new Error(`on s attendait a ${res}`)
      }
  });
});


EXPECT avec expect de mjackson
https://github.com/mjackson/expect

npm install --save expect
const expect = require('expect');  //node et Common.js

// using ES6 modules
import expect, { createSpy, spyOn, isSpy } from 'expect'  // pour du js normal hors Node.

.

toExist
toNotExist
toBe   //expect(object).toBeA(string, [message])
toNotBe
toEqual
toNotEqual
toThrow
toNotThrow
toBeA(constructor)
toBeA(string)
etc...


Chaining Assertions
expect(3.14)
  .toExist()
  .toBeLessThan(4)
  .toBeGreaterThan(3)




const expect = require('expect');


describe("add", () => {
	it("should be 44", () => {
		let res = utils.add(11, 33);
    expect(res).toBe(44)
	});

  it('square', () => {
      let res = utils.square(3)
      expect(res).toBe(9).toBeA('number');
  });
});

it('devrais etre mon nom', () => {
  let ben = utils.setName( user = {}, 'Benoit Lafrance');
  //console.log(user)
   expect(user.first).toBe('Benoit')
   expect(user.lastName).toBe('Lafrance')
});

it('devrais etre mon nom plus simple', () => {
  const user = {};
  let ben = utils.setName( user , 'AXE Z');
  //console.log(user)

  expect(ben).toInclude({first: 'AXE'})
  expect(ben).toInclude({lastName: 'Z'})
  expect(user.first).toBe('AXE')
  expect(user.lastName).toBe('Z')
});



////done  pour les call async NE JAMAIS METTRE PLUS DE 1S !!! 2S DONNE UNE ERROR.

const asyncAdd = (a, b, cb) => {
	  setTimeout(() => {
	    cb(a+b)
	  }, 1000)  ///pas mettre plus de 1000 sinon ca chi et je sais pas pourquoi.
	}


//doit mettre done
	it('async Add', (done) => {
   utils.asyncAdd(3, 4, (sum) => {
		 expect(sum).toBe(7).toBeA('number');   //pas vrai
		 done();
	 });
	});




SPIES

  createSpy

expect.createSpy()

///////////////MOCHA





***************************************************************************************************
**********************************      EXPRESS      **********************************************
***************************************************************************************************
***************************************************************************************************
