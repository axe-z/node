///////////////////////////////////////////////////////////REQUIRES

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { mongoose, db } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User, createUser } = require('./models/user');

const port = process.env.PORT || 3000;

const app = express();
//https://sleepy-hamlet-49567.herokuapp.com/
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

////////////////////GET req.params.id
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


////////////////////GET req.params.id

///////////////////////////////////// DELETE Route de app.delete

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


///////////////////////////////////// DELETE Route de app.delete

///////////////////////////////////// UPDATE Route de app.patch
//const _ = require('lodash');
app.patch("/todos/:id", (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ["text", "completed"]); //pick aider a dire quel props est dispo a updater

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





///////////////////////////////////// UPDATE Route de app.patch

///////////////////////////////////////////////////////////SERVEUR LISTEN

app.listen(port, () => {
  console.log(`ca roule sur ${port}`);
});

///////////////////////////////////////////////////////////SERVEUR LISTEN

module.exports = { app };
