function brandomRoom(rooms) {
  // let rooms = ["kitchen", "bedroom"];
  i = Math.floor(Math.random() * rooms.length);
  console.log(rooms[i]);
  return rooms[i];
}

var ROBOT_ROOM = "";
let BEAR_ROOM = brandomRoom(["kitchen", "bedroom"]);
if (BEAR_ROOM == "kitchen") {
  ROBOT_ROOM = "bedroom";
} else {
  ROBOT_ROOM = "kitchen";
}

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Toy(BEAR_ROOM, 450, 200, "bear");

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

var toys_in_room = { kitchen: [], playroom: [], bedroom: [] };

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
  let BEAR_ROOM = brandomRoom(["kitchen", "bedroom"]);
  let toy_dst = rooms[BEAR_ROOM];
  bear_elt.style.left = toy_dst[0] + 50 + "px";
  bear_elt.style.bottom = toy_dst[1] + "px";
  bear = new Toy(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
  toys_in_room = { kitchen: [], playroom: [], bedroom: [] };
  toys_in_room[BEAR_ROOM] = [bear];
  console.log(toys_in_room);

  if (BEAR_ROOM == "kitchen") {
    ROBOT_ROOM = brandomRoom(["playroom", "bedroom"]);
  } else {
    ROBOT_ROOM = brandomRoom(["kitchen", "playroom"]);
  }
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
