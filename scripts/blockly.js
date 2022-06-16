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
  return "drop_toy();\n";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "to_random_room",
    message0: "go to a random room",
    previousStatement: null,
    nextStatement: null,
    colour: 300,
  },
]);

Blockly.JavaScript["to_random_room"] = function (block) {
  return "moveRobotToRandomRoom();\n";
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
  return "pick_up_toy();\n";
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
    colour: 300,
  },
]);

Blockly.JavaScript["to_room"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "moveRobotToRoom(" + value + ");\n";
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
  return ["toy_in_room()\n", Blockly.JavaScript.PRECEDENCE];
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

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotinRoom(" + value + ")\n", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotOutOf(" + value + ")\n", Blockly.JavaScript.PRECEDENCE];
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
  return ["handsFree()\n", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "person_in_room",
    message0: "there is a person in the current room",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["person_in_room"] = function (block) {
  return ["isPersonInRoom()\n", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "forever",
    message0: "repeat forever %1 do %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "STATEMENT",
      },
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["forever"] = function (block) {
  return `
      while (true) {
        ${Blockly.JavaScript.statementToCode(block, "STATEMENT")}
      }
  `;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "if_do",
    message0: "if %1 do %2",
    args0: [
      {
        type: "input_value",
        name: "condition",
        check: "Boolean",
      },
      {
        type: "input_statement",
        name: "execute",
      },
    ],
    previousStatement: "if %1 do %2",
    nextStatement: "if %1 do %2",
    colour: 210,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["if_do"] = function (block) {
  var value_condition = Blockly.JavaScript.valueToCode(
    block,
    "condition",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  if (value_condition == "") {
    value_condition = false;
  }
  var statements_execute = Blockly.JavaScript.statementToCode(block, "execute");
  var code = `if (${value_condition}) \n
  {
    ${statements_execute}\n
    break;\n
  }\n`;
  return code;
};
