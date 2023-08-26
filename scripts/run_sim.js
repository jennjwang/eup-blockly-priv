/*
TODO:
- filter out keys by task
- work the mdp formats
- check that seq works (done)
*/

importScripts("objects.js");
importScripts("blockly.min.js");
importScripts("game.js");
importScripts("../interpreter/acorn_interpreter.js");
importScripts("rl.js");
importScripts("mdp.js");

let jsonData = [];

const code_dict = {
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (false && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t} else {\n  }\n}\n",
  "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\npick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task2":
    "while (!((toy_in_room() && eHandsFree()))) {\n  moveRobotToRandomRoom();\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (!toy_not_in_room()) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFull();\n  \teHandsFree();\n\n)\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task1":
    "goals(\n  isRobotinRoomEvent('bedroom')\n)\n",
  "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task2":
    "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task2":
    "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
  "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && ((!isRobotinRoomEvent('kitchen') && !isRobotinRoomEvent('bedroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
};

function parse_key(key) {
  if (key.includes("MDP")) {
    const parts = key.split("_");
    // console.log(parts[(0, -3)]);
    const key_id = parts.slice(0, parts.length - 3).join("_");
    const key_format = parts.slice(3, parts.length - 1).join("_");
    const key_task = parts[parts.length - 1];
    return [key_id, key_format, key_task];
  }
  arr = key.split("_");
  //   console.log(arr[(0, arr.length - 1)]);
  const key_id = arr.slice(0, arr.length - 2).join("_");
  const key_format = arr.slice(-2)[0];
  const key_task = arr.slice(-1)[0];
  //   url.searchParams.append("format", key_format);
  return [key_id, key_format, key_task];
}

