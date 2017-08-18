const expect = require('expect');
const request = require('supertest');
const mongoose = require('mongoose');
 const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {app} = require('./../serveur');
const { Todo } = require('./../models/todo');

////POUR TEST DE POST, ON VEUT TOUT ENLEVER
// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

////POUR TEST DE GET, ON VEUT GARDER CA CLEAN DONC ON VA METTRE DU STOCK PAR DEFAUT
 const todos = [
 {
   _id: new ObjectID(),
   text: 'premier test todo',
 },
 {
  _id: new ObjectID(),
  text: 'deuxieme test todo',
  completed: true,
  completedAt: Date.now()
 },
];

beforeEach((done) => {
  Todo.remove({}).then(() => {              //efface tout
    return Todo.insertMany(todos);          //insert le todos et retourne une promise.
  }).then(() => done());
});




//describe("POST /todos", () => {
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

// it("test de GET", done => {
// 	request(app)
// 		.get("/todos")
// 		.expect(200)
// 		.expect(res => {
//       console.log(res.body.todos.length);
// 			expect(res.body.todos.length).toBe(2);
// 		})
// 		.end(done());
// });


//});


///599100ab170cdc199ba831c8
/*describe("Test de ids", () => {
  it('expect 1 etre 1', () => {
    expect(1 + 1 ).toBe(2)
  });
	it("Ca Devrait donner du bon", done => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`) //convertie un object en string...
			.expect(200)
			.expect((res) => {
        //   le todo vient de serveur.js
				expect(res.body.todo.text).toBe(todos[0].text);//todos[0].text
			})
			.end(done);
	});


});
*/
describe("Test de Patch", () => {
  it("Ca Devrait updater cibole", (done) => {
    const hexId = todos[0]._id.toHexString();
    const text = 'Ceci devrait etre le text updater';

    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      completed: true
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    	.end(done);
  });

  it('Ca Devrait updater cibole2', (done) => {
    const hexId2 = todos[1]._id.toHexString();
    const text = 'Ceci devrait etre le text updater pour deuxieme test';

  request(app)
    .patch(`/todos/${hexId2}`)
    .send({
      text,
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('Ceci devrait etre le text updater pour deuxieme test');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
      .end(done);
  });
});
