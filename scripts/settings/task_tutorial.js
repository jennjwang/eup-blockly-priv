function brandomRoom(rooms) {
  // let rooms = ["kitchen", "bedroom"];
  i = Math.floor(Math.random() * rooms.length);
  console.log(rooms[i]);
  return rooms[i];
}

var ROBOT_ROOM = "";
let BEAR_ROOM = "kitchen";
let COFFEE_ROOM = "porch";


let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Thing(BEAR_ROOM, 450, 200, "bear");
let mail = new Thing(, 40, 320, "mail");
let coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");

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
  bedroom: [],
  porch: [mail, coffee],
};

function resetLocs() {
  const end_states = `
  robot ended in ${robot_c.room}
  toy ended in ${bear.room}`;

  console.log("end", end_states);

  document.getElementById("end").innerHTML = end_states;

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  const bear_elt = document.getElementById("bear");
  let BEAR_ROOM = "kitchen";
  let toy_dst = rooms[BEAR_ROOM];

  bear_elt.style.left = toy_dst[0] + 50 + "px";
  bear_elt.style.bottom = toy_dst[1] + "px";
  bear = new Thing(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
  toys_in_room = { kitchen: [], playroom: [], bedroom: [] };
  toys_in_room[BEAR_ROOM] = [bear];

  const mail_elt = document.getElementById("mail");
  mail = new Thing("porch", 40, 320, "mail");
  
  mail_elt.style.display = "block";
  mail_elt.style.left = "40px";
  mail_elt.style.bottom = "320px";

  const coffee_elt = document.getElementById("coffee");

  coffee_elt.style.display = "block";
  coffee_elt.style.left = "280px";
  coffee_elt.style.bottom = "320px";
  coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");

  ROBOT_ROOM = "bedroom";
  const robot = document.getElementById("robot");
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);
  // toys_in_room = { kitchen: [], playroom: [bear], bedroom: [] };

  let starter_code = `
  robot started in ${robot_c.room}
  toy started in ${BEAR_ROOM}`;

  console.log("start", starter_code);

  document.getElementById("start").innerHTML = starter_code;

  return "";
}

function isSameRoom(room) {
  return robot_c.room == room;
}
