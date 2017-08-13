const express = require('express');
var hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
///////////middleware

///HBS
//LES PARTIALS
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

//VARIABLES PARTAGEES
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
//FUNCTIONS PARTAGEES
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


///////////MIDDLEWARE ( TOUS LES APP.USE SONT DU MIDDLEWARE )



// Sans next , ce qui suit n arrivera pas
app.use((req, res, next) => {
 //si je call pas next, ce qui arrive en bas arrivera pas.
 const now = new Date().toString();
 const log = `${now}: ${req.method} ${req.url} `   //Sun Aug 06 2017 13:10:30 GMT-0400 (EDT): GET / (donc la racine)
 console.log(log);

 fs.appendFileSync('server.log', log + '\n');
 next()
});

//QUAND LE SITE EST EN MAINTENANCE ACTIVER CECI:
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
//   next();
// });



//App.use a besoin du ABSOLUTE PATH , c est a dire du disque dur a ici..
//et les fichier vont bouger... donc il y a une solution: __dirname qui devient l equivalant de tout le path jusqu au rep

app.use(express.static( __dirname + '/public')); //PUBLIC DEVIENT LA RACINE.
//DONC:
//http://localhost:3000/help.html  et non pas public/help

///////////MIDDLEWARE ( TOUS LES APP.USE SONT DU MIDDLEWARE )



/////////////RENDER VIEWS
app.get('/' , (req, res) => {
  res.render('home.hbs', {
     name: 'AXE-Z',
     welcomeMessage: 'Benoit Lafrance vous accueil',
     title: 'Welcome page'
  });
});

app.get('/about' , (req, res) => {
 res.render('about.hbs', {
   //currentYear: new Date().getFullYear(),
   name: 'AXE-Z',
    title: 'About page'
 });
});

app.get('/projects' , (req, res) => {
 res.render('projects.hbs', {
    name: 'AXE-Z',
    title: 'projects page'
 });
});
/////////////RENDER VIEWS


//routes (mieux vaut utiliser les views)
/*
/////////////Get routes, avant d utiliser les views qui sont mieux.
app.get('/' , (req, res) => {
  //res.send('<h1>Bonjour Express</h1>');  //Content-Type: text/html
  res.send({      //Content-Type: json
    nom: "Benoit",
    likes: [
      'bass',
      'ordi'
    ]
  });
app.get('/about' , (req, res) => {
 res.send('<h1>Page About</h1>');
});

app.get('/bad' , (req, res) => {
 res.send('<h2>Erreur, vous ne devriez pas etre ici Motherfuckers.</h2>');
});
/////////////Get routes

*/



/////////////Serveur
app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
