// Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
// Blockly.JavaScript.addReservedWords("highlightBlock");

Blockly.defineBlocksWithJsonArray([
  {
    type: "to_random_room",
    message0: "go to a random room",
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
    colour: 330,
  },
]);

Blockly.JavaScript["to_random_room"] = function () {
  return "moveRobotToRandomRoom();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_toy",
    message0: "pick up the toy",
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
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_toy"] = function (block) {
  return "pick_up_toy();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_toy",
    message0: "put down the toy",
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
    colour: 330,
  },
]);

Blockly.JavaScript["drop_toy"] = function () {
  return "drop_toy();";
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
    // nextStatement: [
    //   "pick_up_toy",
    //   "pick_up_coffee",
    //   "drop_coffee",
    //   "to_room",
    //   "to_random_room",
    //   "drop_toy",
    //   "pick_up_mail",
    //   "drop_mail",
    // ],
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_coffee"] = function (block) {
  return "pick_up_thing('coffee');";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "pick_up_coffee_mail",
    message0: "pick up %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["any item", "any"],
          ["the toy", "toy"],
          ["the coffee", "coffee"],
          ["the mail", "mail"],
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

    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_coffee_mail"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  if (value == "'any'") {
    return "pick_up_any();\n\t";
  }
  if (value == "'toy'") {
    return "pick_up_toy(); \n\t";
  }
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
          ["item", "any"],
          ["toy", "toy"],
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
    colour: 330,
  },
]);

Blockly.JavaScript["drop_coffee_mail"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  if ((value = "'any'")) {
    return "drop_any();\n\t";
  }
  if (value == "'toy'") {
    return "drop_toy();\n\t";
  }
  return "drop_thing(" + value + ");\n\t";
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

Blockly.JavaScript["to_room"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return "moveRobotToRoom(" + value + ");";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "out_of",
    message0: "I left %1",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["any room", "any room"],
          ["the kitchen", "kitchen"],
          ["the bedroom", "bedroom"],
          ["the playroom", "playroom"],
          ["the porch", "porch"],
        ],
      },
    ],
    output: "out_of",
    colour: 260,
  },
]);

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
    output: "Boolean",
    colour: 160,
  },
]);

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
          ["porch", "porch"],
        ],
      },
    ],
    output: "Boolean",
    colour: 160,
  },
]);

