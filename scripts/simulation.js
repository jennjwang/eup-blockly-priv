class Robot {
  constructor() {
    this.room = "kitchen";
  }

  setRoom(room) {
    this.room = room;
  }

  isRobotinRoom(room) {
    return this.room == room;
  }
}

const robot_c = new Robot();

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [200, 600];

function moveRobotTo(coor) {
  const robot = document.getElementById("robot");

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

  const goal_x = coor[0];
  const goal_y = coor[1];

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

function isRobotAtCoor(coor) {
  const robot = document.getElementById("robot");
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

  const goal_x = coor[0];
  const goal_y = coor[1];

  return robot_x == goal_x && robot_y == goal_y;
}

// async function test() {
//   // moveRobotToRoom("kitchen");
//   // await resolveAfter3Seconds();
//   moveRobotToRoom("bedroom");
//   await resolveAfter3Seconds();
//   // console.log(1);
//   moveRobotToRoom("kitchen");
//   // await resolveAfter3Seconds();
//   // moveRobotToRoom("playroom");
//   // await resolveAfter4Seconds();
//   // console.log(2);
// }

// // setTimeout(() => {
// //   moveRobotTo(BEDROOM);
// // }, 4000);
// // setTimeout(() => {
// //   moveRobotTo(BEDROOM);
// // }, 8000);

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1 + 4);
    }, 3000);
  });
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
  console.log(robot_c.room);
  switch (room) {
    case "kitchen":
      moveRobotTo(KITCHEN);
      break;
    case "bedroom":
      moveRobotTo(BEDROOM);
      break;
    case "playroom":
      moveRobotTo(PLAYROOM);
      break;
  }
}

// test();
