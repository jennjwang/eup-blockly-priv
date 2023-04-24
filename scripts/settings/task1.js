let ROBOT_ROOM = "kitchen";
let PERSON_ROOM = "bedroom";

let pidList = [];
let robot_c = new Robot(ROBOT_ROOM);
let person = new Person(PERSON_ROOM);

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

let toys_in_room = { kitchen: [], playroom: [], bedroom: [] };

function resetLocs() {
  robot_c.start = true;
  prev_room = null;
  counter = 0;
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoom();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const person_elt = document.getElementById("person");
  // PERSON_ROOM = randomRoom();
  PERSON_ROOM = "kitchen";
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);
  let x = dst[0] + 100;
  person_elt.style.left = x + "px";
  person_elt.style.bottom = dst[1] + "px";
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

let interval;

function movePersonHelper() {
  let temp_rooms = ["kitchen", "bedroom", "playroom"];
  const index = temp_rooms.indexOf(person.room);
  if (index > -1) {
    temp_rooms.splice(index, 1); // 2nd parameter means remove one item only
  }
  shuffleArray(temp_rooms);
  i = Math.floor(Math.random() * 2);
  dst = rooms[temp_rooms[i]];
  x = dst[0];
  y = dst[1];
  if (person.room == "playroom" && temp_rooms[i] == "bedroom") {
    x += 100;
  }
  if (person.room == "kitchen" && temp_rooms[i] == "bedroom") {
    x -= 170;
  }
  moveRobotTo("person", [x + 70, y]);
  person.setRoom(temp_rooms[i]);
}

function movePerson() {
  clearInterval(interval);
  interval = setInterval(function () {
    // if (person.room != robot_c.room) {
    movePersonHelper();
    // }
  }, 4000);
}

document.querySelector("#runButton").addEventListener("click", movePerson);

document.querySelector("#stopButton").addEventListener("click", () => {
  clearInterval(interval);
});
