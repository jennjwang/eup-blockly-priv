function simulator(state, action) {
  copiedState = JSON.parse(JSON.stringify(state));

  if (action == "moveRobotToRoom('bedroom');") {
    copiedState.robot_position = "bedroom";
  }
  if (action == "moveRobotToRoom('playroom');") {
    copiedState.robot_position = "playroom";
  }
  if (action == "moveRobotToRoom('kitchen');") {
    copiedState.robot_position = "kitchen";
  }
  if (action == "drop_toy();") {
    if (copiedState.holding != "toy") {
      return false;
    } else {
      copiedState.holding = null;
      copiedState.blocks.splice(2, 0, copiedState.robot_position);
    }
  }
  if (action == "pick_up_toy();") {
    if (
      copiedState.holding != null ||
      !copiedState.blocks
        .slice(2, copiedState.blocks.length)
        .includes(copiedState.robot_position)
    ) {
      return false;
    } else {
      ind = copiedState.blocks
        .slice(2, copiedState.blocks.length)
        .indexOf(copiedState.robot_position);
      copiedState.holding = "toy";
      if (copiedState.blocks.length == 3) {
        copiedState.blocks[2] = null;
      } else {
        copiedState.blocks.splice(ind + 2, 1);
      }
    }
  }
  if (action == "moveRobotToRandomRoom();") {
    room = Math.floor(Math.random() * 5 + 1);
    test = ["bedroom", "kitchen", "playroom", "porch"][room];
    copiedState.robot_position = test;
  }
  if (action == "moveRobotToRoom('porch');") {
    copiedState.robot_position = "porch";
  }
  if (action == "pick_up_thing('mail');") {
    if (copiedState.holding != null) {
      return false;
    }
    if (Array.isArray(copiedState.blocks[0])) {
      ind = copiedState.blocks[0].indexOf(copiedState.robot_position);
      if (ind == -1) {
        return false;
      } else {
        copiedState.holding = "mail";
        copiedState.blocks[0][ind] = null;
      }
    } else if (copiedState.blocks[0] != copiedState.robot_position) {
      return false;
    } else {
      copiedState.holding = "mail";
      copiedState.blocks[0] = null;
    }
  }

  if (action == "drop_thing('mail');") {
    if (copiedState.holding != "mail") {
      return false;
    } else {
      copiedState.holding = null;
      if (!Array.isArray(copiedState.blocks[0])) {
        copiedState.blocks[0] = copiedState.robot_position;
      } else {
        ind = copiedState.blocks[0].indexOf(null);
        copiedState.blocks[0][ind] = copiedState.robot_position;
      }
    }
  }
  if (action == "pick_up_thing('coffee');") {
    if (
      copiedState.holding != null ||
      copiedState.blocks[1] != copiedState.robot_position
    ) {
      return false;
    } else {
      // ind = copiedState.blocks.indexOf(copiedState.robot_position);
      copiedState.holding = "coffee";
      copiedState.blocks[1] = null;
    }
  }

  if (action == "drop_thing('coffee');") {
    if (copiedState.holding != "coffee") {
      return false;
    } else {
      copiedState.holding = null;
      copiedState.blocks[1] = copiedState.robot_position;
    }
  }
  // if (find_id(copiedState, state_ids) == find_id(state, state_ids)){return false}
  return copiedState;
}

