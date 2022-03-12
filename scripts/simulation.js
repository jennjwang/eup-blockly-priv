const KITCHEN = [120, 200];
const PLAYROOM = [450, 200];
const BEDROOM = [200, 600];

function moveRobotTo(coor) {
  const robot = document.getElementById("robot");

  //   console.log("right", robot.style.right == "");

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

  //   console.log("x", robot_x);
  //   console.log("y", robot_y);

  const goal_x = coor[0];
  const goal_y = coor[1];

  //   console.log("goal", coor);
  var id = null;

  clearInterval(id);
  id = setInterval(moveX, 1);

  function moveX() {
    if (robot_x == goal_x) {
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
  }
}

moveRobotTo(BEDROOM);
setTimeout(() => {
  moveRobotTo(PLAYROOM);
}, 4000);
setTimeout(() => {
  moveRobotTo(KITCHEN);
}, 8000);
