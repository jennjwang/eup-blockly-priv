function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let ROBOT_ROOM = "playroom";
let COFFEE_ROOM = "bedroom";
let coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = {
  kitchen: [],
  playroom: [],
  bedroom: [coffee],
  porch: [],
};

function resetLocs(key_id, key_task, key_format, iteration) {
  end_states = `robot ended in ${robot_c.room}
  coffee ended in ${coffee.room}`;

  start_states = `robot started in ${ROBOT_ROOM}
  coffee started in ${coffee.room}`;

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

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  ROBOT_ROOM = "playroom";
  robot_c = new Robot(ROBOT_ROOM);

  coffee = new Thing(COFFEE_ROOM, 280, 320, "coffee");
  toys_in_room = {
    kitchen: [],
    playroom: [],
    bedroom: [coffee],
    porch: [],
  };

  return "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let interval;

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
