// Blockly.defineBlocksWithJsonArray([
//     {
//       "type": "play_sound",
//       "message0": "Play %1",
//       "args0": [
//         {
//           "type": "field_dropdown",
//           "name": "VALUE",
//           "options": [
//             ["C4", "sounds/c4.m4a"],
//             ["D4", "sounds/d4.m4a"],
//             ["E4", "sounds/e4.m4a"],
//             ["F4", "sounds/f4.m4a"],
//             ["G4", "sounds/g4.m4a"]
//           ]
//         }
//       ],
//       "previousStatement": null,
//       "nextStatement": null,
//       "colour": 355
//     }
//   ]);

// Blockly.JavaScript['play_sound'] = function(block) {
//     let value = '\'' + block.getFieldValue('VALUE') + '\'';
//     return 'MusicMaker.queueSound(' + value + ');\n';
// };

Blockly.defineBlocksWithJsonArray([
  {
    "type": "drop_toy",
    "message0": "put down the toy",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "to_random_room",
    "message0": "go to a random room",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 300
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "pick_up_toy",
    "message0": "pick up the toy",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 330
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "to_room",
    "message0": "go to the %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 300
  }
]);


Blockly.defineBlocksWithJsonArray([
  {
    "type": "out_of",
    "message0": "I am out of the %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ]
      }
    ],
    "output": "Boolean", 
    "colour": 260
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "toy_in_room",
    "message0": "there is a toy in the current room",
    "output": "Boolean",
    "colour": 260
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "in_the",
    "message0": "I am in the %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ]
      }
    ],
    "output": "Boolean", 
    "colour": 260
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "hands_free",
    "message0": "my hands are free",
    "output": "Boolean",
    "colour": 260
  }
]);

Blockly.defineBlocksWithJsonArray([
  {
    "type": "person_in_room",
    "message0": "there is a peron in the current room",
    "output": "Boolean",
    "colour": 260
  }
]);