function pick_up_toy() {
  let room = robot_c.room;
  if (toys_in_room[room].length != 0 && robot_c.handsFree) {
    let toys = toys_in_room[room];
    holding = toys.pop();
    x = holding.width;
    y = holding.height;
    robot_c.holding = holding;
    console.log("going to", [x, y]);
    // moveRobotTo("robot", [x, y]);
    console.log("picked up", robot_c.holding.id);
    robot_c.handsPrev = true;
    robot_c.handsFree = false;
  }
}

function drop_toy() {
  if (!robot_c.handsFree) {
    let room = robot_c.room;
    console.log("dropped toy");
    robot_c.handsPrev = false;
    robot_c.handsFree = true;
    toys_in_room[room].push(robot_c.holding);
    robot_c.holding.room = room;
    robot_c.holding = null;
  }
}

// HELPER id - robot, bear, car, duck, person
/**
 * move any object to a goal coordinate
 * @param {*} id - possible id (robot, bear, car, duck, person)
 * @param {*} coor
 */
function moveRobotTo(id, coor) {
  let goal_x = coor[0];
  let goal_y = coor[1];

  console.log("moving");

  let robot = document.getElementById(id);

  let robot_x = robot.style.width;

  if (robot.style.width == "") {
    robot_x = 0;
  }

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

  var id = null;

  clearInterval(id);
  id = setInterval(moveX, 0);
  pidList.push(id);

  function moveX() {
    if (robot_x == goal_x) {
      console.log("y");
      clearInterval(id);
      id = setInterval(moveY, 0);
      pidList.push(id);
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

function handsFull() {
  console.log("handsPrev", robot_c.handsPrev);
  console.log("handsFree", robot_c.handsFree);
  if (robot_c.handsFree == robot_c.handsPrev) {
    return false;
  }
  if (robot_c.handsPrev) {
    robot_c.handsPrev = robot_c.handsFree;
    return true;
  }
  return false;
}

function handsFree() {
  console.log("handsPrev", robot_c.handsPrev);
  console.log("handsFree", robot_c.handsFree);
  if (robot_c.handsFree == robot_c.handsPrev) {
    console.log("hand not free");
    return false;
  }
  if (robot_c.handsFree) {
    robot_c.handsPrev = robot_c.handsFree;
  }
  return robot_c.handsFree;
}

function eHandsFree() {
  return robot_c.handsFree;
}

function toy_in_room() {
  // console.log("robot is in", robot_c.room);
  // console.log(toys_in_room);
  // console.log("toy in room", toys_in_room[robot_c.room].length != 0);
  return toys_in_room[robot_c.room].length != 0;
}

function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1 + 4);
    }, 3000);
  });
}

function isPersoninRoom() {
  // console.log("person: " + person.prev == person.room);
  // console.log(person.prev);
  // console.log(person.room);

  if (person.prev == person.room) {
    // console.log("not in room");
    return false; // robot entered person's room
  }

  // console.log(robot_c.room);
  console.log(person.isPersoninRoom(robot_c.room));
  return person.isPersoninRoom(robot_c.room);
}

function isPersoninRoomEvent() {
  return person.isPersoninRoom(robot_c.room);
}

// HELPER
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function moveRobotToRandomRoom() {
  let temp_rooms = ["kitchen", "bedroom", "playroom"];
  shuffleArray(temp_rooms);
  let i = Math.floor(Math.random() * 3);
  moveRobotToRoom(temp_rooms[i]);
}

function isRobotinRoom(room) {
  console.log("curr", robot_c.room);
  console.log("prev", robot_c.prev);
  console.log("room", room);
  // console.log("prev==room", robot_c.room === robot_c.prev);
  // console.log(robot_c.room === room);
  if (robot_c.prev === robot_c.room) {
    console.log("robot has not arrived at room", room);
    return false;
  }
  if (robot_c.room == room) {
    console.log("robot has arrived at room", room);
    robot_c.prev = robot_c.room;
  }
  return robot_c.room == room;
}

function isRobotinRoomEvent(room) {
  return robot_c.room == room;
}

// condition - isRobotOut
function isRobotOutOf(room) {
  if (robot_c.prev == robot_c.room) {
    return false;
  }
  return robot_c.prev == room;
}

// HELPER
function resolveAfter3Seconds() {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      resolve(1 + 4);
    }, 2500);
    pidList.push(id);
  });
}

// room - kitchen, bedroom, playroom
function moveRobotToRoom(room) {
  dst = rooms[room];

  if (robot_c.room == room) {
    x = dst[0];
    y = dst[1];
    moveRobotTo("robot", [x, y + 20]);
    setTimeout(() => {
      moveRobotTo("robot", dst);
    }, 400);
  }

  robot_c.setRoom(room);

  console.log("holding", robot_c.holding);

  if (!robot_c.handsFree) {
    robot_c.holding.room = room;
  }

  moveRobotTo("robot", dst);

  if (!robot_c.handsFree) {
    moveRobotTo(robot_c.holding.id, dst);
  }
}

let prev_room = null;
let counter = 0;

function inSameRoom() {
  room = robot_c.room;
  if (prev_room != room) {
    prev_room = room;
    counter = 0;
  }
  counter += 1;
  return counter > 3;
}
