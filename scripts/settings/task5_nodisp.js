function randomRoomWithoutPorch() {
  let rooms = ["bedroom", "playroom", "kitchen"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let ROBOT_ROOM = randomRoomWithoutPorch();

let thing_id = "mail";
let thing = new Thing("porch", 40, 320, thing_id);

// let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [thing] };
console.log("START", toys_in_room);

function resetLocs(key_id, key_task, key_format, iteration) {
  // thing_id = ["coffee", "mail"][Math.floor(Math.random() * 2)];

  start_states = `robot started in ${ROBOT_ROOM}
  item on the porch is ${thing_id}`;

  // console.log(toys_in_room["kitchen"]);

  end_states = `robot ended in ${robot_c.room}
  items in kitchen include [${toys_in_room["kitchen"].toString()}]
  items in bedroom include [${toys_in_room["bedroom"].toString()}]`;

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

  ROBOT_ROOM = randomRoomWithoutPorch();
  robot_c = new Robot(ROBOT_ROOM);

  thing_id = ["coffee", "mail"][Math.floor(Math.random() * 2)];

  thing = new Thing("porch", 40, 320, id);
  toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [thing] };

  return "";
}
