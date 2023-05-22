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
    message0: "I left the %1",
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
    message0: "a toy is in the current room",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["toy_in_room"] = function (block) {
  return ["toy_in_room()", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "is_toy_in_room",
    message0: "a toy is in the current room",
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

Blockly.JavaScript["is_toy_in_room"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotOutOfEvent(" + value + ")", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "in_the",
    message0: "I arrived at the %1",
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
    type: "e_person_not_in_room",
    message0: "a person is not in the room",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_person_not_in_room"] = function () {
  return ["isPersonNotInRoomEvent()", Blockly.JavaScript.PRECEDENCE];
};

// Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotinRoomEvent(" + value + ")", Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript["out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotOutOfEvent(" + value + ")", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_free",
    message0: "my hands became free",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_free"] = function (block) {
  return ["eHandsFree()", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_full",
    message0: "my hands became full",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_full"] = function (block) {
  return ["eHandsFull()", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "person_in_room",
    message0: "a person has entered the current room",
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

// goals

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_toy_not_in_room",
    message0: "a toy is not in the room",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_toy_not_in_room"] = function (block) {
  return ["toy_not_in_room()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_out_of",
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
    colour: 160,
  },
]);

Blockly.JavaScript["e_out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["!isRobotinRoomEvent(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_toy_in_room",
    message0: "a toy is in the room",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_toy_in_room"] = function (block) {
  return ["toy_in_room()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_in_the",
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
    colour: 160,
  },
]);

Blockly.JavaScript["e_in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotinRoomEvent(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_person_in_room",
    message0: "a person is in the room",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_person_in_room"] = function () {
  return ["isPersonInRoomEvent()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_hands_free",
    message0: "my hands are free",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_hands_free"] = function (block) {
  return ["eHandsFree()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_hands_full",
    message0: "my hands are full",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_hands_full"] = function (block) {
  return ["eHandsFull()", Blockly.JavaScript.PRECEDENCE];
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
  return "isRobotOutOfEvent(" + value + ");\n\t";
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
  return "isRobotinRoomEvent(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_hands_free",
    message0: "Are my hands free?",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_hands_free"] = function (block) {
  return "eHandsFree();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_hands_full",
    message0: "Are my hands full?",
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  },
]);

Blockly.JavaScript["trigger_hands_full"] = function (block) {
  return "eHandsFull();\n\t";
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
  return "isPersonInRoomEvent();\n\t";
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
    colour: 160,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["goals"] = function (block) {
  a = block.getInputTargetBlock("input");
  b = Blockly.JavaScript.blockToCode(a);

  return `
goals(
  ${b[0]}
)
  `;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "triggers",
    message0: "States %1 %2",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_statement",
        name: "input",
        check: [
          "is_toy_in_room",
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

Blockly.defineBlocksWithJsonArray([
  {
    type: "and",
    message0: "%1 %2 %3 %4",
    args0: [
      {
        type: "input_value",
        name: "s1",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_toy_in_room",
          "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "Boolean",
        ],
        align: "CENTRE",
      },
      {
        type: "field_dropdown",
        name: "connector",
        options: [
          ["and", "and"],
          ["or", "or"],
        ],
      },
      {
        type: "input_dummy",
        align: "CENTRE",
      },
      {
        type: "input_value",
        name: "s2",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_toy_in_room",
          "Boolean",
        ],
        align: "CENTRE",
      },
    ],
    output: "Boolean",
    colour: 160,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["and"] = function (block) {
  var s1 = Blockly.JavaScript.valueToCode(
    block,
    "s1",
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var connector = block.getFieldValue("connector");
  var s2 = Blockly.JavaScript.valueToCode(
    block,
    "s2",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  connector_val = " && ";

  if (connector == "or") {
    connector_val = " || ";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = "(" + s1 + connector_val + s2 + ")";
  console.log("hi", code);
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};
