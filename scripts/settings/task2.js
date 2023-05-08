function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  return rooms[i];
}

let ROBOT_ROOM = "bedroom";
let BEAR_ROOM = randomRoom();

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Toy(BEAR_ROOM, 450, 200, "bear");

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

var toys_in_room = { kitchen: [], playroom: [], bedroom: [] };

function resetLocs() {
  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);
  const bear_elt = document.getElementById("bear");
  let BEAR_ROOM = randomRoom();
  let toy_dst = rooms[BEAR_ROOM];
  bear_elt.style.left = toy_dst[0] + 50 + "px";
  bear_elt.style.bottom = toy_dst[1] + "px";
  bear = new Toy(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
  toys_in_room = { kitchen: [], playroom: [], bedroom: [] };
  toys_in_room[BEAR_ROOM] = [bear];
  console.log(toys_in_room);
  // toys_in_room = { kitchen: [], playroom: [bear], bedroom: [] };
}

function isSameRoom(room) {
  return robot_c.room == room;
}
