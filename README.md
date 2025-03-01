Here's a rewritten README for your EUP-Blockly project:

# EUP-Blockly

A visual programming editor built with Blockly that enables non-technical users to interact with reinforcement learning systems through different programming paradigms.

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
