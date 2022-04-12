/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
(function () {
  let currentButton;

  function handlePlay(event) {
    // Add code for playing sound.
    loadWorkspace(event.target);
    let code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace());
    code += "MusicMaker.play();";
    // try {
    //   eval(code);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  // function save(button) {
  //   // Add code for saving the behavior of a button.
  //   button.blocklyXml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
  // }

  // function handleSave() {
  //   document.body.setAttribute('mode', 'edit');
  //   save(currentButton);
  // }

  function loadWorkspace(button) {
    let workspace = Blockly.getMainWorkspace();
    workspace.clear();
    // if (button.blocklyXml) {
    //   Blockly.Xml.domToWorkspace(button.blocklyXml, workspace);
    // }
  }

  // function enableEditMode() {
  //   document.body.setAttribute('mode', 'edit');
  //   document.querySelectorAll('.button').forEach(btn => {
  //     btn.removeEventListener('click', handlePlay);
  //     btn.addEventListener('click', enableBlocklyMode);
  //   });
  // }

  // function enableMakerMode() {
  //   document.body.setAttribute('mode', 'maker');
  //   document.querySelectorAll('.button').forEach(btn => {
  //     btn.addEventListener('click', handlePlay);
  //     btn.removeEventListener('click', enableBlocklyMode);
  //   });
  // }

  // function enableBlocklyMode(e) {
  //   document.body.setAttribute('mode', 'blockly');
  //   currentButton = e.target;
  //   loadWorkspace(currentButton);
  // }

  // document.querySelector('#edit').addEventListener('click', enableEditMode);
  // document.querySelector('#done').addEventListener('click', enableMakerMode);
  // document.querySelector('#save').addEventListener('click', handleSave);

  // enableMakerMode();

  var workspace = Blockly.inject("blocklyDiv", {
    toolbox: document.getElementById("toolbox"),
    scrollbars: false,
  });

  // var workspace = Blockly.inject("blocklyDiv", { toolbox: toolbox });

  function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    // code = findMoveRoomBlocks(code);
    code = "async function run() {\n" + code + "};\nrun();";
    console.log(code);
    reset();
    try {
      eval(code);
    } catch (error) {
      console.log(error);
    }
  }

  function reset() {
    const robot = document.getElementById("robot");
    robot.style.left = "120px";
    robot.style.bottom = "200px";
    robot_c = new Robot();
    const bear_elt = document.getElementById("bear");
    bear_elt.style.left = "450px";
    bear_elt.style.bottom = "200px";
    bear = new Toy(450, 200, "bear");
    const car_elt = document.getElementById("car");
    car_elt.style.left = "500px";
    car_elt.style.bottom = "200px";
    car = new Toy(500, 200, "car");
    const duck_elt = document.getElementById("duck");
    duck_elt.style.left = "570px";
    duck_elt.style.bottom = "200px";
    duck = new Toy(570, 200, "duck");
    toys_in_room = { kitchen: [], playroom: [bear, duck, car], bedroom: [] };
  }

  // function findMoveRoomBlocks(code) {
  //   var edittedCode = code.split(" {");
  //   let steps = 0;
  //   console.log(edittedCode);
  //   edittedCode[0] = editMoveRoomInBlock(edittedCode[0], steps);
  //   const toChange = edittedCode.slice(1, -1);
  //   toChange.map((c) => editMoveRoomInBlock(c, 0));
  //   return edittedCode.splice(1, -1, toChange).join(" {");
  // }

  // function editMoveRoomInBlock(code, steps) {
  //   console.log(code);
  //   var edittedCode = code.split("\n");
  //   for (let i = 0; i < edittedCode.length; i++) {
  //     // console.log(edittedCode[i]);
  //     const match = edittedCode[i].match(/moveRobotToRoom(.*);/);
  //     if (match) {
  //       console.log(match.index);
  //       const newLine =
  //         "setTimeout( () => {" + match[0] + "}, " + steps * 4000 + ");";
  //       edittedCode[i] = edittedCode[i].substr(0, match.index) + newLine;
  //       console.log(edittedCode[i]);
  //       steps++;
  //     }
  //   }
  //   return edittedCode.join("\n");
  // }

  document
    .querySelector("#runButton")
    .addEventListener("click", myUpdateFunction);
})();
