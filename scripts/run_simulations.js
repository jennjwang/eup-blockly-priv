// /*
// # TODOs:
// - make load window into a function to call each time the code finishes executing
// - make code_dict into a csv or something to read in
// - save states to a json
// - run it n times
// */

// function parse_key(key) {
//   arr = key.split("_");
//   const key_id = key;
//   const key_format = arr.slice(-2)[0];
//   const key_task = arr.slice(-1)[0];
//   url.searchParams.append("format", key_format);
//   return [key_id, key_format, key_task];
// }

// function record(id) {
//   console.log("end", document.getElementById("end").innerHTML);
//   console.log("start", document.getElementById("start").innerHTML);
//   // const data = fs.readFileSync("simulated_results.json");
//   // const jsonData = JSON.parse(data);
//   // jsonData.push({
//   //   id: id,
//   //   start_state: document.getElementById("start").innerHTML,
//   //   end_state: document.getElementById("end").innerHTML,
//   // });
//   // fs.writeFileSync("simulated_results.json", JSON.stringify(jsonData));
// }

// function addCss(fileName) {
//   var head = document.head;
//   var link = document.createElement("link");

//   link.type = "text/css";
//   link.rel = "stylesheet";
//   link.href = fileName;

//   head.appendChild(link);
// }

// function loadScript(url, callback, task) {
//   var script = document.createElement("script");
//   script.id = task;
//   script.type = "text/javascript";
//   if (script.readyState) {
//     // only required for IE <9
//     script.onreadystatechange = function () {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     //Others
//     script.onload = function () {
//       callback();
//     };
//   }

//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// }

// /*
// function run_simulation(id, task, format, code) {
//   return new Promise((resolve, reject) => {
//     if (task == "task1") {
//       // console.log("hi");
//       // addCss("styles/task1.css");
//       // const scriptList = document.getElementsByTagName("script");
//       // console.log("scripts", scriptList);
//       // toy = document.getElementById("bear");
//       // toy.remove();
//       // toy = document.getElementById("duck");
//       // toy.remove();
//       // toy = document.getElementById("car");
//       // toy.remove();

//       loadScript(
//         "scripts/settings/task1.js",
//         () => {
//           var scriptToRemove = document.getElementById("task2");
//           var otherscriptToRemove = document.getElementById("task3");

//           var removalPromises = [];

//           if (scriptToRemove) {
//             var parent = scriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(scriptToRemove);
//                 resolve();
//               })
//             );
//           }
//           if (otherscriptToRemove) {
//             var parent = otherscriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(otherscriptToRemove);
//                 resolve();
//               })
//             );
//           }

//           Promise.all(removalPromises).then(() => {
//             update(id, code);
//             movePerson();
//             resolve();
//           });
//         },
//         task
//       );
//     }

//     if (task == "task2") {
//       // addCss("styles/task2.css");
//       // person = document.getElementById("person");
//       // person.remove();
//       // toy = document.getElementById("duck");
//       // toy.remove();
//       // toy = document.getElementById("car");
//       // toy.remove();

//       loadScript(
//         "scripts/settings/task2.js",
//         () => {
//           var scriptToRemove = document.getElementById("task1");
//           var otherscriptToRemove = document.getElementById("task3");
//           var removalPromises = [];
//           if (scriptToRemove) {
//             var parent = scriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(scriptToRemove);
//                 resolve();
//               })
//             );
//           }
//           if (otherscriptToRemove) {
//             var parent = otherscriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(otherscriptToRemove);
//                 resolve();
//               })
//             );
//           }
//           Promise.all(removalPromises).then(() => {
//             update(id, code, function () {
//               var scriptToRemove = document.getElementById("task2");
//               if (scriptToRemove) {
//                 var scriptParent = scriptToRemove.parentElement;
//                 scriptParent.removeChild(scriptToRemove);
//               }
//             });
//           });
//         },
//         task
//       );
//     }

