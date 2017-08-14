///////////////////////////////////////////////////////////REQUIRES

const express = require('express');
const bodyParser = require('body-parser');

const { mongoose, db } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User, createUser } = require('./models/user');

const port = process.env.PORT || 3000;

const app = express();

///////////////////////////////////////////////////////////REQUIRES

///////////////////////////////////////////////////////////MIDDLEWARES

app.use(bodyParser.json());

///////////////////////////////////////////////////////////MIDDLEWARES

///////////////////////////////////////////////////////////POST
app.post("/todos", (req, res) => {
	//console.log(req.body);        //dans postman pour ttester l api. http://localhost:3000/todos
	const todo = new Todo({
		text: req.body.text,
		completed: false,
		completedAt: Date.now()
	})
		.save()
		.then(data => {
			 //console.log(data);  //dans le terminal.
			 res.send(data)   //ce qui retourne dans postman dans la boite response

       app.get('/' , (req, res) => { //a localhost:3000/
       res.send(` <h1>Test mongoose - postman ${data.text} </h1>` );  //Content-Type: text/html
      });

		})
		.catch(err => {
			res.status(400).send(err);
		});
});
///////////////////////////////////////////////////////////POST

///////////////////////////////////////////////////////////GET

///action se produit en allant sur http://localhost:3000/todos
app.get("/todos", (req, res) => {
  Todo.find()
  .then(data => {
    res.send({data})  //on le met dans un boj, pour se donner des options, facile d ajouter a un obj.
    //console.log(data[0].text);  //test todo text
  })
  .catch(err => {
    res.status(400).send(err);
  });
});

///////////////////////////////////////////////////////////GET



///////////////////////////////////////////////////////////SERVEUR LISTEN

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});

///////////////////////////////////////////////////////////SERVEUR LISTEN

module.exports = { app };
