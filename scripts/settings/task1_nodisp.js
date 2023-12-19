console.log("in task 1");

let ROBOT_ROOM = "kitchen";
let PERSON_ROOM = "bedroom";

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [], playroom: [], bedroom: [] };

function resetLocs(key_id, key_task, key_format, iteration, same_room, count) {
  end_states = `robot ended in ${robot_c.room},person ended in ${person.room},the times that robot and person were in the same room is ${same_room},the number of timesteps is ${count}`;

  start_states = `robot started in ${ROBOT_ROOM},person started in ${PERSON_ROOM}`;

  const data = {
    id: key_id,
    format: key_format,
    task: key_task,
    iteration: iteration,
    start_state: start_states,
    end_state: end_states,
  };

  console.log(data);

  jsonData.push(data);

  clearInterval(interval);

  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  ROBOT_ROOM = randomRoomWithoutKitchen();
  dst = rooms[ROBOT_ROOM];

  robot_c = new Robot(ROBOT_ROOM);

  // const person_elt = document.getElementById("person");
  // PERSON_ROOM = randomRoom();
  PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);

  return "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let interval;

function movePersonHelper() {
  let temp_rooms = ["kitchen", "bedroom", "playroom"];
  const index = temp_rooms.indexOf(person.room);
  if (index > -1) {
    temp_rooms.splice(index, 1); // 2nd parameter means remove one item only
  }
  shuffleArray(temp_rooms);
  i = Math.floor(Math.random() * 2);
  dst = rooms[temp_rooms[i]];
  // x = dst[0];
  // y = dst[1];
  // if (person.room == "playroom" && temp_rooms[i] == "bedroom") {
  //   x += 100;
  // }
  // if (person.room == "kitchen" && temp_rooms[i] == "bedroom") {
  //   x -= 170;
  // }
  // moveRobotTo("person", [x + 70, y]);
  console.log("person is now in", temp_rooms[i]);
  console.log("person room", person.room);
  console.log("robot room", robot_c.room);
  person.setRoom(temp_rooms[i]);
}

function movePerson() {
  // clearInterval(interval);
  // console.log("moving person");
  // interval = setInterval(function () {
  if (person.room != robot_c.room) {
    movePersonHelper();
  }
  // }, 5000);
}

// function toggleTask1() {
//   var button = document.getElementById("runButton");

//   if (button.innerHTML != "Run Program") {
//     movePerson();
//   }
// }

// if (document.getElementById("runButton")) {
//   document.querySelector("#runButton").addEventListener("click", toggleTask1);
// }

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
