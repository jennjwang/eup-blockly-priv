// Blockly.JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
// Blockly.JavaScript.addReservedWords("highlightBlock");

Blockly.defineBlocksWithJsonArray([
  {
    type: "drop_toy",
    message0: "put down the toy",
    previousStatement: "if_do",
    colour: 330,
  },
]);

Blockly.JavaScript["drop_toy"] = function () {
  return "drop_toy();";
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "to_random_room",
    message0: "go to a random room",
    previousStatement: "if_do",
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
    previousStatement: "if_do",
    colour: 330,
  },
]);

Blockly.JavaScript["pick_up_toy"] = function (block) {
  return "pick_up_toy();";
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
    previousStatement: "if_do",
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
    message0: "I have left the %1",
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

// TODO: if toy is in current room and robot enters, does that fire this trigger?

Blockly.defineBlocksWithJsonArray([
  {
    type: "toy_in_room",
    message0: "a toy has appeared in the current room",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript.PRECEDENCE = 0;

Blockly.JavaScript["toy_in_room"] = function (block) {
  return ["toy_in_room()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "in_the",
    message0: "I have arrived at the %1",
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
  return ["isRobotinRoom(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.JavaScript["out_of"] = function (block) {
  let value = "'" + block.getFieldValue("VALUE") + "'";
  return ["isRobotOutOf(" + value + ")", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_full",
    message0: "my hands have become full",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_full"] = function () {
  return ["handsFull()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "hands_free",
    message0: "my hands have become free",
    output: "Boolean",
    colour: 260,
  },
]);

Blockly.JavaScript["hands_free"] = function (block) {
  return ["handsFree()", Blockly.JavaScript.PRECEDENCE];
};

Blockly.defineBlocksWithJsonArray([
  {
    type: "person_in_room",
    message0: "a person has entered the current room",
    output: "Boolean",
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
  document.getElementById("code").innerHTML =
    Blockly.JavaScript.statementToCode(block, "input");
  // console.log(Blockly.JavaScript.statementToCode(block, "input"));
  return `
      while (true) {
      var randNum = Math.floor(Math.random() * 10);
      var trigs = [];
      ${Blockly.JavaScript.statementToCode(block, "input")}
      if (trigs.length >= 1) {
        trigs[randNum % trigs.length]();
      };
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
    colour: 230,
    tooltip: "",
    helpUrl: "",
  },
]);

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
    value_condition = true;
  }

  var statements_execute = Blockly.JavaScript.statementToCode(block, "execute");
  var code = `if (${value_condition}) {
    trigs.push(
      function(){
        ${statements_execute}
      });
    };`;
  return code;
};
