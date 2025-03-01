Here's a rewritten README for your EUP-Blockly project:

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
Trigger-Action Programming (TAP), Full MDP Program-
ming (Full-MDP), and Goal-Only MDP Programming (Goal-
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

## Project Structure

- **assets/**: Contains images for interface objects (toys, robot, person)
- **styles/**: CSS files for different tasks
- **scripts/settings/**:
  - **games.js**: Core game logic including robot movement and toy interactions
  - **obj.js**: Classes representing game objects (Robot, Person, Toy)
  - **rl_blocks.js**: Blockly block definitions for the RL interface
  - **tap_blocks.js**: Blockly block definitions for the TAP interface
  - **run.js**: Connects Blockly definitions with game logic and handles execution
  - Task-specific settings files with coordinates for robot and objects