function generate_goal_func(goal, state) {
  val = true;

  if (goal.includes("isPersonInRoomEvent()")) {
    val = val && state.person == state.robot_position;
  }
  if (goal.includes("isPersonNotInRoomEvent()")) {
    val = val && !(state.person == state.robot_position);
  }

  if (
    goal.includes("isRobotinRoomEvent('kitchen')") &&
    !goal.includes("!isRobotinRoomEvent('kitchen')")
  ) {
    val = val && state.robot_position == "kitchen";
  }

  if (goal.includes("!isRobotinRoomEvent('kitchen')")) {
    val = val && state.robot_position != "kitchen";
  }

  if (
    goal.includes("isRobotinRoomEvent('bedroom')") &&
    !goal.includes("!isRobotinRoomEvent('bedroom')")
  ) {
    val = val && state.robot_position == "bedroom";
  }

  if (goal.includes("!isRobotinRoomEvent('bedroom')")) {
    val = val && state.robot_position != "bedroom";
  }

  if (
    goal.includes("isRobotinRoomEvent('playroom')") &&
    !goal.includes("!isRobotinRoomEvent('playroom')")
  ) {
    val = val && state.robot_position == "playroom";
  }

  if (goal.includes("!isRobotinRoomEvent('playroom')")) {
    val = val && state.robot_position != "playroom";
  }

  if (goal.includes("eHandsFree()")) {
    val = val && state.holding == null;
  }

  if (goal.includes("eHandsFull()")) {
    val = val && state.holding != null;
  }

  if (goal.includes("toy_in_room()")) {
    val =
      val &&
      (state.blocks
        .slice(2, state.blocks.length)
        .includes(state.robot_position) ||
        state.holding == "toy");
  }

  if (goal.includes("toy_not_in_room()")) {
    val =
      val &&
      !(
        state.blocks
          .slice(2, state.blocks.length)
          .includes(state.robot_position) || state.holding == "toy"
      );
  }

  if (
    goal.includes("isRobotinRoomEvent('porch')") &&
    !goal.includes("!isRobotinRoomEvent('porch')")
  ) {
    val = val && state.robot_position == "porch";
  }
  if (goal.includes("!isRobotinRoomEvent('porch')")) {
    val = val && state.robot_position != "porch";
  }

  if (goal.includes("thing_in_room('mail')")) {
    if (!Array.isArray(state.blocks[0])) {
      val =
        val &&
        (state.blocks[0] == state.robot_position || state.holding == "mail");
    } else {
      val =
        val &&
        (state.blocks.includes(state.robot_position) ||
          state.holding == "mail");
    }
  }
  if (goal.includes("thing_not_in_room('mail')")) {
    if (!Array.isArray(state.blocks[0])) {
      val =
        val &&
        !(state.blocks[0] == state.robot_position || state.holding == "mail");
    } else {
      val =
        val &&
        !(
          state.blocks[0].includes(state.robot_position) ||
          state.holding == "mail"
        );
    }
  }

  if (goal.includes("thing_in_room('coffee')")) {
    val =
      val &&
      (state.blocks[1] == state.robot_position || state.holding == "coffee");
  }
  if (goal.includes("thing_not_in_room('coffee')")) {
    val =
      val &&
      !(state.blocks[1] == state.robot_position || state.holding == "coffee");
  }
  if (goal.includes("is_coffee_in_room('kitchen')")) {
    val =
      val &&
      ((state.robot_position == "kitchen" && state.holding == "coffee") ||
        state.blocks[1] == "kitchen");
  }
  if (goal.includes("is_coffee_in_room('bedroom')")) {
    val =
      val &&
      ((state.robot_position == "bedroom" && state.holding == "coffee") ||
        state.blocks[1] == "bedroom");
  }
  if (goal.includes("is_coffee_in_room('porch')")) {
    val =
      val &&
      ((state.robot_position == "porch" && state.holding == "coffee") ||
        state.blocks[1] == "porch");
  }
  if (goal.includes("is_coffee_in_room('playroom')")) {
    val =
      val &&
      ((state.robot_position == "playroom" && state.holding == "coffee") ||
        state.blocks[1] == "playroom");
  }

  if (goal.includes("is_mail_in_room('kitchen')")) {
    if (!Array.isArray(state.block[0])) {
      val =
        val &&
        ((state.robot_position == "kitchen" && state.holding == "mail") ||
          state.blocks[0] == "kitchen");
    } else {
      val =
        val &&
        ((state.robot_position == "kitchen" && state.holding == "mail") ||
          state.blocks[0].includes("kitchen"));
    }
  }
  if (goal.includes("is_mail_in_room('bedroom')")) {
    if (!Array.isArray(state.block[0])) {
      val =
        val &&
        ((state.robot_position == "bedroom" && state.holding == "mail") ||
          state.blocks[0] == "bedroom");
    } else {
      val =
        val &&
        ((state.robot_position == "bedroom" && state.holding == "mail") ||
          state.blocks[0].includes("bedroom"));
    }
  }
  if (goal.includes("is_mail_in_room('porch')")) {
    if (!Array.isArray(state.block[0])) {
      val =
        val &&
        ((state.robot_position == "porch" && state.holding == "mail") ||
          state.blocks[0] == "porch");
    } else {
      val =
        val &&
        ((state.robot_position == "porch" && state.holding == "mail") ||
          state.blocks[0].includes("porch"));
    }
  }
  if (goal.includes("is_mail_in_room('playroom')")) {
    if (!Array.isArray(state.block[0])) {
      val =
        val &&
        ((state.robot_position == "playroom" && state.holding == "mail") ||
          state.blocks[0] == "playroom");
    } else {
      val =
        val &&
        ((state.robot_position == "playroom" && state.holding == "mail") ||
          state.blocks[0].includes("playroom"));
    }
  }

  return val;
}