function initApi(interpreter, globalObject) {
  var wrapper;

  // const wrapperHighlight = function (id) {
  //   id = String(id || "");
  //   // console.log(id);
  //   return highlightBlock(id);
  // };
  // interpreter.setProperty(
  //   globalObject,
  //   "highlightBlock",
  //   interpreter.createNativeFunction(wrapperHighlight)
  // );

  // Each step will run the interpreter until the highlightPause is true.
  // let highlightPause = false;

  function highlightBlock(id) {
    resolveAfter3Seconds().then(() => {
      workspace.highlightBlock(id);
      // highlightPause = true;
      console.log("highlight");
    });
  }

  wrapper = function (room, callback) {
    // resolveAfter3Seconds().then(() => {
    moveRobotToRoom(room);
    callback();
    // });
  };
  interpreter.setProperty(
    globalObject,
    "moveRobotToRoom",
    interpreter.createAsyncFunction(wrapper)
  );

  wrapper = function () {
    drop_toy();
  };
  interpreter.setProperty(
    globalObject,
    "drop_toy",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return inSameRoom();
  };
  interpreter.setProperty(
    globalObject,
    "inSameRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    pick_up_toy();
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_toy",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return start();
  };
  interpreter.setProperty(
    globalObject,
    "start",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotOutOf(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotOutOf",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotOutOfEvent(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotOutOfEvent",
    interpreter.createNativeFunction(wrapper)
  );
  wrapper = function (room) {
    return is_toy_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_toy_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotinRoom(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotinRoomEvent(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersoninRoom();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonInRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersonInRoomEvent();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonInRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersonNotInRoomEvent();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonNotInRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return eHandsFree();
  };
  interpreter.setProperty(
    globalObject,
    "eHandsFree",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return handsFree();
  };
  interpreter.setProperty(
    globalObject,
    "handsFree",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return toy_in_room();
  };
  interpreter.setProperty(
    globalObject,
    "toy_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return toy_not_in_room();
  };
  interpreter.setProperty(
    globalObject,
    "toy_not_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return eHandsFull();
  };
  interpreter.setProperty(
    globalObject,
    "eHandsFull",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return handsFull();
  };
  interpreter.setProperty(
    globalObject,
    "handsFull",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (callback) {
    // resolveAfter3Seconds().then(() => {
    moveRobotToRandomRoom();
    callback();
    // });
  };
  interpreter.setProperty(
    globalObject,
    "moveRobotToRandomRoom",
    interpreter.createAsyncFunction(wrapper)
  );
}

function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom"];
  i = Math.floor(Math.random() * 2);
  return rooms[i];
}

// let code_dict = {
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task2":
//     "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3":
//     "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && ((!isRobotinRoomEvent('kitchen') && !isRobotinRoomEvent('bedroom'))))\n)\n",
// };

let robot_places = [];

function run_key(k, i) {
  return new Promise((resolve, reject) => {
    let [key_id, key_format, key_task] = parse_key(k);

    console.log("task", key_task);
    console.log("format", key_format);
    console.log("key", key_id);

    let code = code_dict[k];
    if (key_task != "task1" && key_format == "TAP") {
      var closingBraceIndex = code.lastIndexOf("}");
      code = code.slice(0, closingBraceIndex) + "    else { break; }\n  }";
    }

    const taskNum = key_task.slice(-1);
    if (key_format == "FULL_MDP") {
      code = run_rl(code, taskNum);
    }

    if (key_format == "GOAL_MDP") {
      code = run_mdp(code, taskNum);
      //   console.log(code);
    }

    console.log(code);
    var myInterpreter = new Interpreter(code, initApi);
    // resetLocs();
    // myInterpreter.run();
    let time = 1000;

    if (key_format == "SEQ" && key_task != "task1") {
      time = 500;
    }

    function nextStep() {
      //   console.log("places", robot_places);
      if (myInterpreter.step() && time != 0) {
        // nextStep();
        setTimeout(nextStep, 0);
        if (key_task == "task1" || key_format == "SEQ") {
          if (time % 100 == 0 && key_task == "task1") {
            movePerson();
          }
          time -= 1;
        }
        // console.log(time);
        // pids.push(pid);
      } else {
        // console.log("DONE");
        // pidList = [];
        resetLocs(key_id, key_task, key_format, i);
        resolve();
      }
    }

    nextStep();
  });
}

function removeScript(script_id) {
  return new Promise((resolve, reject) => {
    var scriptToRemove = document.getElementById(script_id);
    console.log(scriptToRemove);
    var parent = scriptToRemove.parentElement;
    parent.removeChild(scriptToRemove);
    resolve();
  });
}

const KITCHEN = [90, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [150, 320];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };
let pidList = [];

function customSort(a, b) {
  const aContainsMDP = a.includes("MDP");
  const bContainsMDP = b.includes("MDP");

  if (aContainsMDP && !bContainsMDP) {
    return 1; // Place a after b
  }
  if (!aContainsMDP && bContainsMDP) {
    return -1; // Place a before b
  }

  // If both or neither contain MDP, maintain original order
  return 0;
}

const keys = Object.keys(code_dict).sort(customSort);
let task1_keys = keys.filter((key) => key.includes("task1"));
// let task2_keys = keys.filter((key) => key.includes("task2"));
let task2_keys = [
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task2",
];
let task3_keys = keys.filter((key) => key.includes("task3"));

// console.log(keys.length);

// importScripts("settings/task3_nodisp.js");
importScripts("settings/task2_nodisp.js");
// importScripts("settings/task1_nodisp.js");

// Worker A's loop

async function run_one_loop(key, j) {
  let [key_id, key_format, key_task] = parse_key(key);
  console.log(key_id);
  if (key_task == "task1") {
    n = 10;
  } else {
    n = 5;
  }
  for (let i = 0; i < n; i++) {
    // if (key_format == "TAP" || key_format == "SEQ") {
    await run_key(key, i);
    // }
    postMessage(`Worker A - Iteration ${i} ${j}`);
  }
}

async function test(keys) {
  for (let j = 0; j < keys.length; j++) {
    // console.log(keys[j]);
    await run_one_loop(keys[j], j);
  }
  // let i = 0;
  // postMessage(`Worker A - Iteration ${i}`);
  console.log(jsonData);
  //   self.postMessage({ type: "download", data: jsonData });
}

// Create a Blob with the JSON data

test(task2_keys);
