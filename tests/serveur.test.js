const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');

const {app} = require('./../serveur');
const { Todo } = require('./../models/todo');

////POUR TEST DE POST, ON VEUT TOUT ENLEVER
// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

////POUR TEST DE GET, ON VEUT GARDER CA CLEAN DONC ON VA METTRE DU STOCK PAR DEFAUT
 const todos = [
 {
   text: 'premier test',
   completed: false
 },
 {
  text: 'deuxieme test',
  completed: false
 },
];

beforeEach((done) => {
  Todo.remove({}).then(() => {              //efface tout
    return Todo.insertMany(todos);          //insert le todos et retourne une promise.
  }).then(() => done());
});




describe("POST /todos", () => {
	// it("should create a new todo", done => {
	// 	let text = "test todo text";
  //
	// 	request(app)
	// 		.post("/todos")
	// 		.send({ text: text })
	// 		.expect(200)
	// 		.expect(res => {
	// 			expect(res.body.text).toBe(text);
	// 		})
	// 		.end((err, res) => {
	// 			if (err) {
	// 				return done(err);
	// 			}
	// 			Todo.find().then(todos => {
	// 				expect(todos.length).toBe(1);
	// 				expect(todos[0].text).toBe(text);
	// 				done();
	// 			}).catch(err => {
  //         return done(err);
  //       });
	// 		});
	// });

it("test de GET", done => {
	request(app)
		.get("/todos")
		.expect(200)
		.expect(res => {
      console.log(res.body.todos.length); 
			expect(res.body.todos.length).toBe(2);
		})
		.end(done());
});


});
