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

let ROBOT_ROOM = randomRoomWithoutKitchen();
let PERSON_ROOM = randomRoom();
let COFFEE_ROOM = "kitchen";
let coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

while (PERSON_ROOM === ROBOT_ROOM) {
  PERSON_ROOM = randomRoomWithoutKitchen();
}

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

const KITCHEN = [80, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [280, 320];
const PORCH = [20, 320];
const rooms = {
  kitchen: KITCHEN,
  bedroom: BEDROOM,
  playroom: PLAYROOM,
  porch: PORCH,
};

let toys_in_room = { kitchen: [coffee], playroom: [], bedroom: [], porch: [] };

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
  ROBOT_ROOM = randomRoomWithoutKitchen();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const person_elt = document.getElementById("person");
  PERSON_ROOM = randomRoomWithoutKitchen();
  while (PERSON_ROOM === ROBOT_ROOM) {
    PERSON_ROOM = randomRoomWithoutKitchen();
  }
  // PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);
  let x = dst[0] + 50;
  if (PERSON_ROOM == "porch") {
    x = dst[0];
  }
  person_elt.style.left = x + "px";
  person_elt.style.bottom = dst[1] + "px";

  const coffee_elt = document.getElementById("coffee");

  coffee_elt.style.display = "block";
  coffee_elt.style.left = "100px";
  coffee_elt.style.bottom = "90px";
  coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

  toys_in_room = { kitchen: [coffee], playroom: [], bedroom: [], porch: [] };

  return "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let interval;

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
