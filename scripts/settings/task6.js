function randomRoomWithoutPorch() {
  let rooms = ["bedroom", "playroom", "kitchen"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let ROBOT_ROOM = randomRoomWithoutPorch();

let pidList = [];
let mail = new Thing("porch", 40, 320, "mail");
let mail2 = new Thing("porch", 50, 320, "mail2");
let mail3 = new Thing("porch", 30, 320, "mail3");
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

let toys_in_room = {
  kitchen: [],
  playroom: [],
  bedroom: [],
  porch: [mail, mail2, mail3],
};

function resetLocs() {
  start_states = `
      robot started in ${ROBOT_ROOM}`;

  end_states = `
      robot ended in ${robot_c.room}
      items on the porch include [${toys_in_room["kitchen"].toString()}]
      `;

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

  const mail_elt = document.getElementById("mail");
  const mail2_elt = document.getElementById("mail2");
  const mail3_elt = document.getElementById("mail3");

  mail = new Thing("porch", 40, 320, "mail");
  mail2 = new Thing("porch", 50, 320, "mail2");
  mail3 = new Thing("porch", 30, 320, "mail3");

  mail_elt.style.display = "block";
  mail_elt.style.left = "40px";
  mail_elt.style.bottom = "320px";
  // mail2.style.display = "block";
  mail2_elt.style.left = "50px";
  mail2_elt.style.bottom = "320px";
  // mail3.style.display = "block";
  mail3_elt.style.left = "30px";
  mail3_elt.style.bottom = "320px";

  toys_in_room = {
    kitchen: [],
    playroom: [],
    bedroom: [],
    porch: [mail, mail2, mail3],
  };
  return "";
}
