console.log("in task 1");

let ROBOT_ROOM = "kitchen";
let PERSON_ROOM = "bedroom";

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };

function resetLocs(key_id, key_task, key_format, iteration, same_room, count) {
  // steps = [...new Set(steps)];
  // console.log(steps);

  // end_states = `robot ended in ${robot_c.room},person ended in ${person.room},
  // the times that robot and person were in the same room is ${same_room},
  // the number of timesteps is ${count}`;

  // start_states = `robot started in ${ROBOT_ROOM},person started in ${PERSON_ROOM}`;

  const data = {
    id: key_id,
    format: key_format,
    task: key_task,
    iteration: iteration,
    // start_state: start_states,
    end_state: steps,
  };

  console.log(data);

  jsonData.push(data);

  clearInterval(interval);

  start_states = "";
  end_states = "";
  steps = [];

  robot_c.start = true;
  prev_room = null;
  counter = 0;

  ROBOT_ROOM = randomRoomWithoutKitchen();
  dst = rooms[ROBOT_ROOM];

  robot_c = new Robot(ROBOT_ROOM);

  // const person_elt = document.getElementById("person");
  // PERSON_ROOM = randomRoom();
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
  let rand_room = temp_rooms[Math.floor(Math.random() * temp_rooms.length)];
  dst = rooms[rand_room];
  if (person.room != robot_c.room) {
    console.log(`robot in: ${robot_c.room}, person in: ${person.room}`);
    steps.push(`robot in: ${robot_c.room}, person in: ${person.room}`);
    person.setRoom(robot_c.room);
    steps.push(`robot in: ${robot_c.room}, person in: ${person.room}`);
  }
  // person.setRoom(rand_room);

  // let bool = Math.floor(Math.random() * 2);
  // if (bool == 1) {
  //   dst = rooms[robot_c.room];
  //   person.setRoom(robot_c.room);
  // } else {
  //   person.setRoom(rand_room);
  // }

  // console.log("person is now in", temp_rooms[i]);
  // console.log("person room", person.room);
  // console.log("robot room", robot_c.room);
}

function movePerson() {
  movePersonHelper();
}
