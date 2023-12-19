function brandomRoom(rooms) {
  // let rooms = ["kitchen", "bedroom"];
  i = Math.floor(Math.random() * rooms.length);
  // console.log(rooms[i]);
  return rooms[i];
}

BEAR_ROOM = brandomRoom(["kitchen", "bedroom"]);
console.log("in task 2");

if (BEAR_ROOM == "kitchen") {
  ROBOT_ROOM = brandomRoom(["bedroom", "playroom"]);
} else {
  ROBOT_ROOM = brandomRoom(["kitchen", "playroom"]);
}
console.log("bear is in", BEAR_ROOM);
// console.log("robot is in", ROBOT_ROOM);

robot_c = new Robot(ROBOT_ROOM);
toy_dst = rooms[BEAR_ROOM];

end_states = "";
start_states = "";

bear = new Toy(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
toys_in_room = { kitchen: [], playroom: [], bedroom: [] };
toys_in_room[BEAR_ROOM] = [bear];

function resetLocs(key_id, key_task, key_format, iteration) {
  // console.log("bear is in", BEAR_ROOM);
  // console.log("robot is in", ROBOT_ROOM);

  end_states = `robot ended in ${robot_c.room},toy ended in ${bear.room}`;

  start_states = `robot started in ${ROBOT_ROOM},toy started in ${BEAR_ROOM}`;

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

  BEAR_ROOM = brandomRoom(["kitchen", "bedroom"]);
  let toy_dst = rooms[BEAR_ROOM];
  bear = new Toy(BEAR_ROOM, toy_dst[0], toy_dst[1], "bear");
  toys_in_room = { kitchen: [], playroom: [], bedroom: [] };
  toys_in_room[BEAR_ROOM] = [bear];
  // console.log(toys_in_room);

  if (BEAR_ROOM == "kitchen") {
    ROBOT_ROOM = brandomRoom(["bedroom", "playroom"]);
  } else {
    ROBOT_ROOM = brandomRoom(["kitchen", "playroom"]);
  }

  robot_c = new Robot(ROBOT_ROOM);
  return "";
}

function isSameRoom(room) {
  return robot_c.room == room;
}
