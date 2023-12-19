let ROBOT_ROOM = "bedroom";

let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

let toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [] };

function resetLocs(key_id, key_task, key_format, iteration) {
  end_states = `robot ended in ${robot_c.room}`;

  start_states = `robot started in ${ROBOT_ROOM}`;

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
  return "";
}

let interval;
