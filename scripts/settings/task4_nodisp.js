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

let ROBOT_ROOM = randomRoomWithoutKitchen();
let PERSON_ROOM = randomRoom();
let COFFEE_ROOM = "kitchen";
let coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

while (PERSON_ROOM === ROBOT_ROOM) {
  PERSON_ROOM = randomRoomWithoutKitchen();
}

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [coffee], playroom: [], bedroom: [], porch: [] };

function resetLocs(key_id, key_task, key_format, iteration) {
  end_states = `robot ended in ${robot_c.room}
  person ended in ${person.room}
  coffee ended in ${coffee.room}`;

  start_states = `robot started in ${ROBOT_ROOM}
  person started in ${PERSON_ROOM}`;

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

  robot_c = new Robot(ROBOT_ROOM);

  PERSON_ROOM = randomRoomWithoutKitchen();
  while (PERSON_ROOM === ROBOT_ROOM) {
    PERSON_ROOM = randomRoomWithoutKitchen();
  }
  // PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);

  coffee = new Thing(COFFEE_ROOM, 100, 90, "coffee");

  toys_in_room = { kitchen: [coffee], playroom: [], bedroom: [], porch: [] };

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