function generate_triggers(triggers, state) {
  output = [];
  for (ind in triggers) {
    trigger = triggers[ind];

    if (trigger == "isRobotinRoomEvent('kitchen');") {
      if (state.robot_position == "kitchen") {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "isRobotOutOfEvent('kitchen');") {
      if (state.robot_position == "kitchen") {
        output.push(0);
      } else {
        output.push(1);
      }
    }
    if (trigger == "isRobotOutOfEvent('bedroom');") {
      if (state.robot_position == "bedroom") {
        output.push(0);
      } else {
        output.push(1);
      }
    }
    if (trigger == "isRobotOutOfEvent('playroom');") {
      if (state.robot_position == "playroom") {
        output.push(0);
      } else {
        output.push(1);
      }
    }

    if (trigger == "isRobotinRoomEvent('bedroom');") {
      if (state.robot_position == "bedroom") {
        output.push(1);
      } else {
        output.push(0);
      }
    }

    if (trigger == "isRobotinRoomEvent('playroom');") {
      if (state.robot_position == "playroom") {
        output.push(1);
      } else {
        output.push(0);
      }
    }

    if (trigger == "eHandsFree();") {
      if (state.holding == null) {
        output.push(1);
      } else {
        output.push(0);
      }
    }

    if (trigger == "eHandsFull();") {
      if (state.holding == null) {
        output.push(0);
      } else {
        output.push(1);
      }
    }

    if (trigger == "toy_in_room();") {
      if (
        state.blocks
          .slice(2, state.blocks.length)
          .includes(state.robot_position) ||
        state.holding == "toy"
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }

    if (trigger == "isPersonNotInRoomEvent();") {
      if (!(state.person == state.robot_position)) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "isPersonInRoomEvent();") {
      if (!(state.person == state.robot_position)) {
        output.push(0);
      } else {
        output.push(1);
      }
    }
    if (trigger == "is_toy_in_room('bedroom');") {
      if (
        state.blocks.slice(2, state.blocks.length).includes("bedroom") ||
        (state.holding == "toy" && state.robot_position == "bedroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_toy_in_room('kitchen');") {
      if (
        state.blocks.slice(2, state.blocks.length).includes("kitchen") ||
        (state.holding == "toy" && state.robot_position == "kitchen")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_toy_in_room('playroom');") {
      if (
        state.blocks.slice(2, state.blocks.length).includes("playroom") ||
        (state.holding == "toy" && state.robot_position == "playroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_toy_in_room('porch');") {
      if (
        state.blocks.slice(2, state.blocks.length).includes("porch") ||
        (state.holding == "toy" && state.robot_position == "porch")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "toy_not_in_room();") {
      if (
        !(
          state.blocks
            .slice(2, state.blocks.length)
            .includes(state.robot_position) || state.holding == "toy"
        )
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }

    if (trigger == "isRobotinRoomEvent('porch');") {
      if (state.robot_position == "porch") {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "isRobotOutOfEvent('porch');") {
      if (state.robot_position == "porch") {
        output.push(0);
      } else {
        output.push(1);
      }
    }
    if (trigger == "is_mail_in_room('porch');") {
      if (Array.isArray(copiedState.blocks[0])) {
        if (
          state.blocks[0].includes("porch") ||
          (state.holding == "mail" && state.robot_position == "porch")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      } else {
        if (
          state.blocks[0] == "porch" ||
          (state.holding == "mail" && state.robot_position == "porch")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      }
    }
    if (trigger == "is_mail_in_room('bedroom');") {
      if (Array.isArray(copiedState.blocks[0])) {
        if (
          state.blocks[0].includes("bedroom") ||
          (state.holding == "mail" && state.robot_position == "bedroom")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      } else {
        if (
          state.blocks[0] == "bedroom" ||
          (state.holding == "mail" && state.robot_position == "bedroom")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      }
    }
    if (trigger == "is_mail_in_room('kitchen');") {
      if (Array.isArray(copiedState.blocks[0])) {
        if (
          state.blocks[0].includes("kitchen") ||
          (state.holding == "mail" && state.robot_position == "kitchen")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      } else {
        if (
          state.blocks[0] == "kitchen" ||
          (state.holding == "mail" && state.robot_position == "kitchen")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      }
    }
    if (trigger == "is_mail_in_room('playroom');") {
      if (Array.isArray(copiedState.blocks[0])) {
        if (
          state.blocks[0].includes("playroom") ||
          (state.holding == "mail" && state.robot_position == "playroom")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      } else {
        if (
          state.blocks[0] == "playroom" ||
          (state.holding == "mail" && state.robot_position == "playroom")
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      }
    }
    if (trigger == "thing_in_room('mail');") {
      if (Array.isArray(copiedState.blocks[0])) {
        if (
          state.blocks[0].includes(state.robot_position) ||
          state.holding == "mail"
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      } else {
        if (
          state.blocks[0] == state.robot_position ||
          state.holding == "mail"
        ) {
          output.push(1);
        } else {
          output.push(0);
        }
      }
    }

    if (trigger == "is_coffee_in_room('porch');") {
      if (
        state.blocks[1] == "porch" ||
        (state.holding == "coffee" && state.robot_position == "porch")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_coffee_in_room('bedroom');") {
      if (
        state.blocks[1] == "bedroom" ||
        (state.holding == "coffee" && state.robot_position == "bedroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_coffee_in_room('kitchen');") {
      if (
        state.blocks[1] == "kitchen" ||
        (state.holding == "coffee" && state.robot_position == "kitchen")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_coffee_in_room('playroom');") {
      if (
        state.blocks[1] == "playroom" ||
        (state.holding == "coffee" && state.robot_position == "playroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "thing_in_room('coffee');") {
      if (
        state.blocks[1] == state.robot_position ||
        state.holding == "coffee"
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
  }

  return output;
}

function parser(code) {
  lines = code.split("\n");
  state = 0;
  triggers = [];
  goals = [];
  actions = [];
  for (let line in lines) {
    if (lines[line] != "" && !lines[line].includes("highlightBlock")) {
      if (lines[line] == ")") {
        state = 0;
      }
      if (state == 1) {
        actions.push(lines[line].trim());
      }
      if (state == 2) {
        priority_goals = lines[1].split("#");
        for (var i = 0; i < priority_goals.length; i++) {
          if (
            priority_goals[i].trim() != ");" &&
            priority_goals[i].trim() != ""
          ) {
            var a = priority_goals[i];
            const matches = a.matchAll(/<(.*?)>/g);
            const regex_matched = Array.from(matches, (x) => x[1]);
            var outside_and = a.replace(/<(.*?)>/g, "");

            var in_and = "";
            for (var rm in regex_matched) {
              [f, s] = regex_matched[rm].split("&&");
              if (!f.includes("false") && !s.includes("false")) {
                f = f.replace("||", "\t");
                s = s.replace("||", "\t");
                and_distributed_list = f
                  .split("\t")
                  .flatMap((d) =>
                    s.split("\t").map((v) => d + "&&" + v + "\t")
                  );
                in_and += "\t" + and_distributed_list;
              } else {
                return [false, false, false, false];
              }
            }

            var cur_priority_goals = (in_and.trim() + "\t" + outside_and)
              .trim()
              .split("\t");

            if (cur_priority_goals != "") {
              // console.log(cur_priority_goals);
              cur_priority_goals_with_or = [];
              for (var g_i in cur_priority_goals) {
                if (cur_priority_goals[g_i].includes("||")) {
                  var temp = cur_priority_goals[g_i].split("||");
                  for (var g_j in temp) {
                    cur_priority_goals_with_or.push(temp[g_j].trim());
                    if (temp[g_j].includes("false")) {
                      return [false, false, false, false];
                    }
                  }
                } else {
                  cur_priority_goals_with_or.push(cur_priority_goals[g_i]);
                }
              }
              // console.log(cur_priority_goals_with_or);
              // debugger;
              goals.push(cur_priority_goals_with_or);
            }
          } else {
            goals.push([]);
          }
        }
      }
      if (state == 3) {
        triggers.push(lines[line].trim());
      }
      if (lines[line] == "actions(") {
        state = 1;
      }
      if (lines[line] == "goals(") {
        state = 2;
      }
      if (lines[line] == "triggers(") {
        state = 3;
      }
    }
  }
  // if (goals.length != 3){

  // }

  goalfinal = false;

  // console.log(priority_goals, 'here here');
  // debugger;
  // return [triggers, actions, goals, goalfinal];
  return [triggers, actions, goals, goalfinal];
}

function find_id(state, map) {
  for (ourKey in map) {
    thisstate = map[ourKey];
    if (
      thisstate.robot_position == state.robot_position &&
      thisstate.blocks.toString() == state.blocks.toString() &&
      thisstate.holding == state.holding &&
      thisstate.person == state.person
    ) {
      return ourKey;
    }
  }
  return null;
}

function find_state(
  state_map,
  robot_position,
  obj_positions,
  robot_holding,
  person_pos
) {
  for (s in state_map) {
    cur_state = state_map[s];
    if (
      cur_state["robot_position"] == robot_position &&
      cur_state["blocks"].toString() == obj_positions.toString() &&
      cur_state["holding"] == robot_holding &&
      cur_state["person"] == person_pos
    ) {
      return s;
    }
  }
}

function get_mdp_policy(code, taskNum) {
  [triggers, actions, goal, goalfinal] = parser(code);
  if (goal == false || goals[0].length + goals[1].length + goals[2].length == 0) {
    return [false, false, false];
  }

  actions = [
    "moveRobotToRoom('playroom');",
    "moveRobotToRoom('porch');",
    "moveRobotToRoom('kitchen');",
    "moveRobotToRoom('bedroom');",
    "pick_up_toy();",
    "drop_toy();",
    "pick_up_thing('mail');",
    "pick_up_thing('coffee');",
    "drop_thing('mail');",
    "drop_thing('coffee');",
  ];

  values_table = {};
  rewards_table = {};
  state_ids = {};
  const ROOMS = ["porch", "kitchen", "bedroom", "playroom", null];
  person_locs = [null];

  if (taskNum == "_") {
    block_list = [
      ["porch", "porch", "kitchen"],
      ["porch", "porch", "playroom"],
      ["porch", "porch", "bedroom"],
      ["porch", "porch", "porch"],
      ["porch", "porch", null],
      ["porch", null, "kitchen"],
      [null, "porch", "kitchen"],
      ["porch", "kitchen", "kitchen"],
      ["kitchen", "porch", "kitchen"],
      ["kitchen", null, "kitchen"],
      [null, "kitchen", "kitchen"],
      ["kitchen", "kitchen", "kitchen"],
    ];
    // for (var m in ROOMS){
    //   for (var c in ROOMS){
    //     for (var t in ROOMS){
    //       block_list.push([ROOMS[m], ROOMS[c], ROOMS[t]]);
    //     }
    //   }
    // }
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
      "is_toy_in_room('porch');",
      "is_coffee_in_room('bedroom');",
      "is_coffee_in_room('kitchen');",
      "is_coffee_in_room('playroom');",
      "is_coffee_in_room('porch');",
      "thing_in_room('coffee');",
      "is_mail_in_room('bedroom');",
      "is_mail_in_room('kitchen');",
      "is_mail_in_room('playroom');",
      "is_mail_in_room('porch');",
      "thing_in_room('mail');",
    ];
  }

  if (taskNum == 0) {
    block_list = [[null, null, null]];
    // person_locs = [null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
    ];
  }

  if (taskNum == 1 || taskNum == 7) {
    person_locs = ["porch", "kitchen", "bedroom", "playroom", null];
    block_list = [[]];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "isPersonInRoomEvent();",
    ];
    actions = [
      "moveRobotToRoom('playroom');",
      "moveRobotToRoom('porch');",
      "moveRobotToRoom('kitchen');",
      "moveRobotToRoom('bedroom');",
    ];
  }
  if (taskNum == 2) {
    block_list = [
      [null, null, "playroom"],
      [null, null, null],
      [null, null, "bedroom"],
      [null, null, "kitchen"],
      [null, null, "porch"],
    ];
    // person_locs = [null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
      "is_toy_in_room('porch');",
      "isRobotinRoomEvent('porch');",
    ];
  }
  if (taskNum == 3) {
    block_list = [
      [null, null, null],
      [null, null, "kitchen"],
      [null, null, "playroom"],
      [null, null, "kitchen", "kitchen"],
      [null, null, "kitchen", "playroom"],
      [null, null, "playroom", "kitchen"],
      [null, null, "playroom", "playroom"],
      [null, null, "kitchen", "kitchen", "kitchen"],
      [null, null, "playroom", "kitchen", "kitchen"],
      [null, null, "playroom", "playroom", "kitchen"],
      [null, null, "playroom", "playroom", "playroom"],
      [null, null, "kitchen", "kitchen", "kitchen", "kitchen"],
      [null, null, "playroom", "kitchen", "kitchen", "kitchen"],
      [null, null, "playroom", "playroom", "kitchen", "kitchen"],
      [null, null, "playroom", "playroom", "playroom", "kitchen"],
      [null, null, "playroom", "playroom", "playroom", "playroom"],
    ];
    person_locs = [null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
      "is_toy_in_room('porch');",
    ];
  }
  if (taskNum == 4) {
    block_list = [
      [null, "kitchen", null],
      [null, "playroom", null],
      [null, "bedroom", null],
      [null, "porch", null],
      [null, null, null],
    ];
    person_locs = ["porch", "kitchen", "bedroom", "playroom", null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "toy_in_room();",
      "isPersonNotInRoomEvent();",
      "is_coffee_in_room('bedroom');",
      "is_coffee_in_room('kitchen');",
      "is_coffee_in_room('playroom');",
      "is_coffee_in_room('porch');",
      "thing_in_room('coffee');",
    ];
  }

  if (taskNum == 6) {
    // person_locs = [null];

    block_list = [[[null, null, null], null, null]];
    rooms_wot_null = ["porch", "kitchen", null];
    for (var r1 in rooms_wot_null) {
      for (var r2 in rooms_wot_null) {
        for (var r3 in rooms_wot_null) {
          block_list.push([
            [rooms_wot_null[r1], rooms_wot_null[r2], rooms_wot_null[r3]],
            null,
            null,
          ]);
        }
      }
    }

    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "is_mail_in_room('bedroom');",
      "is_mail_in_room('kitchen');",
      "is_mail_in_room('playroom');",
      "is_mail_in_room('porch');",
      "thing_in_room('mail');",
    ];
  }

  if (taskNum == 5 || taskNum == 8) {
    person_locs = [null];
    block_list = []; // // index 0 mail, index 1 coffee

    state_rooms = ["kitchen", "bedroom", "playroom", "porch", null];
    for (var r1 in state_rooms) {
      for (var r2 in state_rooms) {
        block_list.push([state_rooms[r1], state_rooms[r2], null]);
      }
    }

    triggers = [
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
      "is_toy_in_room('porch');",
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "is_mail_in_room('bedroom');",
      "is_mail_in_room('kitchen');",
      "is_mail_in_room('playroom');",
      "is_mail_in_room('porch');",
      "thing_in_room('mail');",
      "is_coffee_in_room('bedroom');",
      "is_coffee_in_room('kitchen');",
      "is_coffee_in_room('playroom');",
      "is_coffee_in_room('porch');",
      "thing_in_room('coffee');",
    ];
  }

  if (taskNum == 9) {
    person_locs = [null];
    block_list = []; // // index 0 mail, index 1 coffee

    for (var r1 in ROOMS) {
      block_list.push([null, ROOMS[r1], null]);
    }

    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "isRobotinRoomEvent('porch');",
      "eHandsFree();",
      "is_coffee_in_room('bedroom');",
      "is_coffee_in_room('kitchen');",
      "is_coffee_in_room('playroom');",
      "is_coffee_in_room('porch');",
      "thing_in_room('coffee');",
    ];
  }

  id = 0;
  //Populate values table
  these_rooms = ["kitchen", "bedroom", "playroom", "porch"];

  holding = [null, "toy", "mail", "coffee"];
  if (taskNum == 1 || taskNum == 7) {holding = [null]}
  if (taskNum == 6){holding = [null, 'mail']}

  for (room in these_rooms) {
    for (obj in holding) {
      for (person_loc in person_locs) {
        for (block in block_list) {
          state = {
            robot_position: these_rooms[room],
            blocks: block_list[block],
            holding: holding[obj],
            person: person_locs[person_loc],
          };
          high_prior = goal[0];
          med_prior = goal[1];
          low_prior = goal[2];

          if (
            high_prior == undefined &&
            med_prior == undefined &&
            low_prior == undefined
          ) {
            return [false, false];
          }

          rewards_table[id] = 0;
          values_table[id] = 0;
          if (high_prior != undefined) {
            for (let i = 0; i < high_prior.length; i++) {
              if (
                high_prior[i] != ";" &&
                generate_goal_func(high_prior[i], state)
              ) {
                rewards_table[id] += 5;
              }
            }
          }
          if (med_prior != undefined) {
            for (let i = 0; i < med_prior.length; i++) {
              if (
                med_prior[i] != ";" &&
                generate_goal_func(med_prior[i], state)
              ) {
                rewards_table[id] += 3;
              }
            }
          }
          if (low_prior != undefined) {
            for (let i = 0; i < low_prior.length; i++) {
              if (
                low_prior[i] != ";" &&
                generate_goal_func(low_prior[i], state)
              ) {
                rewards_table[id] += 1;
              }
            }
          }
          state_ids[id] = state;
          id += 1;
        }
      }
    }
  }

  transition_table = {};
  //Train
  num_epochs = 20;
  gamma = 0.92;
  for (i = 0; i < num_epochs; i++) {
    for (key in values_table) {
      state = state_ids[key];
      // console.log(state);
      // if (generate_goal_func(goal[0], state)) {
      max_val = -Infinity;
      optimal_action = null;
      next_state = null;

      for (action_ind in actions) {
        action = actions[action_ind];
        next = simulator(state, action);

        if (!(next == false) && !(next == null)) {
          next_id = find_id(next, state_ids);

          if (!(next_id == null)) {
            val = values_table[next_id];
            if (val > max_val) {
              max_val = val;
              optimal_action = action;
              next_state = next_id;
            }
          }
        }
      }
      values_table[key] = gamma * max_val + rewards_table[key];
      // }
    }
  }

  //Generate policy

  for (v in values_table) {
    state = state_ids[v];

    max_val = -Infinity;
    optimal_actions = [];
    next_states = [];

    for (action_ind in actions) {
      action = actions[action_ind];

      next = simulator(state, action);

      if (!(next == false) && !(next == null)) {
        next_id = find_id(next, state_ids);

        if (!(next_id == null)) {
          val = values_table[next_id];
          if (val > max_val) {
            optimal_actions = [];
            next_states = [];
            max_val = val;
            optimal_actions.push(action);
            next_states.push(next_id);
          }else if (val == max_val){
            optimal_actions.push(action);
            next_states.push(next_id);
          }
        }
      }
    }

    let selected_action_ind = Math.floor(Math.random() * optimal_actions.length)
    
    transition_table[v] = [optimal_actions[selected_action_ind], next_states[selected_action_ind], max_val];
  }

  return [transition_table, values_table, triggers];
}

function run_mdp(code, taskNum) {
  // debugger;
  start = Date.now();
  // [policy, triggers, goal, goalfinal] = get_mdp_policy(code, taskNum);

  [transition_table, values_table, triggers] = get_mdp_policy(code, taskNum);
  if (transition_table == false) {
    return "";
  }

  if (taskNum == 1 || taskNum == 7) {
    js_transition_table = {};
    var mapping_array = [];
    var corresponding_values = [];
    var corresponding_keys = [];
    var chk_room = null;

    for (var key in transition_table) {
      if (state_ids[key].holding != null) {
        continue;
      }

      if (state_ids[key].robot_position != state_ids[key].person) {
        if (chk_room == null || chk_room != state_ids[key].robot_position) {
          if (corresponding_values.length == 3) {
            var max_act_ind = corresponding_values.indexOf(
              Math.max(...corresponding_values)
            );
            js_transition_table[corresponding_keys[0]] =
              mapping_array[max_act_ind];
          }

          chk_room = state_ids[key].robot_position;
          corresponding_values.length = 0;
          mapping_array.length = 0;

          mapping_array.push(transition_table[key]);
          corresponding_values.push(transition_table[key][2]);
          corresponding_keys.push(key);
        } else if (chk_room == state_ids[key].robot_position) {
          mapping_array.push(transition_table[key]);
          corresponding_values.push(transition_table[key][2]);
          corresponding_keys.push(key);
        }
      } else {
        js_transition_table[key] = transition_table[key];
      }
    }

    out = "";
    var count = 0;
    for (key in js_transition_table) {
      if (count == 0) {
        out += "\tif(";
      } else {
        out += "\telse if(";
      }
      cur_trigger = generate_triggers(triggers, state_ids[key]);
      for (ind in cur_trigger) {
        if (cur_trigger[ind] == 1) {
          out += "(" + triggers[ind].slice(0, -1) + ") && ";
        } else {
          out += "!(" + triggers[ind].slice(0, -1) + ") && ";
        }
      }
      out = out.slice(0, -4);
      out += "){\n\t\t" + js_transition_table[key][0] + "\n\t}\n";
      count += 1;
    }

    // out += "}\n";
    // end = Date.now();
    // timer = (end - start) / 100;
    // debugger;
    return out;
  } else {
    return [transition_table, state_ids];
  }
}

function get_seq_action(transition_table, state_id, action = "") {
  if (action == transition_table[state_id][0]) {
    return;
  } else {
    action = transition_table[state_id][0];
    console.log(action);
    state_id = transition_table[state_id][1];
    return get_seq_action(transition_table, state_id, action);
  }
}
