# Phaser the game
soccer but like with tetris


reference: 
https://github.com/photonstorm/phaser3-examples/tree/8f5cc1c8e376216f184abf1f2abbe7baa20a0498/public/src/games/snowmen%20attack


# Notes: 
- There are sort of 2 app states: 
  - GameState - the game state that gets updated on the render cycle of each draw call by the `Player`, `Ball`, and `Board` classes
  - GameContext - this is essentially a copy of the internal game state, but it ONLY gets updated when the GAME HUD (`Scoreboard`, `Bank`, etc) needs to be updated. This lives in the react world, and SHOULD NOT update on every draw loop. 


## What you were doing 8/14/23
- Trying to reset the entire board, ball and player banks when a point is scored
  - i think this requires passing the game state to all the components, so they can read all the properties from one another. 

## UPDATE 8/24/23
- Rather than the player initializing their own queue, have the Game initials the players queue and bank for them, so that it can pass a copy of the game state to the tiles action. This way the tile's action function will have a copy of the entire game state to do what it needs. 

