const utils = require('./utils.js');
const expect = require('expect');

describe("add", () => {
	it("should be 44", () => {
		let res = utils.add(11, 33);
		// if(res === 44) {
    //   console.log('bravo')
    // };
    expect(res).toBe(44)
	});

  it('square', () => {
      let res = utils.square(3)
      // if(res !== 9) {
      //   throw new Error(`on s attendait a ${res}`)
      // }
      expect(res).toBe(9).toBeA('number');
  });

  it('devrais m attendre a des valeurs', () => {
    expect(12).toNotBe(11)
  });

  it('le meme obj', () => {
  //expect({name: 'ben'}).toBe({name: 'ben'}); //Comme en js, ce sont 2 obj different !
  expect({name: 'ben'}).toMatch({name: 'ben'});
  expect([2,3,4]).toInclude(4)  //on peut regarder un truc dans un obj aussi
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

/*
const asyncAdd = (a, b, cb) => {
	  setTimeout(() => {
	    cb(a+b)
	  }, 1000)  ///pas mettre plus de 1000 sinon ca chi et je sais pas pourquoi.
	}
*/
//doit mettre done
	it('async Add', (done) => {
   utils.asyncAdd(3, 4, (sumDeAetB) => {
		 expect(sumDeAetB).toBe(7).toBeA('number');   //pas vrai
		 done();
	 });
	});

	it('async Square', (done) => {
   utils.asyncSquare(3, (mulDeAetA) => {
		 expect(mulDeAetA).toBe(9).toBeA('number');   //pas vrai
		 done();
	 });
	});
	
});
