const code_dict = {
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
};

k = "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1";

const code = code_dict[k];

let pids = [];
let url = new URL(window.location.href);
parse_key(k);

function parse_key(key) {
  arr = key.split("_");
  id = key;
  format = arr.slice(-2)[0];
  task = arr.slice(-1)[0];
  console.log(id);
  console.log(format);
  console.log(task);
  url.searchParams.append("id", id);
  url.searchParams.append("format", format);
  url.searchParams.append("task", task);
  return id, format, task;
}

function addCss(fileName) {
  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if (script.readyState) {
    // only required for IE <9
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    //Others
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

window.onload = function () {
  console.log(url);

  if (url.searchParams.get("task") == "task1") {
    console.log("hi");
    addCss("styles/task1.css");
    const scriptList = document.getElementsByTagName("script");
    console.log("scripts", scriptList);
    toy = document.getElementById("bear");
    toy.remove();
    toy = document.getElementById("duck");
    toy.remove();
    toy = document.getElementById("car");
    toy.remove();

    loadScript("scripts/settings/task1.js", () => {
      update();
      movePerson();
    });
  }

  if (url.searchParams.get("task") == "task2") {
    addCss("styles/task2.css");
    person = document.getElementById("person");
    person.remove();
    toy = document.getElementById("duck");
    toy.remove();
    toy = document.getElementById("car");
    toy.remove();

    loadScript("scripts/settings/task2.js", () => {
      update();
    });
  }

  if (url.searchParams.get("task") == "task3") {
    addCss("styles/task3.css");
    person = document.getElementById("person");
    person.remove();
    loadScript("scripts/settings/task3.js", () => {
      update();
    });
  }
};

function update(event) {
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

    resetLocs();
  }

  reset();

  console.log(url);
  console.log("code", code);
  // if (code.length == 0): alert('there there')

  //Takes in javascript. Need to return javascript executable code, that will be executed line by line.
  //Can debug by running with url params == RL

  //   if (url.searchParams.get("format") == "FULL_MDP") {
  //     check = taskNum + "\n" + code;
  //     console.log(check);
  //     code = run_rl(code, taskNum);
  //     console.log("rl code", code);
  //   }

  //   if (url.searchParams.get("format") == "TAP") {
  //     if (check == "") {
  //       return;
  //     }
  //   }

  //   if (url.searchParams.get("format") == "GOAL_MDP") {
  //     check = taskNum + "\n" + code;
  //     console.log(check);
  //     code = run_mdp(code, taskNum);
  //     console.log("mdp", code);
  //   }

  var myInterpreter = new Interpreter(code, initApi);

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
