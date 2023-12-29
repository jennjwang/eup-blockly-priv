# EUP-Blockly

A visual programming editor with Blockly to support
non-technical users in interacting with RL systems under different programming paradigms. You can access the interface [here.](https://eup-blockly.herokuapp.com/task1.html)

Task 1: https://eup-blockly.herokuapp.com/task1.html

Taks 2: https://eup-blockly.herokuapp.com/task2.html

Taks 3: https://eup-blockly.herokuapp.com/task3.html

The current default is the TAPS interface. For the RL format, please add `?format=RL` to the end of your url.

**To run locally:**

Double click to open the html files in the folder. You should see a webpage pop up in your browser. You can then update the code and refresh the page to see your changes reflected.

**Code:**

- `assets` contains the images for different objects in the interface, including toys, robot, and person
- `scripts/settings` contains the beginning set up of each task, including the coordinates of the robot and existing objects in each room.
- `styles` contains the css files for different tasks
- `scripts/settings/games.js` contains the bulk of the game logic. It includes functions directing the robot to move and pick up / drop off a toy.
- `scripts/settings/obj.js` contains all the classes that represent objects in the game, including Robot, Person, and Toy
- `scripts/settings/rl_blocks.js` defines the Blockly blocks using JSON and matches them with a function or the gaming logic. These blocks are customized to the RL interface.
- `scripts/settings/tap_blocks.js` defines the Blockly blocks using JSON and matches them with a function or the gaming logic. These blocks are customized to the TAP interface.
- `scripts/settings/run.js` connects the Blockly definitions with the gaming logic such that the code inputted through the interface workplace is executed correction. This file also contains functions to start and stop the execution.
