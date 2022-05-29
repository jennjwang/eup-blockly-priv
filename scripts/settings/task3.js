let ROBOT_ROOM = "bedroom";
let BEAR_ROOM = "kichen";
let DUCK_ROOM = "kichen";
let CAR_ROOM = "kichen";

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Toy(BEAR_ROOM, 120, 200, "bear");
let car = new Toy(CAR_ROOM, 140, 200, "car");
let duck = new Toy(DUCK_ROOM, 160, 200, "duck");

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

let toys_in_room = { kitchen: [bear, car, duck], playroom: [], bedroom: [] };

function resetLocs() {
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoom();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const bear_elt = document.getElementById("bear");
  bear_elt.style.left = "120px";
  bear_elt.style.bottom = "200px";
  bear = new Toy(BEAR_ROOM, 120, 200, "bear");

  const car_elt = document.getElementById("car");
  car_elt.style.left = "120px";
  car_elt.style.bottom = "200px";
  car = new Toy(CAR_ROOM, 140, 200, "car");

  const duck_elt = document.getElementById("duck");
  duck_elt.style.left = "160px";
  duck_elt.style.bottom = "200px";
  duck = new Toy(DUCK_ROOM, 160, 200, "duck");

  toys_in_room = { kitchen: [bear, duck, car], playroom: [], bedroom: [] };
}
