let ROBOT_ROOM = "bedroom";
let BEAR_ROOM = "kichen";
let DUCK_ROOM = "kichen";
let CAR_ROOM = "kichen";

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let bear = new Thing(BEAR_ROOM, 80, 90, "bear");
let car = new Thing(CAR_ROOM, 100, 90, "car");
let duck = new Thing(DUCK_ROOM, 120, 90, "duck");

const KITCHEN = [180, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [150, 340];
const PORCH = [20, 320];
const rooms = {
  kitchen: KITCHEN,
  bedroom: BEDROOM,
  playroom: PLAYROOM,
  porch: PORCH,
};

let toys_in_room = {
  kitchen: [bear, car, duck],
  playroom: [],
  bedroom: [],
  porch: [],
};

let end_states = "";
let start_states = "";

function randomizeToys() {
  let toys = [bear, car, duck];
  i = Math.floor(Math.random() * 2) + 2;
  console.log(i);
  return toys.slice(0, i);
}

let toys = randomizeToys();

let SAVE_TOYS = toys.toString();

console.log("toys", toys);

function resetLocs() {
  start_states = `
  robot started in ${ROBOT_ROOM}
  toys in kitchen include [${SAVE_TOYS}]`;

  console.log(toys_in_room["kitchen"]);

  end_states = `
  robot ended in ${robot_c.room}
  toys in kitchen include [${toys_in_room["kitchen"].toString()}]
  toys in bedroom include [${toys_in_room["bedroom"].toString()}]
  toys in playroom include [${toys_in_room["playroom"].toString()}]
  `;

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
  console.log("room", ROBOT_ROOM);
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  toys = randomizeToys();

  SAVE_TOYS = toys.toString();

  const bear_elt = document.getElementById("bear");
  const car_elt = document.getElementById("car");
  const duck_elt = document.getElementById("duck");

  if (toys.includes(bear)) {
    bear_elt.style.display = "block";
    bear_elt.style.left = "80px";
    bear_elt.style.bottom = "90px";
    let bear_coors = rooms[BEAR_ROOM];
    bear = new Thing(BEAR_ROOM, 80, 90, "bear");
  } else {
    bear_elt.style.display = "none";
  }

  if (toys.includes(car)) {
    car_elt.style.display = "block";
    car_elt.style.left = "100px";
    car_elt.style.bottom = "90px";
    car = new Thing(CAR_ROOM, 100, 90, "car");
  } else {
    car_elt.style.display = "none";
  }

  if (toys.includes(duck)) {
    duck_elt.style.display = "block";
    duck_elt.style.left = "120px";
    duck_elt.style.bottom = "90px";
    duck = new Thing(DUCK_ROOM, 120, 90, "duck");
  } else {
    duck_elt.style.display = "none";
  }

  toys_in_room = { kitchen: toys, playroom: [], bedroom: [] };

  return "";
}
