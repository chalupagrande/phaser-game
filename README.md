# Phaser the game
soccer but like with tetris


reference: 
https://github.com/photonstorm/phaser3-examples/tree/8f5cc1c8e376216f184abf1f2abbe7baa20a0498/public/src/games/snowmen%20attack


# Notes: 
- There are sort of 2 app states: 
  - GameState - the game state that gets updated on the render cycle of each draw call by the `Player`, `Ball`, and `Board` classes
  - GameContext - this is essentially a copy of the internal game state, but it ONLY gets updated when the GAME HUD (`Scoreboard`, `Bank`, etc) needs to be updated. This lives in the react world, and SHOULD NOT update on every draw loop. 


## What you were doing 8/126/23
trying to load in sprites. but for some reason the `loadJSON` always returns an OBJECT even if it is supposed to be an array. So I'm trying to convert it into an array, but cant for some reason. 