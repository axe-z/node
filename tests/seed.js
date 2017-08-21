const {ObjectID} = require('mongodb');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
//parce que dans jwt.sign on a besoin du id, on va faire le id avant et le mettre en variable.
const users = [
	{
		_id: userOneId,
		email: "ben@axe-z.com",
		password: "abc123",
		tokens: [
			{
				access: "auth",
				token: jwt.sign({ userOneId, access: "auth" }, process.env.JWT_SECRET).toString()
			}
		]
	},
	{
		_id: userTwoId,
		email: "info@axe-z.com",
		password: "abc123!!",
		tokens: [
			{
				access: "auth",
				token: jwt.sign({ userTwoId, access: "auth" }, process.env.JWT_SECRET).toString()
			}
		]
	}
];


const todos = [
	{
		_id: new ObjectID(),
		text: "premier test todo",
    _creator: userOneId
	},
	{
		_id: new ObjectID(),
		text: "deuxieme test todo",
		completed: true,
		completedAt: Date.now(),
    _creator: userTwoId
	}
];


const populateTodos = (done) => {
  Todo.remove({}).then(() => {              //efface tout
    return Todo.insertMany(todos);          //insert le todos et retourne une promise.
  }).then(() => done());
}
//faut le faire differement pour user, sinon ca ne passera pas par le middleware de mongoose (hash salt)
//a cause de insertMany qui by-pass.

const populateUsers = (done) => {
  User.remove({}).then(() => {              //efface tout
   let userOne = new User(users[0]).save(); //en fiasant save, on va passer par le middleware.
   let userTwo = new User(users[1]).save();

   return Promise.all([userOne, userTwo])
  }).then(() => done());
}


module.exports = {
  todos, populateTodos, users, populateUsers
}
