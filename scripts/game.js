// const toys = ["bear", "duck", "car", "toy4"];

function pick_up_toy() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  console.log("picking up toy");
  const toys = ["bear", "duck", "car", "toy4"];
  for (var toy of toys) {
    // console.log(toy);
    if (robot_c.handsFree && is_thing_in_room(toy, robot_c.room)) {
      console.log(toy);
      pick_up_thing(toy);
      return;
    }
  }
}

function drop_toy() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (robot_c.handsFree) {
    return;
  }
  const toys = ["bear", "duck", "car", "toy4"];
  for (var toy of toys) {
    if (robot_c.holding.id == toy) {
      drop_thing(toy);
      console.log("dropped", toy.id);
      return;
    }
  }
}

// HELPER id - robot, bear, car, duck, person
/**
 * move any object to a goal coordinate
 * @param {*} id - possible id (robot, bear, car, duck, person)
 * @param {*} coor
 */
function moveThing(id, coor) {
  if (robot_c.start) {
    robot_c.start = false;
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
  // 'hands became full'
  // console.log("handsPrev", robot_c.handsPrev);
  // console.log("handsFree", robot_c.handsFree);
  if (robot_c.start) {
    return false;
  }

  if (robot_c.handsFree == robot_c.handsPrev) {
    return false;
  }
  return robot_c.handsPrev;
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

  // if (robot_c.handsFree) {
  //   robot_c.handsPrev = robot_c.handsFree;
  // }
  return robot_c.handsFree;
}

function eHandsFree() {
  console.log("hands are ", robot_c.handsFree);
  return robot_c.handsFree;
}

function start() {
  console.log("started?", robot_c.start);
  return robot_c.start;
}

function eHandsFull() {
  return !robot_c.handsFree;
}

function toy_in_room() {
  return is_toy_in_room(robot_c.room);
  // console.log("robot is in", robot_c.room);
  // console.log(toys_in_room);
  // console.log("toy in room", toys_in_room[robot_c.room].length != 0);
  // let toy_in_room_check = toys_in_room[robot_c.room].length != 0;
  // if (!robot_c.handsFree) {
  //   // console.log(
  //   //   "toy is in room: ",
  //   //   toy_in_room_check || robot_c.holding.room == robot_c.room
  //   // );
  //   return toy_in_room_check || robot_c.holding.room == robot_c.room;
  // } else {
  //   // console.log("toy is in room: ", toy_in_room_check);
  //   return toy_in_room_check;
  // }
}

function toy_not_in_room() {
  console.log("toys", toys_in_room);
  console.log("# of toys in room", toys_in_room[robot_c.room].length);
  return !toy_in_room(); //toys_in_room[robot_c.room].length == 0;
}

function is_toy_in_room(room) {
  const toys = ["bear", "duck", "car", "toy4"];
  for (var toy of toys) {
    if (is_thing_in_room(toy, room)) {
      console.log("toy is in room");
      return true;
    }
  }
  return false;
}

function is_coffee_in_room(room) {
  let id = "coffee";
  // console.log(is_thing_in_room(id, room));
  return is_thing_in_room(id, room);
}

function is_mail_in_room(room) {
  // let id = "mail";
  if (is_thing_in_room("mail", room)) {
    console.log("returning true");
    return true;
  }
  return false;
  // console.log(is_thing_in_room(id, room));
  // return is_thing_in_room(id, room);
}

function coffee_in_room() {
  return is_coffee_in_room(robot_c.room);
}

function mail_in_room() {
  return is_mail_in_room(robot_c.room);
}

function is_thing_in_room(id, room) {
  let toy_in_room_check = toys_in_room[room].length != 0;
  if (robot_c.handsFull) {
    // console.log("hands full");
    return robot_c.holding.id.includes(id);
  } else if (toy_in_room_check) {
    // console.log("things in room");
    let objs = toys_in_room[room];
    // we know there's only one coffee and once piece of mail
    let containsObj = objs.some((obj) => obj.id.includes(id));
    // console.log(containsObj);
    return containsObj;
  }
  // console.log("else");
  return false;
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
  let temp_rooms = ["kitchen", "bedroom", "playroom", "porch"];
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
  if (robot_c.prev === robot_c.room) {
    return false;
  }
  return robot_c.room == room;
}

function isRobotinAnyRoom() {
  if (robot_c.start) {
    return false;
  }
  if (robot_c.prev === robot_c.room) {
    return false;
  }
  console.log("arrived in any room");
  return true;
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
  let delay = 2000;
  // let condition = url.searchParams.get("format");
  // if (condition == "SEQ" || condition == "TAP") {
  //   delay = 2500;
  // }

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
  robot_c.handsPrev = robot_c.handsFree;

  if (robot_c.room == room) {
    x = dst[0];
    y = dst[1];
    moveThing("robot", [x, y + 20]);
    setTimeout(() => {
      moveThing("robot", dst);
    }, 100);
  }

  robot_c.setRoom(room);

  // console.log("holding", robot_c.holding);

  if (!robot_c.handsFree) {
    const indexToRemove = toys_in_room[robot_c.holding.room].findIndex(
      (toy) => toy.id === robot_c.holding.id
    );
    if (indexToRemove !== -1) {
      // Use splice to remove the object from the array
      const toy = toys_in_room[robot_c.holding.room].splice(
        indexToRemove,
        1
      )[0];
      console.log("popped toy", toy);
      robot_c.holding.room = room;
      toys_in_room[room].push(toy);
      console.log("moved with toy", toys_in_room);
    } else {
      console.log("there's no toy here");
    }
    // console.log(robot_c.holding);
    // console.log("toys", toys_in_room);
  }

  moveThing("robot", dst);

  if (!robot_c.handsFree) {
    const toy_dst = [dst[0], dst[1] + 10];
    console.log("moving", robot_c.holding.id);
    moveThing(robot_c.holding.id, toy_dst);
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

function as_many_toys() {
  let numb_toys_in_room = toys_in_room[robot_c.room].length;
  let max_toys = 0;

  for (const room in toys_in_room) {
    if (toys_in_room[room].length > max_toys) {
      max_toys = toys_in_room[room].length;
    }
  }
  return max_toys == numb_toys_in_room;
}

function thing_in_room(id) {
  let toy_in_room_check = toys_in_room[robot_c.room].length != 0;

  if (robot_c.handsFull) {
    return robot_c.holding.id.includes(id);
  } else if (toy_in_room_check) {
    let objs = toys_in_room[robot_c.room];
    // we know there's only one coffee and once piece of mail
    let containsObj = objs.some((obj) => obj.id.includes(id));
    return containsObj;
  }
  return false;
}

function thing_not_in_room(id) {
  console.log("toys", toys_in_room);
  console.log("# of toys in room", toys_in_room[robot_c.room].length);
  return !thing_in_room(id); //toys_in_room[robot_c.room].length == 0;
}

function pick_up_any() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (!robot_c.handsFree) {
    console.log("hands already full");
    return;
  }
  console.log("picking up any!");
  let room = robot_c.room;
  robot_c.prev = robot_c.room;
  if (toys_in_room[room].length != 0 && robot_c.handsFree) {
    toys_in_room[room] = toys_in_room[room].sort(() => Math.random() - 0.5);
    holding = toys_in_room[room].pop();
    toys_in_room[room].push(holding);
    console.log("toys", toys_in_room);
    x = holding.width;
    y = holding.height;
    robot_c.holding = holding;
    console.log("picked up", robot_c.holding.id);
    robot_c.handsPrev = true;
    robot_c.handsFree = false;
    // console.log("hands are free?", robot_c.handsFree);
    const dst = [rooms[room][0], rooms[room][1] + 10];
    console.log(dst);
    setTimeout(() => {
      if (robot_c.holding) {
        moveThing(robot_c.holding.id, dst);
      }
    }, 1500);
  }
}

function pick_up_thing(id) {
  if (id in ["bear", "duck", "car", "toy4"]) {
    pick_up_toy();
    return;
  }
  console.log("pick up thing");
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (!robot_c.handsFree) {
    console.log("hands already full");
    return;
  }
  let room = robot_c.room;
  robot_c.prev = robot_c.room;
  if (toys_in_room[room].length != 0 && robot_c.handsFree) {
    let objs = toys_in_room[room];
    let containsObj = objs.some((obj) => obj.id.includes(id));
    if (!containsObj) {
      console.log("couldn't find", id);
      return;
    }
    let obj = objs.find((obj) => obj.id.includes(id));
    // holding = toys.pop();
    // console.log(room, "this room");
    obj.room = room;
    holding = obj;
    x = holding.width;
    y = holding.height;
    robot_c.holding = holding;
    console.log("picked up", robot_c.holding.id);
    robot_c.handsPrev = true;
    robot_c.handsFree = false;
    // console.log("hands are free?", robot_c.handsFree);
    const dst = [rooms[room][0], rooms[room][1] + 10];
    console.log(dst);
    setTimeout(() => {
      if (robot_c.holding) {
        moveThing(robot_c.holding.id, dst);
      }
    }, 1500);
  }
}

function drop_any() {
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (robot_c.handsFree) {
    return;
  }
  robot_c.prev = robot_c.room;
  let room = robot_c.room;
  console.log("dropped thing");

  robot_c.handsPrev = false;
  robot_c.handsFree = true;
  const id = robot_c.holding.id;

  const dst = rooms[room];
  // console.log("dropping off at", dst);
  moveThing(id, dst);
  // toys_in_room[room].push(robot_c.holding);

  robot_c.holding.room = room;
  robot_c.holding = null;
}

function drop_thing(id) {
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (robot_c.handsFree) {
    return;
  }
  robot_c.prev = robot_c.room;
  if (!robot_c.handsFree && robot_c.holding.id.includes(id)) {
    let room = robot_c.room;
    console.log("dropped thing");

    robot_c.handsPrev = false;
    robot_c.handsFree = true;
    const id = robot_c.holding.id;

    const dst = rooms[room];
    // console.log("dropping off at", dst);
    moveThing(id, dst);
    // toys_in_room[room].push(robot_c.holding);

    robot_c.holding.room = room;
    robot_c.holding = null;
  }
}

function drop_thing_disappears(id) {
  if (robot_c.start) {
    robot_c.start = false;
  }
  if (robot_c.handsFree) {
    return;
  }
  robot_c.prev = robot_c.room;
  if (!robot_c.handsFree && robot_c.holding.id.includes(id)) {
    let room = robot_c.room;
    console.log("dropped thing");

    robot_c.handsPrev = false;
    robot_c.handsFree = true;

    const indexToRemove = toys_in_room[robot_c.holding.room].findIndex(
      (toy) => toy.id === robot_c.holding.id
    );

    if (indexToRemove !== -1) {
      // Use splice to remove the object from the array
      toys_in_room[robot_c.holding.room].splice(indexToRemove, 1)[0];
    }

    console.log(toys_in_room);
    // const dst = rooms[room];
    // moveRobotTo(robot_c.holding.id, dst);
    // toys_in_room[room].push(robot_c.holding);

    robot_c.holding.room = room;
    robot_c.holding = null;
  }
}
