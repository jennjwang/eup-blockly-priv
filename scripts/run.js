let ROBOT_ROOM = "kitchen";
let PERSON_ROOM = "bedroom";
let DUCK_ROOM = randomRoom();
let BEAR_ROOM = randomRoom();
let CAR_ROOM = randomRoom();

var workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  scrollbars: false,
});

let pids = [];

var code = Blockly.JavaScript.workspaceToCode(workspace);
var myInterpreter = new Interpreter(code, initApi);

function update(event) {
  reset();

  code = Blockly.JavaScript.workspaceToCode(workspace);

  document.getElementById("code").innerHTML = code;

  myInterpreter = new Interpreter(code, initApi);

  function nextStep() {
    if (myInterpreter.step()) {
      const pid = setTimeout(nextStep, 10);
      pids.push(pid);
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

  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoom();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);
  const bear_elt = document.getElementById("bear");
  bear_elt.style.left = "500px";
  bear_elt.style.bottom = "200px";
  bear = new Toy(BEAR_ROOM, 450, 200, "bear");
  const car_elt = document.getElementById("car");
  car_elt.style.left = "500px";
  car_elt.style.bottom = "200px";
  car = new Toy(CAR_ROOM, 500, 200, "car");
  const duck_elt = document.getElementById("duck");
  duck_elt.style.left = "500px";
  duck_elt.style.bottom = "200px";
  duck = new Toy(DUCK_ROOM, 570, 200, "duck");

  const person_a = document.getElementById("person");
  PERSON_ROOM = randomRoom();
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  let x = dst[0] + 100;
  person_a.style.left = x + "px";
  person_a.style.bottom = dst[1] + "px";

  toys_in_room = { kitchen: [], playroom: [bear, duck, car], bedroom: [] };
}

document.querySelector("#runButton").addEventListener("click", update);

document.querySelector("#stopButton").addEventListener("click", reset);
