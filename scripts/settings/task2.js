function brandomRoom(rooms) {
  // let rooms = ["kitchen", "bedroom"];
  i = Math.floor(Math.random() * rooms.length);
  console.log(rooms[i]);
  return rooms[i];
}

var ROBOT_ROOM = brandomRoom(["kitchen", "bedroom", "porch"]);
let BEAR_ROOM = brandomRoom(["kitchen", "bedroom", "porch"]);
while (BEAR_ROOM == ROBOT_ROOM) {
  ROBOT_ROOM = brandomRoom(["kitchen", "bedroom", "porch"]);
}

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
let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear_coors = rooms[BEAR_ROOM];
let bear = new Thing(BEAR_ROOM, bear_coors[0], bear_coors[1], "bear");

var toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };
toys_in_room[BEAR_ROOM] = [bear];

let end_states = "";
let start_states = "";

function resetLocs() {
  end_states = `
  robot ended in ${robot_c.room}
  toy ended in ${bear.room}`;

  start_states = `
  robot started in ${ROBOT_ROOM}
  toy started in ${BEAR_ROOM}`;

  console.log(start_states);
  console.log("end", end_states);
  document.getElementById("start").innerHTML = start_states;
  document.getElementById("end").innerHTML = end_states;

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  const bear_elt = document.getElementById("bear");

  BEAR_ROOM = brandomRoom(["kitchen", "bedroom", "porch"]);
  let toy_dst = rooms[BEAR_ROOM];
  bear_elt.style.left = toy_dst[0] + 50 + "px";
  bear_elt.style.bottom = toy_dst[1] + "px";
  bear = new Thing(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
  toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };
  toys_in_room[BEAR_ROOM] = [bear];
  console.log(toys_in_room);

  while (BEAR_ROOM === ROBOT_ROOM) {
    ROBOT_ROOM = brandomRoom(["kitchen", "bedroom", "porch"]);
  }

  const robot = document.getElementById("robot");
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);
  // toys_in_room = { kitchen: [], playroom: [bear], bedroom: [] };
  return "";
}

function isSameRoom(room) {
  return robot_c.room == room;
}
