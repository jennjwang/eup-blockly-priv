# EUP-Blockly

We present an end-user programming interface we designed
that allows users to author programs that instruct a simulated robot to complete tasks in an everyday environment—
the home. In this simple home environment, the user can
program a TIAGo mobile manipulator robot to complete tasks
as a household assistant. The home we designed has four
rooms: kitchen, bedroom, playroom, and porch (see Figure 1).
Depending on the tasks, the environment includes a person and
a range of everyday objects (e.g., toys, a cup of coffee, mail).
We designed an end-user programming interface where
users can author programs in four different end-user robot
programming paradigms: Sequential Programming (Seq),
Trigger-Action Programming (TAP), Full MDP Programming (Full-MDP), and Goal-Only MDP Programming (Goal-
MDP).

Our end-user programming interface uses Google's Blockly, where users can drag and drop blocks representing robot actions, aspects of the environment, and programming structure (e.g., conditionals, loops). Across all our experimental programming paradigms, there is a common set of high-level block categories, representing attributes of the robot's environment (i.e., state attributes) and general behaviors that the robot can execute (i.e., actions). **State attributes** represent the current condition of the robot and the environment as sensed by the robot (e.g., I am in the kitchen, there is NO toy in the room). In all our end-user programming paradigms, we assumed that the robot only perceives states within the local context (i.e., within the same room). Moreover, the robot does not retain the state of the environment from previous time-steps. **Actions** are specific skills or behaviors that the robot can perform (e.g., pick up the coffee, go to the bedroom). The visual appearance and shape of the programming blocks vary to match the paradigm. Figure [example-program-each-paradigm] displays examples of programs authored using each programming paradigm.


## Demo

Try the interface: [https://eup-blockly.netlify.app](https://eup-blockly.netlify.app)

You can experiment with different tasks and formats by modifying the URL:
- For specific tasks: `https://eup-blockly.netlify.app/task{number}`
- For the Full MDP format: Add `?format=FULL_MDP` to the end of any URL
- - For the Goal MDP format: Add `?format=GOAL_MDP` to the end of any URL
- For the TAP format: Add `?format=TAP` to the end of any URL
- For the Sequential format: Add `?format=SEQ` to the end of any URL

## Citation

If you use this project in your research, please cite:
```
Tewodros Ayalew*, Jennifer Wang*, Michael Littman, Blase Ur, Sarah Sebo. 
Enabling End Users to Program Robots Using Reinforcement Learning. 
HRI 2025. (* denotes equal contribution)
```

## Code Structure

### Core Files
- `scripts/obj.js` - Contains all the core classes that represent objects in the game (Robot, Person, Toy)
- `scripts/game.js` - Contains the core game logic for robot movement and object interactions
- `scripts/run.js` - Handles program execution, including parsing and running user-created blocks
- `scripts/blockly.min.js` - The core Blockly library for visual programming

### Programming Interfaces
- `scripts/tap_blocks.js` - Defines Blockly blocks for the TAP (Trigger-Action Programming) interface
- `scripts/rl_blocks.js` - Defines Blockly blocks for the RL (Reinforcement Learning) interface
- `scripts/mdp.js` - Handles MDP (Markov Decision Process) logic for RL format
- `scripts/rl.js` - Contains reinforcement learning implementation

### Task-Specific Files
- `scripts/settings/task{0-9}.js` - Individual task configurations and settings
- `task{0-9}.html` - Task-specific HTML files with descriptions and UI setup

### Assets & Styling
- `assets/` - Contains images for:
  - Robot (`robot.png`)
  - Person (`person.png`)
  - Toys (`toy1.png`, `toy2.png`, etc.)
  - Room backgrounds
- `styles/` - Contains CSS files:
  - `general.css` - Shared styles across tasks
  - `task{1-9}.css` - Task-specific styling

### Interpreter
- `interpreter/acorn_interpreter.js` - JavaScript code interpreter for executing Blockly-generated code
