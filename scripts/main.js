/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
(function () {
  function loadWorkspace(button) {
    let workspace = Blockly.getMainWorkspace();
    workspace.clear();
  }

  var workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("toolbox"),
    scrollbars: false,
  });

  // var workspace = Blockly.inject("blocklyDiv", { toolbox: toolbox });

  var pid = 0;
  function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    // code = findMoveRoomBlocks(code);
    // code = "(async() => {\n" + code + "})();";
    console.log(code);
    reset();
    // try {
    //   eval(code);
    // } catch (error) {
    //   console.log(error);
    // }

    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var myInterpreter = new Interpreter(code, initApi);

    function nextStep() {
      if (myInterpreter.step()) {
        // console.log(myInterpreter.step());
        pid = setTimeout(nextStep, 10);
      }
    }
    nextStep();
  }

  function initApi(interpreter, globalObject) {
    // Add an API function for the alert() block.
    var wrapper;
    wrapper = function () {
      resolveAfter3Seconds();
    };
    interpreter.setProperty(
      globalObject,
      "resolveAfter3Seconds",
      interpreter.createAsyncFunction(wrapper)
    );
    var wrapper = function (id) {
      return workspace.highlightBlock(id);
    };
    interpreter.setProperty(
      globalObject,
      "highlightBlock",
      interpreter.createNativeFunction(wrapper)
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

    // Add an API function for the prompt() block.
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
      isRobotOutOf(room);
    };
    interpreter.setProperty(
      globalObject,
      "isRobotOutOf",
      interpreter.createNativeFunction(wrapper)
    );

    wrapper = function (room) {
      isRobotinRoom(room);
    };
    interpreter.setProperty(
      globalObject,
      "isRobotinRoom",
      interpreter.createNativeFunction(wrapper)
    );

    wrapper = function () {
      handsFree();
    };
    interpreter.setProperty(
      globalObject,
      "handsFree",
      interpreter.createNativeFunction(wrapper)
    );
  }

  // let controller = new AbortController();

  function reset() {
    // controller.abort();
    window.clearTimeout(pid);

    // for (var i = 0; i < pidList.length; i++) {
    //   clearTimeout(pidList[i]);
    // }
    // pidList = [];

    const robot = document.getElementById("robot");
    robot.style.left = "120px";
    robot.style.bottom = "200px";
    robot_c = new Robot();
    const bear_elt = document.getElementById("bear");
    bear_elt.style.left = "500px";
    bear_elt.style.bottom = "200px";
    bear = new Toy(450, 200, "bear");
    const car_elt = document.getElementById("car");
    car_elt.style.left = "500px";
    car_elt.style.bottom = "200px";
    car = new Toy(500, 200, "car");
    const duck_elt = document.getElementById("duck");
    duck_elt.style.left = "500px";
    duck_elt.style.bottom = "200px";
    duck = new Toy(570, 200, "duck");
    toys_in_room = { kitchen: [], playroom: [bear, duck, car], bedroom: [] };
  }

  document
    .querySelector("#runButton")
    .addEventListener("click", myUpdateFunction);

  document.querySelector("#stopButton").addEventListener("click", reset);
})();
