class Robot {
  constructor() {
    this.room = "kitchen";
    this.handsFree = true;
    this.holding = null;
  }

  setRoom(room) {
    this.room = room;
  }

  isRobotinRoom(room) {
    return this.room == room;
  }
}

class Toy {
  constructor(width, height, id) {
    this.room = "playroom";
    this.width = width;
    this.height = height;
    this.id = id;
  }
  setRoom(room) {
    this.room = room;
  }
}

let pidList = [];
let robot_c = new Robot();
let bear = new Toy(450, 200, "bear");
let duck = new Toy(570, 200, "duck");
let car = new Toy(500, 200, "car");

const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [220, 600];

let toys_in_room = { kitchen: [], playroom: [bear, duck, car], bedroom: [] };

function pick_up_toy() {
  room = robot_c.room;
  if (toys_in_room[room].length != 0 && robot_c.handsFree) {
    toys = toys_in_room[room];
    holding = toys.pop();
    x = holding.width;
    y = holding.height;
    robot_c.holding = holding;
    console.log("going to", [x, y]);
    // moveRobotTo("robot", [x, y]);
    console.log("picked up", robot_c.holding.id);
    robot_c.handsFree = false;
  }
}

function drop_toy() {
  if (!robot_c.handsFree) {
    room = robot_c.room;
    // offset = toys_in_room[room].length;
    // x = robot_c.holding.width - offset * 70;
    // y = robot_c.holding.height;
    // console.log("going to", [x, y]);
    // moveRobotTo("robot", [x, y]);
    // moveRobotTo(robot_c.holding.id, [x, y]);
    robot_c.handsFree = true;
    toys_in_room[room].push(robot_c.holding);
    // console.log(offset);
    // robot_c.holding.width = x;
    // robot_c.holding.height = y;
    robot_c.holding.room = room;
    robot_c.holding = null;
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

  // console.log("goal", coor);
  var id = null;

  clearInterval(id);
  id = setInterval(moveX, 0);
  // id = setTimeout(moveX, 1000);

  function moveX() {
    if (robot_x == goal_x) {
      // console.log("y");
      clearInterval(id);
      id = setInterval(moveY, 0);
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
  console.log("robot is in", robot_c.room);
  console.log("toy in room", toys_in_room[robot_c.room].length != 0);
  return toys_in_room[robot_c.room].length != 0;
}

// function moveRobotToRandomRoom() {
//   rooms = ["kitchen", "bedroom", "playroom"];
//   i = Math.floor(Math.random() * 3);
//   moveRobotToRoom(rooms[i]);
//   robot_c.setRoom(rooms[i]);
// }

function isRobotinRoom(room) {
  // console.log(robot_c.room);
  return robot_c.isRobotinRoom(room);
}

function isRobotOutOf(room) {
  return !robot_c.isRobotinRoom(room);
}

const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };

function resolveAfter3Seconds() {
  // var abortSignal = false;;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1 + 4);
    }, 3000);
  });
}

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
  // console.log(robot_c.room);

  moveRobotTo("robot", dst);

  if (!robot_c.handsFree) {
    moveRobotTo(robot_c.holding.id, dst);
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
