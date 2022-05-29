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
  const robot = document.getElementById("robot");
  ROBOT_ROOM = randomRoom();
  dst = rooms[ROBOT_ROOM];
  robot.style.left = dst[0] + "px";
  robot.style.bottom = dst[1] + "px";
  robot_c = new Robot(ROBOT_ROOM);

  const person_elt = document.getElementById("person");
  PERSON_ROOM = randomRoom();
  dst = rooms[PERSON_ROOM];
  person = new Person(PERSON_ROOM);
  person.setRoom(PERSON_ROOM);
  let x = dst[0] + 100;
  person_elt.style.left = x + "px";
  person_elt.style.bottom = dst[1] + "px";
  // console.log(person_elt.style.width);
}

// let interval;

// function movePerson() {
//   interval = setInterval(function () {
//     let temp_rooms = ["kitchen", "bedroom", "playroom"];
//     i = Math.floor(Math.random() * 3);
//     console.log(temp_rooms[i]);
//     moveRobotTo("person", temp_rooms[i]);
//     person.setRoom(temp_rooms[i]);
//   }, 3000);
// }

// document.querySelector("#runButton").addEventListener("click", movePerson);

// document.querySelector("#stopButton").addEventListener("click", () => {
//   clearInterval(interval);
// });
