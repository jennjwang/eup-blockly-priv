const categoryStyles = {
  event_category: {
    colour: 160,
  },
};

var workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  scrollbars: true,
  theme: Blockly.Theme.defineTheme("themeName", {
    base: Blockly.Themes.Classic,
    categoryStyles: categoryStyles,
  }),
});

let pids = [];

var myInterpreter = new Interpreter("", initApi);

function find_state(
  state_map,
  robot_position,
  obj_positions,
  robot_holding,
  person_pos
) {
  for (s in state_map) {
    cur_state = state_map[s];
    if (
      cur_state["robot_position"] == robot_position &&
      cur_state["blocks"].toString() == obj_positions.toString() &&
      cur_state["holding"] == robot_holding &&
      cur_state["person"] == person_pos
    ) {
      return s;
    }
  }
  console.log("can't find s");
}

function get_current_state(state_ids, taskNum) {
  person_location = null;
  if (taskNum == 1 || taskNum == 4) {
    person_location = person.room;
  }

  toy_whereabouts = [];
  for (let toy in toys_in_room) {
    toy_whereabouts = toy_whereabouts.concat(toys_in_room[toy]);
  }

  all_objs = [null, null, null];
  for (let toy in toy_whereabouts) {
    if (toy_whereabouts[toy]["id"] == "mail") {
      all_objs[0] = toy_whereabouts[toy]["room"];
    } else if (toy_whereabouts[toy]["id"] == "coffee") {
      all_objs[1] = toy_whereabouts[toy]["room"];
    } else if (all_objs[2] == null) {
      all_objs[2] = toy_whereabouts[toy]["room"];
    } else {
      all_objs.push(toy_whereabouts[toy]["room"]);
    }
  }
  if (all_objs.length < 3) {
    all_objs.push(null);
  }

  if (taskNum == 6) {
    all_objs = [[], null, null];
    for (var m in toy_whereabouts) {
      if (toy_whereabouts[m] == null) {
        all_objs[0].push(null);
      } else {
        all_objs[0].push(toy_whereabouts[m]["room"]);
      }
    }
  }

  held_obj = null;
  if (robot_c.holding != null) {
    if (robot_c.holding.id != "mail" && robot_c.holding.id != "coffee") {
      held_obj = "toy";
    } else {
      held_obj = robot_c.holding.id;
    }
  }

  // #console.log('here: ', robot_c, all_objs, held_obj, person_location)
  return find_state(
    state_ids,
    robot_c.room,
    all_objs,
    held_obj,
    person_location
  );
}

function update(event) {
  reset();

  taskNum = url.toString().split("task")[1][0];

  code += Blockly.JavaScript.workspaceToCode(workspace);
  // code =
  //   "goals(\n (toy_not_in_room() && ((!isRobotinRoomEvent('kitchen') && !isRobotinRoomEvent('bedroom'))))\n)\n";

  let check = document.getElementById("code").innerHTML;

  console.log(code);

  //Takes in javascript. Need to return javascript executable code, that will be executed line by line.
  //Can debug by running with url params == RL

  if (url.searchParams.get("format") == "FULL_MDP") {
    check = taskNum + "\n" + code;
    console.log(check);
    // console.log("hi", code);
    // debugger;
    // code = run_rl(code, taskNum);
    // console.log("rl code", code);
    if (taskNum == 1 || taskNum == 7) {
      out = run_rl(code, taskNum);
      code = "while(true){" + out + "}";
      // return;
    } else {
      [transition_table, state_ids] = run_rl(code, taskNum);
      // console.log("mdp", code);
      let current_state = get_current_state(state_ids, taskNum);
      if (current_state) {
        let prv_action = null;
        let [cur_action, next_state, cur_val] = transition_table[current_state];

        code = "";

        while (cur_action != prv_action) {
          code += cur_action;
          prv_action = cur_action;
          current_state = get_current_state(state_ids, taskNum);
          [cur_action, next_state, cur_val] = transition_table[next_state];
        }
      }
    }
  }

  if (url.searchParams.get("format") == "TAP") {
    if (check == "") {
      return;
    }
  }

  // if (url.searchParams.get("format") == "SEQ") {
  //   runButton();
  // }

  if (url.searchParams.get("format") == "GOAL_MDP") {
    if (taskNum == 1 || taskNum == 7) {
      out = run_mdp(code, taskNum);
      code = "while(true){" + out + "}";
      // return;
    } else {
      [transition_table, state_ids] = run_mdp(code, taskNum);
      // console.log("mdp", code);
      let current_state = get_current_state(state_ids, taskNum);
      if (!current_state) {
        return;
      }
      let prv_action = null;
      let [cur_action, next_state, cur_val] = transition_table[current_state];

      code = "";

      while (cur_action != prv_action) {
        code += cur_action;
        prv_action = cur_action;
        current_state = get_current_state(state_ids, taskNum);
        [cur_action, next_state, cur_val] = transition_table[next_state];
      }
    }
  }

  console.log("code", code);

  myInterpreter = new Interpreter(code, initApi);

  function nextStep() {
    if (myInterpreter.step()) {
      const pid = setTimeout(nextStep, 0);
      pids.push(pid);
    }
  }
  nextStep();
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
    resolveAfter3Seconds().then(() => {
      moveRobotToRoom(room);
      callback();
    });
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

  wrapper = function (room) {
    return is_mail_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_mail_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return is_coffee_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_coffee_in_room",
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
    pick_up_any();
  };

  interpreter.setProperty(
    globalObject,
    "pick_up_any",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    drop_any();
  };

  interpreter.setProperty(
    globalObject,
    "drop_any",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    pick_up_thing(thing);
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_thing",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isRobotinAnyRoom();
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinAnyRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    drop_thing(thing);
  };
  interpreter.setProperty(
    globalObject,
    "drop_thing",
    interpreter.createNativeFunction(wrapper)
  );

  // wrapper = function (thing) {
  //   drop_thing_disappears(thing);
  // };
  // interpreter.setProperty(
  //   globalObject,
  //   "drop_thing_disappears",
  //   interpreter.createNativeFunction(wrapper)
  // );

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

  wrapper = function (thing) {
    return thing_in_room(thing);
  };
  interpreter.setProperty(
    globalObject,
    "thing_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    return thing_not_in_room(thing);
  };
  interpreter.setProperty(
    globalObject,
    "thing_not_in_room",
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
    resolveAfter3Seconds().then(() => {
      moveRobotToRandomRoom();
      callback();
    });
  };
  interpreter.setProperty(
    globalObject,
    "moveRobotToRandomRoom",
    interpreter.createAsyncFunction(wrapper)
  );
}

