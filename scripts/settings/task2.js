let ROBOT_ROOM = "bedroom";
let BEAR_ROOM = "playroom";

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Toy(BEAR_ROOM, 450, 200, "bear");

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

let toys_in_room = { kitchen: [], playroom: [bear], bedroom: [] };

function resetLocs() {
  prev_room = null;
  counter = 0;

  const robot = document.getElementById("robot");
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);
  const bear_elt = document.getElementById("bear");
  bear_elt.style.left = "500px";
  bear_elt.style.bottom = "200px";
  bear = new Toy(BEAR_ROOM, 450, 200, "bear");
  toys_in_room = { kitchen: [], playroom: [bear], bedroom: [] };
}

function isSameRoom(room) {
  return robot_c.room == room;
}
