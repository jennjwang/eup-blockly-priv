console.log("in task 3");

ROBOT_ROOM = "bedroom";
BEAR_ROOM = "kichen";
DUCK_ROOM = "kichen";
CAR_ROOM = "kichen";

robot_c = new Robot(ROBOT_ROOM);
bear = new Toy(BEAR_ROOM, 80, 90, "bear");
car = new Toy(CAR_ROOM, 100, 90, "car");
duck = new Toy(DUCK_ROOM, 120, 90, "duck");

toys_in_room = { kitchen: [], playroom: [], bedroom: [] };

end_states = "";
start_states = "";

function randomizeToys() {
  let toys = [bear, car, duck];
  i = Math.floor(Math.random() * 2) + 2;
  console.log(i);
  return toys.slice(0, i);
}

let toys = randomizeToys();

let SAVE_TOYS = toys.toString();

toys_in_room = { kitchen: toys, playroom: [], bedroom: [] };

// console.log("toys", toys);

function resetLocs(key_id, key_task, key_format, iteration) {
  start_states = `robot started in ${ROBOT_ROOM},toys in kitchen include [${SAVE_TOYS}]`;

  // console.log(toys_in_room["kitchen"]);

  end_states = `robot ended in ${
    robot_c.room
  },toys in kitchen include [${toys_in_room[
    "kitchen"
  ].toString()}],toys in bedroom include [${toys_in_room[
    "bedroom"
  ].toString()}],toys in playroom include [${toys_in_room[
    "playroom"
  ].toString()}]`;

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

  jsonData.push(data);

  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;
  ROBOT_ROOM = randomRoomWithoutKitchen();

  dst = rooms[ROBOT_ROOM];
  console.log("room", ROBOT_ROOM);
  robot_c = new Robot(ROBOT_ROOM);

  toys = randomizeToys();

  SAVE_TOYS = toys.toString();

  toys_in_room = { kitchen: toys, playroom: [], bedroom: [] };

  return "";
}