function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

function reset() {
  for (var i = 0; i < pids.length; i++) {
    window.clearTimeout(pids[i]);
    window.clearInterval(pids[i]);
  }

  pids = [];

  // clears all the upcoming actions if reset is initiated in the middle of execution
  for (var i = 0; i < pidList.length; i++) {
    clearTimeout(pidList[i]);
    window.clearInterval(pidList[i]);
  }
  pidList = [];

  code = resetLocs();
}

document.querySelector("#doneButton").disabled = true;

function toggleButton() {
  var button = document.getElementById("runButton");

  let code_input = Blockly.JavaScript.workspaceToCode(workspace);
  let check = document.getElementById("code").innerHTML;

  let paradigm = url.searchParams.get("format");

  // alert(code_input);
  // console.log("run program", button.innerHTML.trim());

  button_text = button.innerHTML.trim();

  if (
    (paradigm == "GOAL_MDP" || paradigm == "FULL_MDP") &
    !code_input.includes("undefined")
  ) {
    document.querySelector("#doneButton").disabled = false;
  } else if ((paradigm == "TAP") & (check != "")) {
    document.querySelector("#doneButton").disabled = false;
  } else if ((paradigm == "SEQ") & (code_input.length > 0)) {
    document.querySelector("#doneButton").disabled = false;
  }

  if (button_text === "Run Program") {
    button.innerHTML = "Stop Program";
    button.classList.remove("run");
    button.classList.add("stop");
    update();
  } else {
    button.innerHTML = "Run Program";
    button.classList.add("run");
    button.classList.remove("stop");
    reset();
  }
}

// add blocks to the workspace
const url = new URL(window.location.href);
var xml;

// categories of action, goals, trigger for RL format
if (url.searchParams.get("format") == "FULL_MDP") {
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="actions" deletable="false" x="100" y="80"></block>
  <block type="triggers" deletable="false" x="320" y="80"></block>
  <block type="goals" deletable="false" x="100" y="280"></block>
  </xml>`
  );

  // hiding the original categories of controls, commands, and conditions
  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "none";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "none";
  document.getElementById("blockly-7").style.display = "none";
} else if (url.searchParams.get("format") == "TAP") {
  // adding if-do block for tap
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="forever" deletable="false" x="100" y="50"></block>
  </xml>`
  );

  // reversing the hidden display from RL format to show categories of controls, commands, and conditions
  document.getElementById("blockly-0").style.display = "";
  document.getElementById("blockly-1").style.display = "";
  document.getElementById("blockly-2").style.display = "";
  document.getElementById("blockly-3").style.display = "";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-5").style.display = "none";
  document.getElementById("blockly-6").style.display = "none";
  document.getElementById("blockly-7").style.display = "none";
} else if (url.searchParams.get("format") == "GOAL_MDP") {
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="goals" deletable="false" x="100" y="50"></block>
  </xml>`
  );

  // hiding the original categories of controls, commands, and conditions
  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "none";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "none";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-6").style.display = "none";
  document.getElementById("blockly-7").style.display = "none";
} else if (url.searchParams.get("format") == "SEQ") {
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="start_block" deletable="false" x="100" y="50"></block>
  </xml>`
  );

  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-5").style.display = "none";
  document.getElementById("blockly-6").style.display = "none";
}

window.onload = function () {
  // updates script dynamically depending on format
  if (
    url.searchParams.get("format") == "FULL_MDP" ||
    url.searchParams.get("format") == "GOAL_MDP"
  ) {
    const scriptList = document.querySelectorAll(
      "script[type='text/javascript']"
    );
    console.log(scriptList);
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find((script) => script.id === "tap");
    console.log(testScript);
    testScript.remove();
    testScript.parentNode.removeChild(testScript);
  } else if (url.searchParams.get("format") == "TAP") {
    var block_script = document.createElement("script");
    block_script.setAttribute("src", "scripts/tap_blocks.js");
    document.body.appendChild(block_script);
  } else {
    var block_script = document.createElement("script");
    block_script.setAttribute("src", "scripts/seq_blocks.js");
    document.body.appendChild(block_script);
  }
};

Blockly.Xml.domToWorkspace(xml, workspace);

workspace.addChangeListener(Blockly.Events.disableOrphans);
