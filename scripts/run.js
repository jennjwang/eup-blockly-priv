var workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  scrollbars: false,
});

let pids = [];

var code = "";
var myInterpreter = new Interpreter("", initApi);

function update(event) {
  reset();

  code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code);

  document.getElementById("code").innerHTML = code;

  if (code != "") {
    runButton();
  }

  myInterpreter = new Interpreter(code, initApi);

  function nextStep() {
    if (myInterpreter.step()) {
      const pid = setTimeout(nextStep, 10);
      pids.push(pid);
    } else {
      stopButton();
    }
  }
  nextStep();
}

function initApi(interpreter, globalObject) {
  var wrapper;
  wrapper = function () {
    resolveAfter3Seconds();
  };
  interpreter.setProperty(
    globalObject,
    "resolveAfter3Seconds",
    interpreter.createAsyncFunction(wrapper)
  );

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
    pick_up_toy();
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_toy",
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
    return isRobotinRoom(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinRoom",
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

  wrapper = function (room) {
    return toy_in_room();
  };
  interpreter.setProperty(
    globalObject,
    "toy_in_room",
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

function reset() {
  for (var i = 0; i < pids.length; i++) {
    window.clearTimeout(pids[i]);
    window.clearInterval(pids[i]);
  }

  pids = [];

  for (var i = 0; i < pidList.length; i++) {
    clearTimeout(pidList[i]);
    window.clearInterval(pidList[i]);
  }
  pidList = [];

  resetLocs();
}

document.querySelector("#runButton").addEventListener("click", update);

document.querySelector("#stopButton").addEventListener("click", reset);

function runButton() {
  document.getElementById("stopButton").classList.remove("stop");
  document.getElementById("runButton").classList.add("run");
}

function stopButton() {
  document.getElementById("stopButton").classList.add("stop");
  document.getElementById("runButton").classList.remove("run");
}

// document.querySelector("#runButton").addEventListener("click", runButton);

document.querySelector("#stopButton").addEventListener("click", stopButton);

// adds blocks to the workspace
const url = new URL(window.location.href);
console.log(url.searchParams.get("format"));
var xml;
if (url.searchParams.get("format") == "RL") {
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="actions" deletable="false" x="100" y="80"></block>
  <block type="goals" deletable="false" x="100" y="200"></block>
  <block type="triggers" deletable="false" x="100" y="300"></block>
  </xml>`
  );

  document.getElementById("blockly-0").style.display = "none";
  document.getElementById("blockly-1").style.display = "none";
  document.getElementById("blockly-2").style.display = "none";
} else {
  xml = Blockly.Xml.textToDom(
    `
  <xml>
  <block type="forever" deletable="false" x="100" y="50"></block>
  </xml>`
  );

  document.getElementById("blockly-0").style.display = "";
  document.getElementById("blockly-1").style.display = "";
  document.getElementById("blockly-2").style.display = "";
  document.getElementById("blockly-3").style.display = "none";
  document.getElementById("blockly-4").style.display = "none";
  document.getElementById("blockly-5").style.display = "none";
}
Blockly.Xml.domToWorkspace(xml, workspace);

// updates script dynamically
if (url.searchParams.get("format") == "RL") {
  const scriptList = document.querySelectorAll(
    "script[type='text/javascript']"
  );
  const convertedNodeList = Array.from(scriptList);
  const testScript = convertedNodeList.find((script) => script.id === "tap");
  testScript.parentNode.removeChild(testScript);
} else {
  var block_script = document.createElement("script");
  block_script.setAttribute("src", "scripts/tap_blocks.js");
  document.body.appendChild(block_script);
}

workspace.addChangeListener(Blockly.Events.disableOrphans);
