const display = false;

function start() {
  return robot_c.start;
}

function pick_up_toy() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  let room = robot_c.room;
  robot_c.prev = robot_c.room;
  if (toys_in_room[room].length != 0 && robot_c.handsFree) {
    let toys = toys_in_room[room];
    // holding = toys.pop();
    // console.log(room, "this room");
    toys[toys.length - 1].room = room;
    holding = toys[toys.length - 1];
    x = holding.width;
    y = holding.height;
    robot_c.holding = holding;
    console.log("picked up", robot_c.holding.id);
    robot_c.handsPrev = true;
    robot_c.handsFree = false;
    // console.log("hands are free?", robot_c.handsFree);
    const dst = [rooms[room][0], rooms[room][1] + 10];
    if (display) {
      setTimeout(() => {
        moveRobotTo(robot_c.holding.id, dst);
      }, 1000);
    } else {
      moveRobotTo(robot_c.holding.id, dst);
    }
  }
  changed = false;
}

function drop_toy() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  robot_c.prev = robot_c.room;
  if (!robot_c.handsFree) {
    let room = robot_c.room;
    // console.log("dropped toy");

    robot_c.handsPrev = false;
    robot_c.handsFree = true;

    const dst = rooms[room];
    moveRobotTo(robot_c.holding.id, dst);
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
  if (robot_c.start) {
    robot_c.start = false;
  }

  if (!display) {
    return;
  }

  let goal_x = coor[0];
  let goal_y = coor[1];

  // console.log("moving");

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
      // console.log("y");
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
  }
}

function handsFull() {
  // console.log("handsPrev", robot_c.handsPrev);
  // console.log("handsFree", robot_c.handsFree);

  if (robot_c.handsFree == robot_c.handsPrev) {
    return false;
  }
  if (robot_c.handsPrev) {
    robot_c.handsPrev = robot_c.handsFree;
    // console.log("hands are full");
    return true;
  }
  return false;
}

function handsFree() {
  // console.log("handsPrev", robot_c.handsPrev);
  // console.log("handsFree", robot_c.handsFree);
  // console.log("start", robot_c.start);
  if (robot_c.handsFree == robot_c.handsPrev) {
    // console.log("hand not free");
    return false;
  }

  if (robot_c.start) {
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

function eHandsFull() {
  return !robot_c.handsFree;
}

function toy_in_room() {
  // console.log("robot is in", robot_c.room);
  // console.log(toys_in_room);
  // console.log("toy in room", toys_in_room[robot_c.room].length != 0);
  // return toys_in_room[robot_c.room].length != 0;
  let toy_in_room_check = toys_in_room[robot_c.room].length != 0;
  if (!robot_c.handsFree) {
    // console.log(
    //   "toy is in room: ",
    //   toy_in_room_check || robot_c.holding.room == robot_c.room
    // );
    return toy_in_room_check || robot_c.holding.room == robot_c.room;
  } else {
    // console.log("toy is in room: ", toy_in_room_check);
    return toy_in_room_check;
  }
}

function toy_not_in_room() {
  // console.log("here");
  // console.log("# of toys in room", toys_in_room[robot_c.room].length);
  return !toy_in_room(); //toys_in_room[robot_c.room].length == 0;
}

function is_toy_in_room(room) {
  let toy_in_room_check = toys_in_room[room].length != 0;
  if (!robot_c.handsFree) {
    return toy_in_room_check || robot_c.holding.room == room;
  } else {
    return toy_in_room_check;
  }
  // return toy_in_room_check = toys_in_room[room].length != 0
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
  // console.log("person is in room", person.isPersoninRoom(robot_c.room));
  return person.isPersoninRoom(robot_c.room);
}

function isPersonInRoomEvent() {
  return person.isPersoninRoom(robot_c.room);
}

function isPersonNotInRoomEvent() {
  return !person.isPersoninRoom(robot_c.room);
}

// HELPER
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function moveRobotToRandomRoom() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  let temp_rooms = ["kitchen", "bedroom", "playroom"];
  shuffleArray(temp_rooms);
  temp_rooms.splice(temp_rooms.indexOf(robot_c.room), 1);
  // let i = Math.floor(Math.random() * 3);
  temp_rooms.push(robot_c.room);
  moveRobotToRoom(temp_rooms[0]);
}

function isRobotinRoom(room) {
  if (robot_c.start) {
    return false;
  }
  // console.log("curr", robot_c.room);
  // console.log("prev", robot_c.prev);
  // // console.log("room", room);
  // console.log("prev==curr", robot_c.room === robot_c.prev);
  // console.log("room==curr", robot_c.room === room);
  // if (robot_c.prev == null && robot_c.room == room) {
  //   return true;
  // }
  if (robot_c.prev === robot_c.room) {
    // console.log("robot has not arrived at room", room);
    return false;
  }
  // if (robot_c.room == room) {
  //   console.log("robot has arrived at room", room);
  //   // robot_c.prev = robot_c.room;
  //   return true;
  // }
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

function isRobotOutOfEvent(room) {
  return robot_c.room != room;
}

// HELPER
function resolveAfter3Seconds() {
  if (!display) {
    return;
    // console.log("running");
    // return new Promise((resolve) => {
    //   resolve(1 + 4);
    // });
  }
  let delay = 10;
  let condition = url.searchParams.get("format");
  if (condition == "SEQ" || condition == "TAP") {
    delay = 1500;
  }

  return new Promise((resolve) => {
    const id = setTimeout(() => {
      resolve(1 + 4);
    }, delay);
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
    if (display) {
      setTimeout(() => {
        moveRobotTo("robot", dst);
      }, 300);
    } else {
      moveRobotTo("robot", dst);
    }
  }

  robot_c.setRoom(room);

  if (!robot_c.handsFree) {
    toys_in_room[robot_c.holding.room].pop();
    robot_c.holding.room = room;
    // console.log(robot_c.holding);
    // console.log("toys", toys_in_room);
  }

  moveRobotTo("robot", dst);

  if (!robot_c.handsFree) {
    const toy_dst = [dst[0], dst[1] + 10];
    moveRobotTo(robot_c.holding.id, toy_dst);
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
