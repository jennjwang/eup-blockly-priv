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
      !copiedState.blocks.slice(2,copiedState.blocks.length).includes(copiedState.robot_position)
    ) {
      return false;
    } else {
      ind = copiedState.blocks.slice(2,copiedState.blocks.length).indexOf(copiedState.robot_position);
      copiedState.holding = "toy";
      copiedState.blocks.slice(2,copiedState.blocks.length).splice(ind + 2, 1);
    }
  }
  if (action == "moveRobotToRandomRoom();") {
    room = Math.floor(Math.random() * 5 + 1);
    test = ["bedroom", "kitchen", "playroom"][room];
    copiedState.robot_position = test;
  }
  if (action == "moveRobotToRoom('porch');") {
    copiedState.robot_position = "porch";
  }
  if (action == "pick_up_thing('mail');") {
    if (
      copiedState.holding != null ||
      copiedState.blocks[0] != copiedState.robot_position
    ) {
      return false;
    } else {
      // ind = copiedState.blocks.indexOf(copiedState.robot_position);
      copiedState.holding = "mail";
      copiedState.blocks[0] = null;
    }
  }

  if (action == "drop_thing('mail');") {
    if (copiedState.holding != "mail") {
      return false;
    } else {
      copiedState.holding = null;
      copiedState.blocks[0] = copiedState.robot_position;
    }
  }   

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

  if (goal.includes("isRobotinRoomEvent('kitchen')")) {
    val = val && state.robot_position == "kitchen";
  }

  if (goal.includes("!isRobotinRoomEvent('kitchen')")) {
    val = val && state.robot_position != "kitchen";
  }

  if (goal.includes("isRobotinRoomEvent('bedroom')")) {
    val = val && state.robot_position == "bedroom";
  }

  if (goal.includes("!isRobotinRoomEvent('bedroom')")) {
    val = val && state.robot_position != "bedroom";
  }

  if (goal.includes("isRobotinRoomEvent('playroom')")) {
    val = val && state.robot_position == "playroom";
  }

  if (goal.includes("!isRobotinRoomEvent('playroom')")) {
    val = val && state.robot_position != "playroom";
  }

  if (goal.includes("eHandsFree()")) {
    val = val && state.holding==null;
  }

  if (goal.includes("eHandsFull()")) {
    val = val && state.holding != null;
  }

  if (goal.includes("toy_in_room()")) {
    val =
      val &&
      (state.blocks.slice(2,state.blocks.length).includes(state.robot_position) || state.holding == "toy");
  }

  if (goal.includes("toy_not_in_room()")) {
    val =
      val &&
      !(state.blocks.slice(2,state.blocks.length).includes(state.robot_position) || state.holding == "toy");
  }

  if (goal.includes("isRobotinRoomEvent('porch')")) {
    val = val && state.robot_position == "porch";
  }
  if (goal.includes("!isRobotinRoomEvent('porch')")) {
    val = val && state.robot_position != "porch";
  }

  if (goal.includes("thing_in_room('mail')")) {
    val =
      val &&
      (state.blocks[0] == state.robot_position || state.holding == "mail");
  }
  if (goal.includes("thing_not_in_room('mail')")) {
    val =
      val &&
      !(state.blocks[0] == state.robot_position || state.holding == "mail");
  }

  if (goal.includes("thing_in_room('coffee')")) {
    val =
      val && (state.blocks[1] == state.robot_position || state.holding=='coffee');
  }
  if (goal.includes("thing_not_in_room('coffee')")) {
    val =
      val && !(state.blocks[1] == state.robot_position || state.holding=='coffee');
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
      if (state.holding==null) {
        output.push(0);
      } else {
        output.push(1);
      }
    }

    if (trigger == "toy_in_room();") {
      if (
        state.blocks.slice(2,state.blocks.length).includes(state.robot_position) ||
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
        state.blocks.slice(2,state.blocks.length).includes("bedroom") ||
        (state.holding == "toy" && state.robot_position == "bedroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_toy_in_room('kitchen');") {
      if (
        state.blocks.slice(2,state.blocks.length).includes("kitchen") ||
        (state.holding == "toy" && state.robot_position == "kitchen")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_toy_in_room('playroom');") {
      if (
        state.blocks.slice(2,state.blocks.length).includes("playroom") ||
        (state.holding == "toy" && state.robot_position == "playroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "toy_not_in_room();") {
      if (
        !(state.blocks.slice(2,state.blocks.length).includes(state.robot_position) || state.holding == "toy")
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
      if (
        state.blocks[0] == "porch" ||
        (state.holding == "mail" && state.robot_position == "porch")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_mail_in_room('bedroom');") {
      if (
        state.blocks[0] == "bedroom" ||
        (state.holding == "mail" && state.robot_position == "bedroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_mail_in_room('kitchen');") {
      if (
        state.blocks[0] == "kitchen" ||
        (state.holding == "mail" && state.robot_position == "kitchen")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "is_mail_in_room('playroom');") {
      if (
        state.blocks[0] == "playroom" ||
        (state.holding == "mail" && state.robot_position == "playroom")
      ) {
        output.push(1);
      } else {
        output.push(0);
      }
    }
    if (trigger == "thing_in_room('mail');") {
      if (state.blocks[0] == state.robot_position || state.holding == "mail") {
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
            priority_goals[i].trim() != ";" &&
            priority_goals[i].trim() != ""
          ) {
            cur_priority_goals = priority_goals[i].trim().split("\t");
            if (cur_priority_goals != "") {
              goals.push(cur_priority_goals);
            }
          } else {
            goals.push([]);
          }
        }
        // console.log(goals)
        // debugger;
        // goalsarr = lines[line].trim().split(" && ");
        // goalfinal = lines[line].trim();

        // if (goalsarr.length == 2) {
        //   for (goal in goalsarr) {
        //     if (goal == 0) {
        //       goals.push(goalsarr[goal].slice(1, goalsarr[goal].length));
        //     } else if (goal == goalsarr.length - 1) {
        //       goals.push(goalsarr[goal].slice(0, -1));
        //     } else {
        //       goals.push(goalsarr[goal].slice(0, goalsarr[goal].length));
        //     }
        //   }
        // }
        // if (goalsarr.length == 3) {
        //   for (goal in goalsarr) {
        //     prefix = true;
        //     while (prefix) {
        //       if (goalsarr[goal][0] == "(") {
        //         goalsarr[goal] = goalsarr[goal].slice(1, goalsarr[goal].length);
        //       } else {
        //         prefix = false;
        //       }
        //     }
        //     suffix = true;
        //     while (suffix) {
        //       if (
        //         goalsarr[goal][goalsarr[goal].length - 1] == ")" &&
        //         goalsarr[goal][goalsarr[goal].length - 2] == ")"
        //       ) {
        //         goalsarr[goal] = goalsarr[goal].slice(0, -1);
        //       } else {
        //         suffix = false;
        //       }
        //     }
        //     goals.push(goalsarr[goal]);
        //   }
        // }

        // if (!(goalsarr.length == 2) && !(goalsarr.length == 3)) {
        //   goals.push(goalsarr[0]);
        // }
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

// function get_policy(code, taskNum) {
//     if (taskNum == 1){
//         init_state = {robot_position: "kitchen", blocks: [], holding: false, person: "kitchen"}
//     }
//     if (taskNum == 2){
//         init_state = {robot_position: "bedroom", blocks: ["playroom"], holding: false, person: null}
//     }
//     if (taskNum == 3){
//         init_state = {robot_position:"bedroom", blocks: Array(Math.floor(Math.random()*5+1)).fill("kitchen"), holding:false, person:null}
//     }

//     [triggers, actions, goal] = parser(code)
//     max_depth = 5
//     pairs = [[init_state, {}, 0]]

//     while (!pairs.length==0) {

//         [state, policy, depth] = pairs.shift()

//         if(generate_goal_func(goal, state)) {
//             return [policy, triggers, goal]
//         }

//         representation = generate_triggers(triggers, state)

//         if(representation in policy) {

//             newState = simulator(state, policy[representation])

//             if ((!(newState == false)) && depth+1 < max_depth){
//                 pairs.push([newState, policy, depth+1])
//             }
//         }

//         for (ind in actions){
//             action = actions[ind]
//             newState = simulator(state, action)
//             copiedPolicy = JSON.parse(JSON.stringify(policy))

//             if ((!(newState == false)) && depth+1 < max_depth){

//                 copiedPolicy[representation] = action
//                 pairs.push([newState, copiedPolicy, depth+1])
//             }

//         }

//     }

//     return [{}, triggers, goal]
// }

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

function get_mdp_policy(code, taskNum) {
  [triggers, actions, goal, goalfinal] = parser(code);

  actions = [
    "moveRobotToRoom('playroom');",
    // "drop_toy();",
    "moveRobotToRoom('kitchen');",
    "moveRobotToRoom('bedroom');",
    // "pick_up_toy();",
    "moveRobotToRoom('porch');",
    "pick_up_thing('mail');",
    // "pick_up_thing('coffee');",
    "drop_thing('mail');",
    // "drop_thing('coffee');",
  ];
  values_table = {};
  rewards_table = {}
  state_ids = {};

  if (taskNum == 1) {
    person_locs = ["kitchen", "bedroom", "playroom", null];
    block_list = [[]];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
      "isPersonNotInRoomEvent();",
    ];
  }
  if (taskNum == 2 || taskNum == "_") {
    block_list = [["playroom"], [], ["bedroom"], ["kitchen"]];
    person_locs = [null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
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
      [null, null, "playroom", "playroom"],
      [null, null, "kitchen", "kitchen", "kitchen"],
      [null, null, "kitchen", "kitchen", "playroom"],
      [null, null, "kitchen", "playroom", "playroom"],
      [null, null, "playroom", "playroom", "playroom"],
      [null, null, "kitchen", "kitchen", "kitchen", "kitchen"],
      [null, null, "kitchen", "kitchen", "kitchen", "playroom"],
      [null, null, "kitchen", "kitchen", "playroom", "playroom"],
      [null, null, "kitchen", "playroom", "playroom", "playroom"],
      [null, null, "playroom", "playroom", "playroom", "playroom"],
    ];
    person_locs = [null];
    triggers = [
      "isRobotinRoomEvent('kitchen');",
      "isRobotinRoomEvent('bedroom');",
      "isRobotinRoomEvent('playroom');",
      "eHandsFree();",
      "toy_in_room();",
      "is_toy_in_room('bedroom');",
      "is_toy_in_room('kitchen');",
      "is_toy_in_room('playroom');",
    ];
  }
  if (taskNum == 7) {
    person_locs = [null];
    block_list =
      // // index 0 mail, index 1 coffee
      [
        ["porch", "porch", null],
        [null, "porch", null],
        ["porch", null, null],

        ["porch", "bedroom", null],
        ["porch", null, null],
        [null, "porch", null],

        ["kitchen", "bedroom", null],
        [null, "bedroom", null],
        ["kitchen", null, null],

        ["kitchen", "porch", null],
        ["kitchen", null, null],
        [null, "porch", null],

      ];
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
      // "is_coffee_in_room('bedroom');",
      // "is_coffee_in_room('kitchen');",
      // "is_coffee_in_room('playroom');",
      // "is_coffee_in_room('porch');",
      // "thing_in_room('coffee');",
      "thing_in_room('mail');",
    ];
  }

  id = 0;
  //Populate values table
  these_rooms = ["kitchen", "bedroom", "playroom", "porch"];
  
  holding = [null, "toy", "mail", "coffee"];
  
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

          if (high_prior.length == 0 && med_prior == 0 && low_prior == 0){
            return [false, false];
          }

          rewards_table[id] = 0;
          values_table[id] = 0
          for (let i = 0; i < high_prior.length; i++) {
            if (
              high_prior[i] != ";" &&
              generate_goal_func(high_prior[i], state)
            ) {
              rewards_table[id] += 5;
            }
          }
          for (let i = 0; i < med_prior.length; i++) {
            if (
              med_prior[i] != ";" &&
              generate_goal_func(med_prior[i], state)
            ) {
              rewards_table[id] += 3;
            }
            // else {
            //   values_table[id] = 0;
            // }
          }
          for (let i = 0; i < low_prior.length; i++) {
            if (
              low_prior[i] != ";" &&
              generate_goal_func(low_prior[i], state)
            ) {
              rewards_table[id] += 1;
            }
            // else {
            //   values_table[id] = 0;
            // }
          }
          // else if (goal[1] != ';' && generate_goal_func(goal[1], state)){
          //   values_table[id] = 2;
          // }
          // else if(goal[2] != ';' && generate_goal_func(goal[2], state)){
          //   values_table[id] = 1;
          // }
          // else {
          //   values_table[id] = 0;
          // }
          state_ids[id] = state;
          id += 1;
        }
      }
    }
  }

  transition_table = {}
  //Train
  num_epochs = 20;
  gamma = 0.9;
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
          // console.log("state: ", state, "action: ", action);
          // console.log(next);
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

  for (v in values_table){
    state = state_ids[v]

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
      transition_table[v] = [optimal_action, next_state, max_val]  
    } 
  
  return [transition_table, values_table];
}

function run_mdp(code, taskNum) {
  // debugger;
  start = Date.now();
  // [policy, triggers, goal, goalfinal] = get_mdp_policy(code, taskNum);
  
  [transition_table, values_table] = get_mdp_policy(code, taskNum); 
  if (transition_table == false){return ""}

  // out = "while (" + true + ") {\n";
  out = ""
  var count = 0;

  for (key in transition_table){
    [act, next_st, max_value]= transition_table[key];
    cur_state = state_ids[key];
    object_positions = cur_state['blocks']

    conditions = ["isRobotinRoomEvent('" + cur_state['robot_position'] + "')"];
    
    if (object_positions[0] != null){
      conditions.push("is_mail_in_room('" + object_positions[0] + "')");
    }
    if (object_positions[1] != null){
      conditions.push("is_coffee_in_room('" + object_positions[1] + "')");
    }
    if (object_positions.length >= 3){
      if(object_positions[2] != null){
        for(i = 2; i < object_positions.length; i++){
          conditions.push("is_toy_in_room('" + object_positions[i] + "')");
        }  
      }   
    }
    if (cur_state['holding'] == null){
      conditions.push("eHandsFree()")
    }else{
      conditions.push("!eHandsFree()")
    }

    if (cur_state['person'] != null){
      conditions.push("isPersonNotInRoomEvent()")
    }

    if (count == 0) {
      out += "\tif(";
    } else {
      out += "\telse if(";
    }
    state_condition = "";

    for (c in conditions){
      state_condition += (conditions[c] + " && ")
    }
    state_condition = state_condition.slice(0,-4) + ")";
    out += state_condition
    out += "{\n\t\t" + transition_table[key][0] + "\n\t}\n";
  }

  // policy ={}
  // if (taskNum == 1) {
  //   goalfinal = false;
  // }
  // out = "while (" + true + ") {\n";
  // var count = 0;
  // for (key in policy) {
  //   if (count == 0) {
  //     out += "\tif(";
  //   } else {
  //     out += "\telse if(";
  //   }
  //   for (ind in triggers) {
  //     if (key.split(",")[ind] == 1) {
  //       out += "(" + triggers[ind].slice(0, -1) + ") && ";
  //     } else {
  //       out += "!(" + triggers[ind].slice(0, -1) + ") && ";
  //     }
  //   }
  //   out = out.slice(0, -4);
  //   out += "){\n\t\t" + policy[key] + "\n\t}\n";
  //   count += 1;
  // }

  // out += "}\n";
  // end = Date.now();
  // timer = (end - start) / 100;
  // debugger;
  return out;
}
