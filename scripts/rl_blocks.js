Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_toy",
    message0: "put down the toy",
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
]);

Blockly.JavaScript["drop_toy"] = function (block) {
  return "drop_toy();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "to_random_room",
    message0: "go to a random room",
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
]);

Blockly.JavaScript["to_random_room"] = function (block) {
  this.setTooltip(function () {
    return "Add a number to variable";
  });
  return "moveRobotToRandomRoom();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_toy",
    message0: "pick up the toy",
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_toy"] = function (block) {
  return "pick_up_toy();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "to_room",
    message0: "go to the %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  },
]);

Blockly.JavaScript["to_room"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "moveRobotToRoom(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "out_of",
    message0: "I am out of the %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ],
      },
    ],
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.defineBlocksWithJsonArray([
  {
    type: "toy_in_room",
    message0: "there is a toy in the current room",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["toy_in_room"] = function (block) {
  return "toy_in_room();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "in_the",
    message0: "I am in the %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ],
      },
    ],
    output: "Boolean",
    colour: 260,
  },
]);

// Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "isRobotinRoom(" + value + ");";
};

Blockly.JavaScript["out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "isRobotOutOf(" + value + ");";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_free",
    message0: "my hands are free",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_free"] = function (block) {
  return "handsFree();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "person_in_room",
    message0: "there is a person in the current room",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["person_in_room"] = function (block) {
  return "isPersonInRoom();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "forever",
    message0: "Rules %1",
    args0: [
      {
        type: "input_statement",
        name: "input",
        check: "if %1 do %2",
      },
    ],
    colour: 225,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["forever"] = function (block) {
  return `
      while (true) {
        ${Blockly.JavaScript.statementToCode(block, "input")}
      }\n
  `;
};

// triggers:

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_toy_in_room",
    message0: "Is there a toy in the current room?",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_toy_in_room"] = function (block) {
  return "toy_in_room();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_out_of",
    message0: "Am I out of the %1?",
    previousStatement: null,
    nextStatement: null,
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ],
      },
    ],
    output: "Boolean",
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "isRobotOutOf(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_in_the",
    message0: "Am I in the %1?",
    previousStatement: null,
    nextStatement: null,
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
        ],
      },
    ],
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "isRobotinRoom(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_hands_free",
    message0: "Are my hands are free?",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_hands_free"] = function (block) {
  return "handsFree();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_person_in_room",
    message0: "Is there a person in the current room?",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_person_in_room"] = function (block) {
  return "isPersonInRoom();\n\t";
};

// workspace blocks

Blockly.defineBlocksWithJsonArray([
  {
    type: "actions",
    message0: "Actions %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "input",
        check: ["drop_toy", "pick_up_toy", "to_room", "to_random_room"],
      },
    ],
    colour: 330,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["actions"] = function (block) {
  return `
actions(
  ${Blockly.JavaScript.statementToCode(block, "input")}
)
  `;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "goals",
    message0: "Goal %1",
    args0: [
      {
        type: "input_value",
        name: "input",
        check: "Boolean",
      },
    ],
    colour: 260,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["goals"] = function (block) {
  console.log(Blockly.JavaScript.statementToCode(block, "input"));
  return `
goals(
  ${Blockly.JavaScript.statementToCode(block, "input")}
)
  `;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "triggers",
    message0: "Triggers %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "input",
        check: [
          "trigger_toy_in_room",
          "trigger_out_of",
          "trigger_in_the",
          "trigger_hands_free",
          "trigger_person_in_room",
        ],
      },
    ],
    colour: 210,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["triggers"] = function (block) {
  return `
triggers(
  ${Blockly.JavaScript.statementToCode(block, "input")}
)
  `;
};
