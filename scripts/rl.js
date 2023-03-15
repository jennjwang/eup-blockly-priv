
function simulator(state, action) {
    copiedState = JSON.parse(JSON.stringify(state))

    if (action == "moveRobotToRoom(\'bedroom\');") {
        copiedState.robot_position = 'bedroom'

    } if (action == "moveRobotToRoom(\'playroom\');") {
        copiedState.robot_position = 'playroom'

    } if (action == "moveRobotToRoom(\'kitchen\');") {
        copiedState.robot_position = 'kitchen'

    } if (action == "drop_toy();") {
        if (copiedState.holding == false){
            return false
        } else {
            copiedState.holding = false
            copiedState.blocks.push(copiedState.robot_position)
        }
        
    } if (action == "pick_up_toy();") {
        if (copiedState.holding == true || !(copiedState.blocks.includes(copiedState.robot_position))){
            return false
        } else {
            ind = copiedState.blocks.findIndex(copiedState.robot_position)
            copiedState.holding = true
            copiedState.blocks.splice(1, ind)
        }

    } if (action == "moveRobotToRandomRoom();") {
        room = Math.floor(Math.random()*5+1)
        test = ['bedroom', 'kitchen', 'playroom'][room]
        copiedState.robot_position = test
        
    } 
    return copiedState
}

function generate_goal_func(goal, state) {
    val = true

    if(goal.includes('isPersonInRoom();')){
        val = val && (state.person == state.robot_position)
    }

    if(goal.includes('isRobotinRoom(\'kitchen\');')){
        val = val && (state.robot_position == 'kitchen')
    }

    if(goal.includes('isRobotOutOf(\'kitchen\');')){
        val = val && (state.robot_position != 'kitchen')
    }

    if(goal.includes('isRobotinRoom(\'bedroom\');')){
        val = val && (state.robot_position == 'bedroom')
    }

    if(goal.includes('isRobotOutOf(\'bedroom\');')){
        val = val && (state.robot_position != 'bedroom')
    }

    if(goal.includes('isRobotinRoom(\'playroom\');')){
        val = val && (state.robot_position == 'playroom')
    }

    if(goal.includes('isRobotOutOf(\'playroom\');')){
        val = val && (state.robot_position != 'playroom')
    }

    if(goal.includes('handsFree();')){
        val = val && (!state.holding)
    }

    if(goal.includes('toy_in_room();')){
        val = val && (state.blocks.includes(state.robot_position))
    }

    return val
}

function generate_triggers(triggers, state){
    output = []
    for(ind in triggers) {
        trigger = triggers[ind]

        if(trigger == "isRobotinRoom(\'kitchen\');") {
            if(state.robot_position == 'kitchen') {
                output.push(1)
            } else {
                output.push(0)
            }

        }
        if(trigger =="isRobotOutOf(\'kitchen\');") {
            if(state.robot_position == 'kitchen') {
                output.push(0)
            } else {
                output.push(1)
            }

        }
        if(trigger == "isRobotOutOf(\'bedroom\');") {
            if(state.robot_position == 'bedroom') {
                output.push(0)
            } else {
                output.push(1)
            }

        }
        if(trigger == "isRobotOutOf(\'playroom\');") {
            if(state.robot_position == 'playroom') {
                output.push(0)
            } else {
                output.push(1)
            }

        }

        if(trigger == "isRobotinRoom(\'bedroom\');") {
            if(state.robot_position == 'bedroom') {
                output.push(1)
            } else {
                output.push(0)
            }

        }

        if(trigger == "isRobotinRoom(\'playroom\');") {
            if(state.robot_position == "playroom") {
                output.push(1)
            } else {
                output.push(0)
            }

        }

        if(trigger == "handsFree();") {
            if(!(state.holding)) {
                output.push(1)
            } else {
                output.push(0)
            }

        }
        
        if(trigger == "toy_in_room();") {
            if(state.blocks.includes(state.robot_position)) {
                output.push(1)
            } else {
                output.push(0)
            }
        }
    }

    return output
}

