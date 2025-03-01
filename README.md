# EUP-Blockly

We present an end-user programming interface designed to allow users to author programs that instruct a simulated robot to complete tasks in a home environment. The interface uses Google's Blockly for visual programming, where users can drag and drop blocks representing robot actions, environmental states, and programming structures.

## Demo

Try the interface: [https://eup-blockly.netlify.app](https://eup-blockly.netlify.app)

You can experiment with different tasks and formats by modifying the URL:

- For specific tasks: `https://eup-blockly.netlify.app/task{number}`
- For the Full MDP format: Add `?format=FULL_MDP` to the end of any URL
- For the Goal MDP format: Add `?format=GOAL_MDP` to the end of any URL
- For the TAP format: Add `?format=TAP` to the end of any URL
- For the Sequential format: Add `?format=SEQ` to the end of any URL

## Programming Paradigms

The interface supports four different end-user robot programming paradigms:

1. **Sequential Programming (SEQ)** - Traditional sequential programming with actions executed in order
2. **Trigger-Action Programming (TAP)** - Event-based programming where actions are triggered by specific conditions
3. **Full MDP Programming (FULL_MDP)** - Complete Markov Decision Process programming with states, actions, and goals
4. **Goal-Only MDP Programming (GOAL_MDP)** - Simplified MDP programming focusing only on goal states

## Environment

The simulated home environment consists of four rooms:
- Kitchen
- Bedroom
- Playroom
- Porch

The robot can:
- Move between rooms
- Pick up and drop objects
- Detect presence of people and objects in the same room
- Interact with various objects (toys, coffee, mail)

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

## Running Locally

1. Clone the repository
2. Open any of the HTML files in your browser
3. Make changes to the code and refresh the page to see updates

## Block Categories

The interface provides different block categories depending on the programming paradigm:

- **Actions**: Robot movement and object manipulation
- **States**: Current conditions of the robot and environment
- **Events**: Trigger conditions for TAP
- **Goals**: Desired end states for MDP
- **Controls**: Programming structure blocks (conditionals, loops)

## Important Notes

- The robot only perceives states within the local context (same room)
- The robot does not retain state information from previous time-steps
- We encourage running programs multiple times to ensure they work under different conditions
- Initial positions of objects and the robot may vary between runs
- The number of objects may change between runs in some tasks

## Citation

If you use this project in your research, please cite:

```
Tewodros Ayalew*, Jennifer Wang*, Michael Littman, Blase Ur, Sarah Sebo. Enabling End Users to Program Robots Using Reinforcement Learning. HRI 2025. (* denotes equal contribution)
```
