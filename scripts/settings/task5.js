function randomRoomWithoutPorch() {
  let rooms = ["bedroom", "playroom", "kitchen"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let ROBOT_ROOM = randomRoomWithoutPorch();

id = "mail";
let thing = new Thing("porch", 40, 320, id);

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);

let end_states = "";
let start_states = "";

const KITCHEN = [80, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [280, 320];
const PORCH = [20, 320];
const rooms = {
  kitchen: KITCHEN,
  bedroom: BEDROOM,
  playroom: PLAYROOM,
  porch: PORCH,
};

let toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [thing] };

function resetLocs() {
  //   start_states = `
  //     robot started in ${ROBOT_ROOM}
  //     toys in porch include [${SAVE_TOYS}]`;

  //   console.log(toys_in_room["kitchen"]);

  //   end_states = `
  //     robot ended in ${robot_c.room}
  //     toys in kitchen include [${toys_in_room["kitchen"].toString()}]
  //     toys in bedroom include [${toys_in_room["bedroom"].toString()}]
  //     toys in playroom include [${toys_in_room["playroom"].toString()}]
  //     `;

  document.getElementById("start").innerHTML = start_states;
  document.getElementById("end").innerHTML = end_states;
  start_states = "";
  end_states = "";

  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoomWithoutPorch();

  dst = rooms[ROBOT_ROOM];
  console.log("room", ROBOT_ROOM);
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  if (id == "mail") {
    id = "coffee";
  } else {
    id = "mail";
  }

  const coffee = document.getElementById("coffee");
  const mail = document.getElementById("mail");

  if (id == "coffee") {
    coffee.style.display = "block";
    coffee.style.left = "40px";
    coffee.style.bottom = "320px";
    mail.style.display = "none";
  } else {
    mail.style.display = "block";
    mail.style.left = "40px";
    mail.style.bottom = "320px";
    coffee.style.display = "none";
  }

  thing = new Thing("porch", 40, 320, id);
  toys_in_room = { kitchen: [], playroom: [], bedroom: [], porch: [thing] };

  return "";
}