function parser(code){
    lines = code.split('\n')
    state = 0
    triggers = []
    goals = []
    actions = []
    for(let line in lines){
        if(lines[line] != '' && !(lines[line].includes('highlightBlock'))){
            if(lines[line] == ')'){
                state = 0
            }
            if(state == 1){
                actions.push(lines[line].trim())
            }
            if(state == 2){
                goals.push(lines[line].trim())
            }
            if(state == 3){
                triggers.push(lines[line].trim())
            }
            if(lines[line] == "actions("){
                state = 1
            }
            if(lines[line] == "goals("){
                state = 2
            }
            if(lines[line] == "triggers("){
                state = 3
            }
        }

    }
    return [triggers, actions, goals]
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


function get_policy(code, taskNum){
    [triggers, actions, goal] = parser(code)
    debugger
    triggers = ["isRobotinRoom(\'kitchen\');", "isRobotinRoom(\'bedroom\');", "isRobotinRoom(\'playroom\');", "handsFree();", "toy_in_room();"]
    actions = ["moveRobotToRoom(\'bedroom\');", "moveRobotToRoom(\'kitchen\');", "moveRobotToRoom(\'playroom\');", "drop_toy();", "pick_up_toy();"]
    values_table = {}

    if(taskNum == 1){
        persons_locs = ['kitchen', 'bedroom', 'playroom', null]
        block_list = [[]]
    }
    if(taskNum == 2){
        block_list = [['playroom'], [], ['bedroom'], ['kitchen']]
        person_locs = [null]
    }
    if(taskNum == 3){
        block_list = [[], ['kitchen'], ['bedroom'], ['kitchen', 'kitchen'], ['kitchen', 'bedroom'], ['bedroom', 'bedroom'],
                        ['kitchen', 'kitchen', 'kitchen'], ['kitchen', 'kitchen', 'bedroom'], ['kitchen', 'bedroom', 'bedroom'],
                        ['bedroom', 'bedroom', 'bedroom']]
        person_locs = [null]
    }

    //Populate values table
    for(room in ['kitchen', 'bedroom', 'playroom']){
        for(held in [false, true]){
            for(person_loc in person_locs){
                for (block in block_list){

                    state = {robot_position: room, blocks: block, holding: held, person: person_loc}
                    if(generate_goal_func(goal, state)){
                        values_table[state] = 1
                    } else {
                        values_table[state] = 0
                        }
                }
            }
        }
    }

    //Train
    num_epochs = 100
    gamma = 0.99
    for(i=0; i<num_epochs; i++){
        for(state in values_table){

            if(!(generate_goal_func(goal, state))){
                max_val = 0
                for(action in actions){
                    next = simulator(state, action)
                    if(!(next == false) && (next in values_table)){
                        val = values_table[next]
                        if(val > max_val){
                            max_val = val
                        }
                }
                values_table[state] = gamma*max_val
                }
            }

        }

    }
    //Generate policy
    policy = {}
    for(state in values_table){

        if(!(generate_goal_func(goal, state))){
            max_val = 0
            max_act = "moveRobotToRoom(\'bedroom\');"

            for(action in actions){

                next = simulator(state, action)
                if(!(next == false) && (next in values_table)){
                    val = values_table[next]
                    if(val > max_val){
                        max_val = val
                        max_act = action
                    }
                }
            }
            policy[generate_triggers(triggers, state)] = max_act
        }
        
    }
    

    return policy
    }

function run_rl(code, taskNum){
    start = Date.now();
    [policy, triggers, goal] = get_policy(code, taskNum)
    out = "while (!" + goal[0].slice(0,-1) + ") {\n"

    for(key in policy){
        out += '\tif('
        for(ind in triggers){
            if(key.split(',')[ind] == 1){
                out+= "(" + triggers[ind].slice(0,-1) + ') && '
            } else{
                out+='!(' + triggers[ind].slice(0,-1) + ') && '
            }
        }
        out = out.slice(0, -4)
        out += '){\n\t\t' + policy[key] + '\n\t}\n'
    }
    
    
    out += "}\n"
    end = Date.now();
    timer = (end-start)/100
    debugger
    return out
}