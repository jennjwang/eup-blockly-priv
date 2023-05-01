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

function randomizeToys() {
  let toys = [bear, car, duck];
  i = Math.floor(Math.random() * 3) + 1;
  console.log(i);
  return toys.slice(0, i);
}

function resetLocs() {
  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoomWithoutKitchen();

  dst = rooms[ROBOT_ROOM];
  console.log("room", ROBOT_ROOM);
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  let toys = randomizeToys();

  const bear_elt = document.getElementById("bear");
  const car_elt = document.getElementById("car");
  const duck_elt = document.getElementById("duck");

  if (toys.includes(bear)) {
    bear_elt.style.display = "block";
    bear_elt.style.left = "120px";
    bear_elt.style.bottom = "200px";
    bear = new Toy(BEAR_ROOM, 120, 200, "bear");
  } else {
    bear_elt.style.display = "none";
  }

  if (toys.includes(car)) {
    car_elt.style.display = "block";
    car_elt.style.left = "120px";
    car_elt.style.bottom = "200px";
    car = new Toy(CAR_ROOM, 140, 200, "car");
  } else {
    car_elt.style.display = "none";
  }

  if (toys.includes(duck)) {
    duck_elt.style.display = "block";
    duck_elt.style.left = "160px";
    duck_elt.style.bottom = "200px";
    duck = new Toy(DUCK_ROOM, 160, 200, "duck");
  } else {
    duck_elt.style.display = "none";
  }

  toys_in_room = { kitchen: toys, playroom: [], bedroom: [] };

  let starter_code = `
  // robot started in ${robot_c.room}
  // toys in kitchen include ${toys.toString()}\n\n`;

  return starter_code;

  return starter_code;
}
