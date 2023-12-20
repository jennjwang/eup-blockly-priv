let ROBOT_ROOM = "kitchen";
let PERSON_ROOM = "bedroom";

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };

function resetLocs(
  key_id,
  key_task,
  key_format,
  iteration,
  same_room,
  kitchen_room,
  count
) {
  end_states = `robot ended in ${robot_c.room},person ended in ${person.room},the times that robot was in the kitchen is ${kitchen_room}, the times that robot and person were in the same room is ${same_room},the number of timesteps is ${count}`;

  start_states = `robot started in ${ROBOT_ROOM},person started in ${PERSON_ROOM}`;

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
  clearInterval(interval);

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  ROBOT_ROOM = randomRoomWithoutKitchen();
  robot_c = new Robot(ROBOT_ROOM);

  PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);

  return "";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let interval;

function movePersonHelper() {
  let temp_rooms = ["kitchen", "bedroom", "playroom", "porch"];
  const index = temp_rooms.indexOf(person.room);
  if (index > -1) {
    temp_rooms.splice(index, 1); // 2nd parameter means remove one item only
  }
  shuffleArray(temp_rooms);
  i = Math.floor(Math.random() * 2);
  dst = rooms[temp_rooms[i]];

  console.log("person is now in", temp_rooms[i]);
  console.log("person room", person.room);
  console.log("robot room", robot_c.room);
  person.setRoom(temp_rooms[i]);
}

function movePerson() {
  if (person.room != robot_c.room) {
    movePersonHelper();
  }
}

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
