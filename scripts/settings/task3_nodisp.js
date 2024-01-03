console.log("in task 3");

ROBOT_ROOM = "bedroom";
BEAR_ROOM = "kitchen";
DUCK_ROOM = "kitchen";
CAR_ROOM = "kitchen";

robot_c = new Robot(ROBOT_ROOM);
bear = new Thing("kitchen", 80, 90, "bear");
car = new Thing("kitchen", 100, 90, "car");
toy4 = new Thing("kitchen", 100, 90, "toy4");
duck = new Thing("kitchen", 120, 90, "duck");

console.log(bear.room);

toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };

console.log(toys_in_room);

end_states = "";
start_states = "";

function randomizeToys() {
  let toys = [bear, car, duck, toy4];
  i = Math.floor(Math.random() * 3) + 2;
  // console.log(i);
  return toys.slice(0, i);
}

console.log(toys_in_room);

let toys = randomizeToys();
console.log("TOY SELECTED", toys.toString());
console.log(bear.room);
console.log(toys);
console.log(toys[0].room);

toys_in_room = { kitchen: toys, playroom: [], bedroom: [], porch: [] };

let SAVE_TOYS = toys_in_room["kitchen"].toString();
console.log(toys_in_room);

console.log("toys START", toys_in_room);

function resetLocs(key_id, key_task, key_format, iteration) {
  start_states = `robot started in ${ROBOT_ROOM},toys in kitchen include [${SAVE_TOYS}]`;

  // console.log(toys_in_room["kitchen"]);

  end_states = `robot ended in ${
    robot_c.room
  },toys in kitchen include [${toys_in_room["kitchen"].toString()}]`;

  console.log("DONE", toys_in_room);
  console.log(end_states);
  console.log(start_states);

  const data = {
    id: key_id,
    format: key_format,
    task: key_task,
    iteration: iteration,
    start_state: start_states,
    end_state: end_states,
  };

  console.log(data);

  jsonData.push(data);

  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;
  bear = new Thing("kitchen", 80, 90, "bear");
  car = new Thing("kitchen", 100, 90, "car");
  toy4 = new Thing("kitchen", 100, 90, "toy4");
  duck = new Thing("kitchen", 120, 90, "duck");
  ROBOT_ROOM = randomRoomWithoutKitchen();

  dst = rooms[ROBOT_ROOM];
  console.log("room", ROBOT_ROOM);
  robot_c = new Robot(ROBOT_ROOM);

  toys = randomizeToys();

  SAVE_TOYS = toys.toString();

  toys_in_room = { kitchen: toys, playroom: [], bedroom: [], porch: [] };

  return "";
}
