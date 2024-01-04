function randomRoomWithoutPorch() {
  let rooms = ["bedroom", "playroom", "kitchen"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let ROBOT_ROOM = randomRoomWithoutPorch();

// let pidList = [];
let mail = new Thing("porch", 40, 320, "mail");
let mail2 = new Thing("porch", 50, 320, "mail2");
let mail3 = new Thing("porch", 30, 320, "mail3");
let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = {
  kitchen: [],
  playroom: [],
  bedroom: [],
  porch: [mail, mail2, mail3],
};

console.log(toys_in_room);

function resetLocs(key_id, key_task, key_format, iteration) {
  start_states = `robot started in ${ROBOT_ROOM}`;

  end_states = `robot ended in ${robot_c.room}
      items on the porch include [${toys_in_room["porch"].toString()}]`;

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

  mail = new Thing("porch", 40, 320, "mail");
  mail2 = new Thing("porch", 50, 320, "mail2");
  mail3 = new Thing("porch", 30, 320, "mail3");

  toys_in_room = {
    kitchen: [],
    playroom: [],
    bedroom: [],
    porch: [mail, mail2, mail3],
  };
  return "";
}
