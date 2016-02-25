/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import {Game, Constants} from 'components/bowling/BowlingComponent.js';

debugger
const {PINS_IN_FRAME, FRAMES_IN_MATCH} = Constants

let customGame = (level, x = 0, y = 0) => {
  let game = Game()
  for (let i = 0; i < level - 1; i++) {
    game.roll(x, y)
  };
  return game
}

let customStrikeGame = level => {
  let game = Game()
  for (let i = 0; i < level - 1; i++) {
    game.roll(PINS_IN_FRAME)
  };
  return game
}




describe('Game', () => {
  let game = Game()

  it('should exist', () => {
    expect(game).to.exist;
  });

  describe('reset', () => {
    it('should reset score to 0', () => {
      expect(Game().score()).to.be.equal(0);
    });
  }) 


  // describe('incorrect params', () => {
  //   game.reset()

  //   it('should throw an error, if non number arguments providen', () => {
  //     expect(game.roll('2', 2)).to.throw(
  //       new TypeError('incorrect type of param 0: expected "Number", received "String"')
  //     );
  //     expect(game.roll(2, {})).to.throw(
  //       new TypeError('incorrect type of param 1: expected "Number", received "Object"')
  //     );
  //   });

  //   // it(`should throw an error, if more than ${ROLLS_IN_FRAME} params providen to roll method`, () => {
  //   //   expect(game.roll(2,3,4).to.throw(
  //   //     new SyntaxError(
  //   //       `Incorrect number of params providen to "roll" method. 
  //   //       Get ${arguments.length}. Should be ${ROLLS_IN_FRAME}`
  //   //     )
  //   //   ))
  //   // })

  // });


  describe('common roll', () => {
    it('should sum score of two rolls', () => {
      expect(Game().roll(4,5).score()).to.be.equal(4 + 5);
      expect(Game().roll(1,2).roll(3,4).score()).to.be.equal(1 + 2 + 3 + 4);
    });
  })

  describe('spare roll', () => {
    it('should freeze score before next frame', () => {
      expect(Game().roll(1,2).roll(4,6)).to.be.equal(1 + 2);
    });

    it('should add prize score after next frame. Prize score equals doubled first roll.', () => {
      expect(Game().roll(1,2).roll(4,6).roll(5,0)).to.be.equal(1 + 2 + 4 + 6 + (5 * 2) + 0);
    });

    it(`should provide additional roll in last round`, () => {
      expect(customGame(FRAMES_IN_MATCH).roll(5,5,5)).to.not.throw;
    });

  })


  describe('strike roll', () => {
    it('should freeze score before next frame', () => {
      expect(Game().roll(1,2).roll(10)).to.be.equal(1 + 2);
    });

    it('should add prize score after next frame. Prize score equals doubled first roll and second roll.', () => {
      expect(Game().roll(1,2).roll(10).roll(2,3)).to.be.equal(1 + 2 + 4 + 10 + (2 * 2) + (3 * 2));
    });

    it(`should allow 2 additional rolls in last round`, () => {
      expect(customGame(FRAMES_IN_MATCH).roll(PINS_IN_FRAME, 0, 0)).to.not.throw;
    });

    it(`should reach max score 300 if only strikes appears`, () => {
      expect(customStrikeGame(FRAMES_IN_MATCH).roll(PINS_IN_FRAME, PINS_IN_FRAME, PINS_IN_FRAME).score())
        .to.be.equal(300);
    });

  })


  describe('last frame', () => {
    it(`should simply sum all rolls`, () => {
      expect(customGame(FRAMES_IN_MATCH).roll(1,2).score()).to.be.equal(3);
      expect(customGame(FRAMES_IN_MATCH).roll(5,5,5).score()).to.be.equal(15);
      expect(customGame(FRAMES_IN_MATCH).roll(10,10,10).score()).to.be.equal(30);
    });

    it(`rolls should provide no prize scores addition`, () => {
      expect(customGame(FRAMES_IN_MATCH - 1).roll(5,5).roll(1,2).score()).to.be.equal(13);
    })
    it(`should ignore spare or strike multipliers`, () => {
      expect(customGame(FRAMES_IN_MATCH - 1).roll(5,5).roll(5,5,5).score()).to.be.equal(25);
    })
    it(`should ignore spare or strike multipliers`, () => {
      expect(customGame(FRAMES_IN_MATCH - 1).roll(10).roll(10,10,10).score()).to.be.equal(40);
    })
  })

});
