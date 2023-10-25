function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  return rooms[i];
}

let ROBOT_ROOM = randomRoom();
let PERSON_ROOM = randomRoom();
let COFFEE_ROOM = "kitchen";
let coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

while (PERSON_ROOM === ROBOT_ROOM) {
  PERSON_ROOM = randomRoom();
}

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

const KITCHEN = [90, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [150, 320];
const PORCH = [20, 320];
const rooms = {
  kitchen: KITCHEN,
  bedroom: BEDROOM,
  playroom: PLAYROOM,
  porch: PORCH,
};
let toys_in_room = { kitchen: [coffee], playroom: [], bedroom: [] };

function resetLocs() {
  end_states = `
  robot ended in ${robot_c.room}
  person ended in ${person.room}
  coffee ended in ${coffee.room}`;

  start_states = `
  robot started in ${ROBOT_ROOM}
  person started in ${PERSON_ROOM}`;

  clearInterval(interval);
  document.getElementById("start").innerHTML = start_states;
  document.getElementById("end").innerHTML = end_states;
  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoom();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const person_elt = document.getElementById("person");
  PERSON_ROOM = randomRoom();
  while (PERSON_ROOM === ROBOT_ROOM) {
    PERSON_ROOM = randomRoom();
  }
  // PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);
  let x = dst[0] + 50;
  person_elt.style.left = x + "px";
  person_elt.style.bottom = dst[1] + "px";

  const coffee_elt = document.getElementById("coffee");

  coffee_elt.style.display = "block";
  coffee_elt.style.left = "100px";
  coffee_elt.style.bottom = "90px";
  coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

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
  x = dst[0];
  y = dst[1];
  if (person.room == "playroom" && temp_rooms[i] == "bedroom") {
    x += 100;
  }
  if (person.room == "kitchen" && temp_rooms[i] == "bedroom") {
    x -= 170;
  }
  moveRobotTo("person", [x + 70, y]);
  person.setRoom(temp_rooms[i]);
}

function movePerson() {
  clearInterval(interval);
  console.log("moving person");
  interval = setInterval(function () {
    // if (person.room != robot_c.room) {
    movePersonHelper();
    // }
  }, 5000);
}

function toggleTask1() {
  var button = document.getElementById("runButton");

  if (button.innerHTML != "Run Program") {
    movePerson();
  }
}

if (document.getElementById("runButton")) {
  document.querySelector("#runButton").addEventListener("click", toggleTask1);
}

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