// TODO: if toy is in current room and robot enters, does that fire this trigger?

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_thing_in_room",
    message0: "there is %1 in the room",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["toy", "toy"],
          ["coffee", "coffee"],
          ["person", "person"],
          ["mail", "mail"],
        ],
      },
    ],
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_thing_in_room"] = function (block) {
  let value = block.getFieldValue("VALUE");
  if (value == "toy") {
    return ["toy_in_room()", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "coffee") {
    return ["thing_in_room('coffee')", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "mail") {
    return ["thing_in_room('mail')", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "person") {
    return ["isPersonInRoomEvent()", Blockly.JavaScript.PRECEDENCE];
  }
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_thing_not_in_room",
    message0: "there is NO %1 in the room",
    args0: [
      {
        type: "field_dropdown",
        name: "VALUE",
        options: [
          ["toy", "toy"],
          ["coffee", "coffee"],
          ["person", "person"],
          ["mail", "mail"],
        ],
      },
    ],
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["e_thing_not_in_room"] = function (block) {
  let value = block.getFieldValue("VALUE");
  if (value == "toy") {
    return ["toy_not_in_room()\t", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "coffee") {
    return ["thing_not_in_room('coffee')\t", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "mail") {
    return ["thing_not_in_room('mail')\t", Blockly.JavaScript.PRECEDENCE];
  } else if (value == "person") {
    return ["isPersonNotInRoomEvent()\t", Blockly.JavaScript.PRECEDENCE];
  }
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
          ["any room", "any room"],
          ["the kitchen", "kitchen"],
          ["the bedroom", "bedroom"],
          ["the playroom", "playroom"],
          ["the porch", "porch"],
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
  if (value == "'any room'") {
    return ["isRobotinAnyRoom()", Blockly.JavaScript.PRECEDENCE];
  }
  return ["isRobotinRoom(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  if (value == "'any room'") {
    //TODO: change to out of room
    return "isRobotinAnyRoom()";
  }
  return ["isRobotOutOf(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["e_in_the"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotinRoomEvent(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["e_out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["!isRobotinRoomEvent(" + value + ")", Blockly.JavaScript.PRECEDENCE];
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
    type: "e_as_many",
    message0: "as many toys as possible are in the room",
    output: "Boolean",
    colour: 160,
  },
]);

Blockly.JavaScript["e_as_many"] = function (block) {
  return ["as_many_toys()", Blockly.JavaScript.PRECEDENCE];
};

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
Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_full",
    message0: "I picked up an item",
    output: "hands_full",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_full"] = function () {
  return ["handsFull()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_free",
    message0: "I put down an item",
    output: "hands_free",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_free"] = function (block) {
  return ["handsFree()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "person_in_room",
    message0: "a person entered the room",
    output: "person_in_room",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["person_in_room"] = function () {
  return ["isPersonInRoom()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["inSameRoom"] = function () {
  return ["inSameRoom()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "start_block",
    message0: "when the program starts",
    nextStatement: null,
    colour: 225,
  },
]);

Blockly.JavaScript["start_block"] = function () {
  return "";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "forever",
    message0: "Rules %1",
    args0: [
      {
        type: "input_statement",
        name: "input",
        check: ["if_then", "if_while_then"],
      },
    ],
    colour: 225,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.JavaScript["forever"] = function (block) {
  document.getElementById("code").innerHTML =
    Blockly.JavaScript.statementToCode(block, "input");
  // console.log(Blockly.JavaScript.statementToCode(block, "input"));
  return `
  while (true) {
    var randNum = Math.floor(Math.random() * 20);
    var trigs = [];
    ${Blockly.JavaScript.statementToCode(block, "input")}
    if (trigs.length != 0) {
      trigs[randNum % trigs.length]();
    }
  }\n
  `;
};

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

Blockly.defineBlocksWithJsonArray([
  {
    type: "e_hands_free",
    message0: "my hands are empty",
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

Blockly.defineBlocksWithJsonArray([
  {
    type: "if_then",
    message0: "if %1 then %2",
    args0: [
      {
        type: "input_value",
        name: "condition",
        check: [
          "in_any",
          "out_of",
          "in_the",
          "person_in_room",
          "hands_free",
          "e_hands_free",
          "e_hands_full",
          "hands_full",
          "start",
        ],
      },
      {
        type: "input_statement",
        name: "execute",
        check: ["drop_toy", "pick_up_toy", "to_room", "to_random_room"],
      },
    ],
    previousStatement: "",
    nextStatement: ["if_then", "if_while_then"],
    colour: 210,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.Blocks["if_then"].onchange = function (changeEvent) {
  console.log(changeEvent);
  if (changeEvent.newInputName == "execute" && changeEvent.newParentId) {
    var inputBlock = this.workspace.getBlockById(changeEvent.blockId);
    var parentBlock = this.workspace.getBlockById(changeEvent.newParentId);
    if (
      (inputBlock.type == "if_then" || inputBlock.type == "if_while_then") &&
      (parentBlock.type == "if_then" || parentBlock.type == "if_while_then")
    ) {
      console.log("NESTING");
      // console.log("type", parentBlock.type);
      parentBlock.getInput("execute").connection.disconnect();
    }
  }
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "start",
    message0: "the program started",
    output: "start",
    colour: 260,
  },
]);

Blockly.JavaScript["start"] = function (block) {
  return ["start()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["if_then"] = function (block) {
  var value_condition = Blockly.JavaScript.valueToCode(
    block,
    "condition",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  if (value_condition == "") {
    value_condition = false;
  }

  var statements_execute = Blockly.JavaScript.statementToCode(block, "execute");
  var code = `
  if (${value_condition}) {
    trigs.push(
      function(){
        ${statements_execute}
      });
    };\n`;
  return code;
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "if_while_then",
    message0: "if %1 and %2 then %3",
    args0: [
      {
        type: "input_value",
        name: "condition",
        check: [
          "in_any",
          "out_of",
          "in_the",
          "person_in_room",
          "hands_free",
          "hands_full",
          "start",
        ],
      },
      {
        type: "input_value",
        name: "event",
        check: [
          "e_out_of",
          "e_in_the",
          "e_person_in_room",
          "e_hands_free",
          "e_toy_in_room",
          "Boolean",
          "e_hands_full",
          "e_toy_not_in_room",
          "e_person_not_in_room",
        ],
      },
      {
        type: "input_statement",
        name: "execute",
        check: ["drop_toy", "pick_up_toy", "to_room", "to_random_room"],
      },
    ],
    previousStatement: "",
    nextStatement: ["if_then", "if_while_then"],
    colour: 210,
    tooltip: "",
    helpUrl: "",
  },
]);

Blockly.Blocks["if_while_then"].onchange = function (changeEvent) {
  // console.log(changeEvent);
  if (changeEvent.newInputName == "execute" && changeEvent.newParentId) {
    var inputBlock = this.workspace.getBlockById(changeEvent.blockId);
    var parentBlock = this.workspace.getBlockById(changeEvent.newParentId);
    if (
      (inputBlock.type == "if_then" || inputBlock.type == "if_while_then") &&
      (parentBlock.type == "if_then" || parentBlock.type == "if_while_then")
    ) {
      console.log("NESTING");
      // console.log("type", parentBlock.type);
      parentBlock.getInput("execute").connection.disconnect();
    }
  }
};

Blockly.JavaScript["if_while_then"] = function (block) {
  var value_condition = Blockly.JavaScript.valueToCode(
    block,
    "condition",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  if (value_condition == "") {
    value_condition = false;
  }

  var value_event = Blockly.JavaScript.valueToCode(
    block,
    "event",
    Blockly.JavaScript.ORDER_ATOMIC
  );

  if (value_event == "") {
    value_event = false;
  }

  var statements_execute = Blockly.JavaScript.statementToCode(block, "execute");
  var code = `
  if (${value_condition} && ${value_event}) {
    trigs.push(
      function(){
        ${statements_execute}
      });
    };\n`;
  return code;
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
