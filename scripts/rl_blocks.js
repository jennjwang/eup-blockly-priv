Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_toy",
    message0: "put down the toy",
    previousStatement: [
      "pick_up_toy",
      "to_room",
      "to_random_room",
      "drop_toy",
      "actions",
    ],
    nextStatement: ["pick_up_toy", "to_room", "to_random_room", "drop_toy"],
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
    previousStatement: [
      "pick_up_toy",
      "to_room",
      "to_random_room",
      "drop_toy",
      "actions",
    ],
    nextStatement: ["pick_up_toy", "to_room", "to_random_room", "drop_toy"],
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
    type: "pick_up_coffee",
    message0: "pick up the coffee",
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_coffee"] = function (block) {
  return "pick_up_thing('coffee');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_coffee_mail",
    message0: "pick up the %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["coffee", "coffee"],
          ["mail", "mail"],
        ],
      },
    ],
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_coffee_mail"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "pick_up_thing(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_coffee_mail",
    message0: "put down the %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["coffee", "coffee"],
          ["mail", "mail"],
        ],
      },
    ],
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["drop_coffee_mail"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "drop_thing(" + value + ");\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_coffee",
    message0: "put down the coffee",
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["drop_coffee"] = function () {
  return "drop_thing('coffee');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_mail",
    message0: "pick up the mail",
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_mail"] = function (block) {
  return "pick_up_thing('mail');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_mail",
    message0: "put down the mail",
    previousStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    nextStatement: [
      "pick_up_toy",
      "pick_up_coffee",
      "drop_coffee",
      "to_room",
      "to_random_room",
      "drop_toy",
      "pick_up_mail",
      "drop_mail",
    ],
    colour: 330,
  },
]);

Blockly.JavaScript["drop_mail"] = function () {
  return "drop_thing('mail');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_toy",
    message0: "pick up the toy",
    previousStatement: [
      "pick_up_toy",
      "to_room",
      "to_random_room",
      "drop_toy",
      "actions",
    ],
    nextStatement: ["pick_up_toy", "to_room", "to_random_room", "drop_toy"],
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
          ["porch", "porch"],
        ],
      },
    ],
    previousStatement: [
      "pick_up_toy",
      "to_room",
      "to_random_room",
      "drop_toy",
      "actions",
    ],
    nextStatement: ["pick_up_toy", "to_room", "to_random_room", "drop_toy"],
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
          ["porch", "porch"],
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
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["toy_in_room"] = function (block) {
  return ["toy_in_room()", Blockly.JavaScript.ORDER_NONE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "in_the",
    message0: "I arrived at %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["the kitchen", "kitchen"],
          ["the bedroom", "bedroom"],
          ["the playroom", "playroom"],
          ["the porch", "porch"],
          ["any room", "any room"],
        ],
      },
    ],
    output: "in_the",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  if (value == "any room") {
    return "isRobotinAnyRoom()";
  }
  return ["isRobotinRoom(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_person_not_in_room",
    message0: "a person is not in the room",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_person_not_in_room"] = function () {
  return "isPersonNotInRoomEvent()";
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
    message0: "a person entered the current room",
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
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_toy_not_in_room"] = function (block) {
  return "toy_not_in_room()\t\n";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "as_many",
    message0: "as many toys as possible are in the room",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["as_many"] = function (block) {
  return ["as_many_toys()", Blockly.JavaScript.PRECEDENCE];
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
          ["porch", "porch"],
        ],
      },
    ],
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    // output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "!isRobotinRoomEvent(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_toy_in_room",
    message0: "a toy is in the room",
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_toy_in_room"] = function (block) {
  return "toy_in_room()\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_coffee_in_room",
    message0: "there is coffee in the room",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_coffee_in_room"] = function (block) {
  return "thing_in_room('coffee')\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_coffee_in_any",
    message0: "there is coffee in the %1",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_coffee_in_any"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "is_coffee_in_room(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_mail_in_any",
    message0: "there is mail in the %1",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_mail_in_any"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "is_mail_in_room(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_mail_in_room",
    message0: "there is mail in the room",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_mail_in_room"] = function (block) {
  return "thing_in_room('mail')\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_mail_not_in_room",
    message0: "there is no mail in the room",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
      "e_mail_in_room",
      "e_mail_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_mail_not_in_room"] = function (block) {
  return "thing_not_in_room('mail')\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_coffee_not_in_room",
    message0: "there is no coffee in the room",
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_coffee_not_in_room"] = function (block) {
  return "thing_not_in_room('coffee')\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_in_the",
    message0: "I am in the %1",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
    // output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "isRobotinRoomEvent(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_person_in_room",
    message0: "a person is in the room",
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_person_in_room"] = function () {
  return "isPersonInRoomEvent()\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_hands_free",
    message0: "my hands are free",
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_hands_free"] = function (block) {
  return "eHandsFree()\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_hands_full",
    message0: "my hands are full",
    // output: "Boolean",
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    colour: 160,
  },
]);

