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
    code = run_rl(code, taskNum);
    console.log("rl code", code);
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
    check = taskNum + "\n" + code;
    console.log(check);
    code = run_mdp(code, taskNum);
    console.log("mdp", code);
  }

  myInterpreter = new Interpreter(code, initApi);

  function nextStep() {
    if (myInterpreter.step()) {
      const pid = setTimeout(nextStep, 0);
      pids.push(pid);
    } else {
      // alert(
      //   "Thanks for completing the study. Please return to Qualtrics and enter the following code: 61948336"
      // );
      // stopButton();
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

  wrapper = function () {
    pick_up_toy();
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_toy",
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

  wrapper = function (thing) {
    drop_thing(thing);
  };
  interpreter.setProperty(
    globalObject,
    "drop_thing",
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
  // wrapper = function (room) {
  //   return is_toy_in_room(room);
  // };
  // interpreter.setProperty(
  //   globalObject,
  //   "is_toy_in_room",
  //   interpreter.createNativeFunction(wrapper)
  // );

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
  let rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom"];
  i = Math.floor(Math.random() * 2);
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
  <block type="goals" deletable="false" x="100" y="200"></block>
  <block type="triggers" deletable="false" x="100" y="300"></block>
  </xml>`
  );

  // hiding the original categories of controls, commands, and conditions
  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "none";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "none";
  document.getElementById("blockly-7").style.display = "none";
} else if (url.searchParams.get("format") == "SEQ") {
  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-5").style.display = "none";
  document.getElementById("blockly-6").style.display = "none";
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
  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "";
  document.getElementById("blockly-2").style.display = "none";
  document.getElementById("blockly-3").style.display = "";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-5").style.display = "none";
  document.getElementById("blockly-6").style.display = "none";
}

Blockly.Xml.domToWorkspace(xml, workspace);

window.onload = function () {
  // updates script dynamically depending on format
  if (
    url.searchParams.get("format") == "FULL_MDP" ||
    url.searchParams.get("format") == "GOAL_MDP"
  ) {
    const scriptList = document.querySelectorAll(
      "script[type='text/javascript']"
    );
    // console.log(scriptList);
    const convertedNodeList = Array.from(scriptList);
    const testScript = convertedNodeList.find((script) => script.id === "tap");
    // console.log(testScript);
    //testScript.remove();
    //testScript.parentNode.removeChild(testScript);
  } else {
    var block_script = document.createElement("script");
    block_script.setAttribute("src", "scripts/tap_blocks.js");
    document.body.appendChild(block_script);
  }
};

workspace.addChangeListener(Blockly.Events.disableOrphans);