//     if (task == "task3") {
//       // addCss("styles/task3.css");
//       // person = document.getElementById("person");
//       // person.remove();
//       loadScript(
//         "scripts/settings/task3.js",
//         () => {
//           var scriptToRemove = document.getElementById("task2");
//           var otherscriptToRemove = document.getElementById("task1");
//           var removalPromises = [];
//           if (scriptToRemove) {
//             var parent = scriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(scriptToRemove);
//                 // console.log(parent);
//                 resolve();
//               })
//             );
//           }
//           if (otherscriptToRemove) {
//             var parent = otherscriptToRemove.parentElement;
//             removalPromises.push(
//               new Promise((resolve) => {
//                 parent.removeChild(otherscriptToRemove);
//                 resolve();
//               })
//             );
//           }
//           Promise.all(removalPromises).then(() => {
//             update(id, code, function () {
//               var scriptToRemove = document.getElementById("task3");
//               if (scriptToRemove) {
//                 var scriptParent = scriptToRemove.parentElement;
//                 scriptParent.removeChild(scriptToRemove);
//               }
//             });
//           });
//         },
//         task
//       );
//     }
//   });
// }
// */

// function run_simulation(id, task, format, code) {
//   return new Promise((resolve, reject) => {
//     function loadTaskScript(taskScriptPath, callback) {
//       const script = document.createElement("script");
//       script.src = taskScriptPath;
//       script.onload = callback;
//       document.head.appendChild(script);
//     }

//     if (task == "task1") {
//       loadTaskScript("scripts/settings/task1.js", () => {
//         var scriptToRemove = document.getElementById("task2");
//         var otherscriptToRemove = document.getElementById("task3");

//         var removalPromises = [];

//         if (scriptToRemove) {
//           var parent = scriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(scriptToRemove);
//               resolve();
//             })
//           );
//         }
//         if (otherscriptToRemove) {
//           var parent = otherscriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(otherscriptToRemove);
//               resolve();
//             })
//           );
//         }

//         // Extend Promise.all to wait for both removal and update/movePerson
//         Promise.all([...removalPromises, update(id, code), movePerson()])
//           .then(() => {
//             resolve(); // Resolve the main promise after all operations
//           })
//           .catch(reject);
//       });
//     }

//     if (task == "task2") {
//       loadTaskScript("scripts/settings/task2.js", () => {
//         var scriptToRemove = document.getElementById("task1");
//         var otherscriptToRemove = document.getElementById("task3");

//         var removalPromises = [];

//         if (scriptToRemove) {
//           var parent = scriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(scriptToRemove);
//               resolve();
//             })
//           );
//         }
//         if (otherscriptToRemove) {
//           var parent = otherscriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(otherscriptToRemove);
//               resolve();
//             })
//           );
//         }

//         // Extend Promise.all to wait for both removal and update/movePerson
//         Promise.all([...removalPromises, update(id, code)])
//           .then(() => {
//             resolve(); // Resolve the main promise after all operations
//           })
//           .catch(reject);
//       });
//     }

//     if (task == "task3") {
//       loadTaskScript("scripts/settings/task3.js", () => {
//         var scriptToRemove = document.getElementById("task1");
//         var otherscriptToRemove = document.getElementById("task2");

//         var removalPromises = [];

//         if (scriptToRemove) {
//           var parent = scriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(scriptToRemove);
//               resolve();
//             })
//           );
//         }
//         if (otherscriptToRemove) {
//           var parent = otherscriptToRemove.parentElement;
//           removalPromises.push(
//             new Promise((resolve) => {
//               parent.removeChild(otherscriptToRemove);
//               resolve();
//             })
//           );
//         }

//         // Extend Promise.all to wait for both removal and update/movePerson
//         Promise.all([...removalPromises, update(id, code)])
//           .then(() => {
//             resolve(); // Resolve the main promise after all operations
//           })
//           .catch(reject);
//       });
//     }

//     // Handle other tasks...
//   });
// }

// function update(id, myCode) {
//   return new Promise((resolve, reject) => {
//     function reset() {
//       for (var i = 0; i < pids.length; i++) {
//         window.clearTimeout(pids[i]);
//         window.clearInterval(pids[i]);
//       }

//       pids = [];

//       // clears all the upcoming actions if reset is initiated in the middle of execution
//       for (var i = 0; i < pidList.length; i++) {
//         clearTimeout(pidList[i]);
//         window.clearInterval(pidList[i]);
//       }
//       pidList = [];

