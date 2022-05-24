class Robot {
  constructor() {
    this.room = "kitchen";
    this.handsFree = true;
  }

  setRoom(room) {
    this.room = room;
  }

  isRobotinRoom(room) {
    return this.room == room;
  }
}

class Toy {
  constructor() {
    this.room = "playroom";
  }
  setRoom(room) {
    this.room = room;
  }
}

let robot_c = new Robot();
let toy = new Toy();

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [200, 600];

function pick_up_toy() {
  if (robot_c.isRobotinRoom(toy.room)) {
    robot_c.handsFree = false;
  }
}

function drop_toy() {
  if (!robot_c.handsFree) {
    robot_c.handsFree = true;
  }
}

function moveRobotTo(id, coor) {
  let goal_x = coor[0];
  let goal_y = coor[1];

  let robot = document.getElementById(id);

  let robot_x = robot.style.width;

  if (robot.style.right != "") {
    robot_x -= parseInt(robot.style.right);
  }
  if (robot.style.left != "") {
    robot_x += parseInt(robot.style.left);
  }

  let robot_y = robot.style.height;

  if (robot.style.top != "") {
    robot_y -= parseInt(robot.style.top);
  }
  if (robot.style.bottom != "") {
    robot_y += parseInt(robot.style.bottom);
  }

  // console.log("x", robot_x);
  // console.log("y", robot_y);

  console.log("goal", coor);
  var id = null;

  clearInterval(id);
  id = setInterval(moveX, 1);

  function moveX() {
    if (robot_x == goal_x) {
      // console.log("y");
      moveY();
    } else if (goal_x > robot_x) {
      robot_x++;
      robot.style.left = robot_x + "px";
    } else {
      robot_x--;
      robot.style.left = robot_x + "px";
    }
  }

  function moveY() {
    if (robot_y == goal_y) {
      clearInterval(id);
    } else if (goal_y > robot_y) {
      //   console.log("up");
      robot_y++;
      robot.style.bottom = robot_y + "px";
    } else {
      //   console.log("down");
      robot_y--;
      robot.style.bottom = robot_y + "px";
    }
    // console.log(robot.style);
  }
}

function handsFree() {
  return robot_c.handsFree;
}

function toy_in_room() {
  return robot_c.isRobotinRoom(toy.room);
}

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1 + 4);
    }, 3000);
  });
}
function isPersoninRoom(room) {
  console.log(person.room);
  return person.isPersoninRoom(room);
}
function isPersoninRoomwithRobot(room) {
  console.log(person.room);
  console.log(robot_c.room);
  return person.isPersoninRoomwithRobot(room);
}

function moveRobotToRandomRoom() {
  rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  moveRobotToRoom(rooms[i]);
  robot_c.setRoom(rooms[i]);
}

function isRobotinRoom(room) {
  console.log(robot_c.room);
  return robot_c.isRobotinRoom(room);
}

function isRobotOutOf(room) {
  return !robot_c.isRobotinRoom(room);
}

function moveRobotToRoom(room) {
  robot_c.setRoom(room);
  if (!robot_c.handsFree) {
    toy.setRoom(room);
  }
  console.log(robot_c.room);
  switch (room) {
    case "kitchen":
      moveRobotTo("robot", KITCHEN);
      if (!robot_c.handsFree) {
        moveRobotTo("toy", KITCHEN);
      }
      break;
    case "bedroom":
      moveRobotTo("robot", BEDROOM);
      if (!robot_c.handsFree) {
        moveRobotTo("toy", BEDROOM);
      }
      break;
    case "playroom":
      moveRobotTo("robot", PLAYROOM);
      if (!robot_c.handsFree) {
        moveRobotTo("toy", PLAYROOM);
      }
      break;
  }
}


// async function run() {
//   while (robot_c.handsFree) {
//     await resolveAfter3Seconds();
//     moveRobotToRandomRoom();
//     console.log(robot_c.isRobotinRoom(toy.room));
//     console.log("toy", toy.room);
//     console.log("robot", robot_c.room);
//     console.log(handsFree());
//     pick_up_toy();
//   }
// }
// run();
