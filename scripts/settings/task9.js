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

let ROBOT_ROOM = "playroom";
let COFFEE_ROOM = "bedroom";
let coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);

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

let toys_in_room = {
  kitchen: [],
  playroom: [],
  bedroom: [coffee],
  porch: [],
};

function resetLocs() {
  end_states = `
  robot ended in ${robot_c.room}
  coffee ended in ${coffee.room}`;

  start_states = `
  robot started in ${ROBOT_ROOM}
  coffee started in ${COFFEE_ROOM}`;

  clearInterval(interval);
  document.getElementById("start").innerHTML = start_states;
  document.getElementById("end").innerHTML = end_states;
  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  ROBOT_ROOM = "playroom";
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const coffee_elt = document.getElementById("coffee");

  coffee_elt.style.display = "block";
  coffee_elt.style.left = "280px";
  coffee_elt.style.bottom = "320px";
  coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");
  toys_in_room = {
    kitchen: [],
    playroom: [],
    bedroom: [coffee],
    porch: [],
  };

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