//       resetLocs();
//     }

//     reset();
// var myInterpreter = new Interpreter(myCode, initApi);
// // myInterpreter.run();
//     // resetLocs();
//     // record(id);
//     // reset();

// function nextStep() {
//   // console.log("hi", myInterpreter);
//   if (myInterpreter.step()) {
//     // nextStep();
//     const pid = setTimeout(nextStep, 0);
//     // pids.push(pid);
//   } else {
//     console.log("DONE");
//     resetLocs();
//     record(id);
//     resolve();
//   }
// }
// nextStep();
//   });
// }

// function initApi(interpreter, globalObject) {
//   var wrapper;

//   wrapper = function (room, callback) {
//     resolveAfter3Seconds().then(() => {
//       moveRobotToRoom(room);
//       callback();
//     });
//   };
//   interpreter.setProperty(
//     globalObject,
//     "moveRobotToRoom",
//     interpreter.createAsyncFunction(wrapper)
//   );

//   wrapper = function () {
//     drop_toy();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "drop_toy",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return inSameRoom();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "inSameRoom",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     pick_up_toy();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "pick_up_toy",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return start();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "start",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function (room) {
//     return isRobotOutOf(room);
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isRobotOutOf",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function (room) {
//     return isRobotOutOfEvent(room);
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isRobotOutOfEvent",
//     interpreter.createNativeFunction(wrapper)
//   );
//   wrapper = function (room) {
//     return is_toy_in_room(room);
//   };
//   interpreter.setProperty(
//     globalObject,
//     "is_toy_in_room",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function (room) {
//     return isRobotinRoom(room);
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isRobotinRoom",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function (room) {
//     return isRobotinRoomEvent(room);
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isRobotinRoomEvent",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return isPersoninRoom();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isPersonInRoom",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return isPersonInRoomEvent();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isPersonInRoomEvent",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return isPersonNotInRoomEvent();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "isPersonNotInRoomEvent",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return eHandsFree();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "eHandsFree",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return handsFree();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "handsFree",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return toy_in_room();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "toy_in_room",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return toy_not_in_room();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "toy_not_in_room",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return eHandsFull();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "eHandsFull",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function () {
//     return handsFull();
//   };
//   interpreter.setProperty(
//     globalObject,
//     "handsFull",
//     interpreter.createNativeFunction(wrapper)
//   );

//   wrapper = function (callback) {
//     resolveAfter3Seconds().then(() => {
//       moveRobotToRandomRoom();
//       callback();
//     });
//   };
//   interpreter.setProperty(
//     globalObject,
//     "moveRobotToRandomRoom",
//     interpreter.createAsyncFunction(wrapper)
//   );
// }

// function randomRoom() {
//   let rooms = ["kitchen", "bedroom", "playroom"];
//   i = Math.floor(Math.random() * 3);
//   return rooms[i];
// }

// function randomRoomWithoutKitchen() {
//   let rooms = ["bedroom", "playroom"];
//   i = Math.floor(Math.random() * 2);
//   return rooms[i];
// }

// async function runAndRecord(k, val) {
//   return new Promise((resolve) => {
//     pids = [];
//     let code = val;
//     document.getElementById("key_id").innerHTML = k;
//     let [key_id, key_format, key_task] = parse_key(k);
// if (key_task != "task1") {
//   var closingBraceIndex = code.lastIndexOf("}");
//   code = code.slice(0, closingBraceIndex) + "    else { break; }\n  }";
//   // console.log(code);
// }
//     // console.log(key_id);
//     // console.log(key_format);
//     // console.log(key_task);
//     run_simulation(key_id, key_task, key_format, code).then(() => {
//       resolve();
//     });
//     // resolve();
//   });
// }

// let code_dict = {
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
// };

// let pids = [];
// let url = new URL(window.location.href);

// async function processCodeDict() {
//   for (const [k, val] of Object.entries(code_dict)) {
//     console.log(k);
//     await runAndRecord(k, val);
//     // location.reload();
//   }
// }

// processCodeDict();