Blockly.JavaScript["e_hands_full"] = function (block) {
  return "eHandsFull()\t";
};

// triggers:

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_toy_in_room",
    message0: "Is there a toy in the current room?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_toy_in_room"] = function (block) {
  return "toy_in_room();\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_coffee_in_room",
    message0: "Is there coffee in the current room?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_coffee_in_room"] = function (block) {
  return "thing_in_room('coffee');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_coffee_in_any",
    message0: "Is there coffee in the %1?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_coffee_in_any"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "is_coffee_in_room(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_mail_in_any",
    message0: "Is there mail in the %1?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_mail_in_any"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "is_mail_in_room(" + value + ")\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_mail_in_room",
    message0: "Is there mail in the current room?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    colour: 210,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["trigger_mail_in_room"] = function (block) {
  return "thing_in_room('mail');\n\t";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "trigger_out_of",
    message0: "Am I out of the %1?",
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
        ],
      },
    ],
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
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["kitchen", "kitchen"],
          ["bedroom", "bedroom"],
          ["playroom", "playroom"],
          ["porch", "porch"],
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
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
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
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
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
    previousStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
      "triggers",
    ],
    nextStatement: [
      "trigger_toy_in_room",
      "trigger_out_of",
      "trigger_in_the",
      "trigger_hands_free",
      "trigger_person_in_room",
      "trigger_coffee_in_room",
      "trigger_mail_in_room",
      "trigger_coffee_in_any",
      "trigger_hands_full",
    ],
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
        check: [
          "drop_toy",
          "pick_up_toy",
          "to_room",
          "to_random_room",
          "pick_up_coffee",
        ],
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
    message0:
      "Goals %1 high priority %2 %3 medium priority %4 %5 low priority %6 %7",
    args0: [
      {
        type: "input_dummy",
      },
      {
        type: "input_end_row",
        align: "RIGHT",
      },
      {
        type: "input_statement",
        name: "high priority",
        align: "RIGHT",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_hands_full",
          "e_toy_in_room",
          "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "e_coffee_in_room",
          "e_coffee_not_in_room",
          "e_mail_in_room",
          "e_mail_not_in_room",
        ],
      },
      {
        type: "input_end_row",
        align: "RIGHT",
      },
      {
        type: "input_statement",
        name: "medium priority",
        align: "RIGHT",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_hands_full",
          "e_toy_in_room",
          "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "e_coffee_in_room",
          "e_coffee_not_in_room",
          "e_mail_in_room",
          "e_mail_not_in_room",
        ],
      },
      {
        type: "input_end_row",
      },
      {
        type: "input_statement",
        name: "low priority",
        align: "RIGHT",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_hands_full",
          "e_toy_in_room",
          "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "e_coffee_in_room",
          "e_coffee_not_in_room",
          "e_mail_in_room",
          "e_mail_not_in_room",
        ],
      },
    ],
    colour: 160,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["goals"] = function (block) {
  return `
goals( 
  ${
    Blockly.JavaScript.statementToCode(block, "high priority") +
    "#" +
    Blockly.JavaScript.statementToCode(block, "medium priority") +
    "#" +
    Blockly.JavaScript.statementToCode(block, "low priority")
  });
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
          "trigger_toy_in_room",
          "trigger_out_of",
          "trigger_in_the",
          "trigger_hands_free",
          "trigger_person_in_room",
          "trigger_coffee_in_room",
          "trigger_mail_in_room",
          "trigger_coffee_in_any",
          "trigger_hands_full",
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
    previousStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    nextStatement: [
      "e_out_of",
      "e_in_the",
      "e_person_in_room",
      "e_hands_free",
      "e_hands_full",
      "e_toy_in_room",
      "is_toy_in_room",
      "e_person_not_in_room",
      "e_toy_not_in_room",
      "e_coffee_in_room",
      "e_coffee_not_in_room",
    ],
    args0: [
      {
        type: "input_statement",
        name: "s1",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_hands_full",
          "e_toy_in_room",
          // "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "e_coffee_in_room",
          "e_coffee_not_in_room",
          // "Boolean",
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
        type: "input_statement",
        name: "s2",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_hands_full",
          "e_toy_in_room",
          // "is_toy_in_room",
          "e_person_not_in_room",
          "e_toy_not_in_room",
          "e_coffee_in_room",
          "e_coffee_not_in_room",
          // "Boolean",
        ],
        align: "CENTRE",
      },
    ],
    colour: 160,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["and"] = function (block) {
  var s1 = Blockly.JavaScript.statementToCode(block, "s1");
  var connector = block.getFieldValue("connector");
  var s2 = Blockly.JavaScript.statementToCode(block, "s2");

  var connector_val = " && ";

  if (connector == "or") {
    connector_val = " || ";
  }
  // TODO: Assemble JavaScript into code variable.
  var code = "(" + s1.trim() + connector_val + s2.trim() + ")\t";
  console.log("hi", code);
  // TODO: Change ORDER_NONE to the correct strength.
  return code;
};
