let ROBOT_ROOM = "bedroom";
let COFFEE_ROOM = "porch";
let coffee = new Thing(COFFEE_ROOM, 50, 320, "coffee");
let mail = new Thing(COFFEE_ROOM, 30, 320, "mail");

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

const KITCHEN = [90, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [200, 320];
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
  bedroom: [],
  porch: [mail, coffee],
};

function resetLocs() {
  end_states = `
  robot ended in ${robot_c.room}
  person ended in ${person.room}`;

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
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const coffee_elt = document.getElementById("coffee");
  coffee_elt.style.display = "block";
  coffee_elt.style.left = "50px";
  coffee_elt.style.bottom = "320px";
  coffee = new Thing(COFFEE_ROOM, 50, 320, "coffee");

  const mail_elt = document.getElementById("mail");
  mail_elt.style.display = "block";
  mail_elt.style.left = "30px";
  mail_elt.style.bottom = "320px";
  mail = new Thing(COFFEE_ROOM, 30, 320, "mail");

  toys_in_room = {
    kitchen: [],
    playroom: [],
    bedroom: [],
    porch: [mail, coffee],
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
