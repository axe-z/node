///////env
const env = require('./config');

///////////////////////////////////////////////////////////REQUIRES

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose, db } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authentification } = require('./middleware/authentification');
const port = process.env.PORT;

const app = express();
//https://sleepy-hamlet-49567.herokuapp.com/
///////////////////////////////////////////////////////////REQUIRES

///////////////////////////////////////////////////////////MIDDLEWARES

app.use(bodyParser.json());

///////////////////////////////////////////////////////////MIDDLEWARES

///////////////////////////////////////////////////////////POST ROUTE
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
///////////////////////////////////////////////////////////POST ROUTE

///////////////////////////////////////////////////////////GET ROUTE

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

///////////////////////////////////////////////////////////GET ROUTE

////////////////////GET req.params.id ROUTE
const {ObjectID} = require('mongodb'); //mongoNative

////http://localhost:3000/todos/599100ab170cdc199ba831c8
//routes
app.get("/todos/:id", (req, res) => {
	const id = req.params.id;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
  //il met pas de else
		Todo.findById(id)
			.then(todo => {
				if (!todo) {
					res.status(404).send();
				}
				res.send({todo});
        //res.send({todo})
				//console.log(todo);
			})
			.catch(e => {
				res.status(400).send();
				 //console.log(e); ca donne un message d err. de typeError
			});

});


////////////////////GET req.params.id ROUTE

///////////////////////////////////// DELETE Route de app.delete ROUTE

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id)
  .then(todo => {
    if (!todo) {
      res.status(404).send();
    }
    res.send({todo});
  })
  .catch(err => {
  	res.status(400).send();
  });
});


///////////////////////////////////// DELETE Route de app.delete ROUTE

///////////////////////////////////// UPDATE Route de app.patch ROUTE
//const _ = require('lodash');
app.patch("/todos/:id", (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ["text", "completed"]); //pick aider a dire quel props est dispo a updater
// ET les met directement sur body , donc body.test ///
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = Date.now();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
		.then(todo => {
			if (!todo) {
				res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(err => {
			res.status(400).send();
		});
});





///////////////////////////////////// UPDATE Route de app.patch ROUTE

///////////////////////////////////////////////////////////POST USER ROUTE
//const _ = require('lodash');   //en haut


app.post("/users", (req, res) => {
	let body = _.pick(req.body, ["email", "password"]); ///creer body.email ..

	let user = new User(body);

	user.save()    //BUGger on doit remmetre user.save et ne pas chainer ici !!
		.then(() => {
			return user.generateAuthToken();
		})
		.then((token) => {
			res.header('x-auth', token).send(user); //ce qui retourne dans postman dans la boite response
		})
		.catch(err => {
			res.status(400).send();
		});
});

///////////////////////////////////////////////////////////POST USER ROUTE



///////////////////////////////////////////////////////////PRIVATE ROUTE
//const { authentification } = require('./middleware/authentification'); //en haut

app.get('/users/moi', authentification, (req, res) => {
  //authentification  va faire le boulot, et ici on ne fait qu envoyer le user , comme avant
  res.send(req.user)
});


///////////////////////////////////////////////////////////PRIVATE ROUTE

///////////////////////////////////////////////////////////LOGIN ROUTE
//findByCredentials()
app.post("/users/login",	 (req, res) => {
	let body = _.pick(req.body, ["email", "password"]); ///creer body.email ..
  let user = new User(body);

	User.findByCredentials(body.email, body.password)
		.then(user => {
			return user.generateAuthToken()
			.then((token) => {
				res.header('x-auth', token).send(user); //ce qui retourne dans postman dans la boite response
			});
 })
   .catch(err => {
			res.status(400).send();
	 });
});



///////////////////////////////////////////////////////////LOGIN ROUTE

///////////////////////////////////////////////////////////DELOGUER ROUTE EN ENLEVANT LE TOKEN
// on va rendre ca private, avec authentification
app.delete("/users/moi/token",	authentification,  (req, res) => {
	//authentification retourne le user en req,user et le token en req.token
	//on va creer une methode instance (user pas User) dans User.js qui va faire ca...
	req.user.removeToken(req.token)
	.then(data => {
	  res.status(200).send();
	})
	.catch(err => {
 res.status(400).send();
	});
});





///////////////////////////////////////////////////////////DELOGUER ROUTE EN ENLEVANT LE TOKEN


///////////////////////////////////////////////////////////SERVEUR LISTEN

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});
///////////////////////////////////////////////////////////SERVEUR LISTEN


module.exports = { app };
