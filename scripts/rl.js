
function simulator(state, action) {
    copiedState = JSON.parse(JSON.stringify(state))

    if (action == "move to bedroom") {
        copiedState.robot_position = 'bedroom'

    } if (action == "move to playroom") {
        copiedState.robot_position = 'playroom'

    } if (action == "move to kitchen") {
        copiedState.robot_position = 'kitchen'

    } if (action == "put down toy") {
        if (copied.State.holding == false){
            return False
        } else {
            copiedState.holding = False
            copiedState.blocks.push(copiedState.robot_position)
        }
        
    } if (action == "pick up toy") {
        if (copied.State.holding == true || !(copiedState.blocks.includes(copiedState.robot_position))){
            return False
        } else {
            ind = copiedState.blocks.findIndex(copiedState.robot_position)
            copiedState.holding = True
            copiedState.blocks.splice(1, ind)
        }
        
    } 
    return copiedState
}

function generate_goal_func(goal) {
    
    return function(state){
        val = true

        if(goal.includes('there is a person in the room')){
            val = val && (state.person == state.robot_position)
        }

        if(goal.includes('there is not a person in the room')){
            val = val && (state.person != state.robot_position)
        }

        if(goal.includes('I am in the kitchen')){
            val = val && (state.robot_position == 'kitchen')
        }

        if(goal.includes('I am not in the kitchen')){
            val = val && (state.robot_position != 'kitchen')
        }

        if(goal.includes('I am in the bedroom')){
            val = val && (state.robot_position == 'bedroom')
        }

        if(goal.includes('I am not in the bedroom')){
            val = val && (state.robot_position != 'bedroom')
        }

        if(goal.includes('I am in the playroom')){
            val = val && (state.robot_position == 'playroom')
        }

        if(goal.includes('I am not in the playroom')){
            val = val && (state.robot_position != 'playroom')
        }

        if(goal.includes('I am not in the bedroom')){
            val = val && (state.robot_position != 'bedroom')
        }

        if(goal.includes('I am holding a toy')){
            val = val && (state.holding)
        }

        if(goal.includes('I am empty handed')){
            val = val && (!state.holding)
        }

        if(goal.includes('There is a toy in the room')){
            val = val && (state.blocks.includes(state.robot_position))
        }

        if(goal.includes('There are no toys in the room')){
            val = val && (!(state.blocks.includes(state.robot_position)))
        }

        return val
    }
}

function generate_triggers(triggers){

    return function (state) {
        output = []
        if(triggers.includes("am I in the kitchen")) {
            if(state.robot_position == 'bedroom') {
                output.push(1)
            } else {
                output.push(0)
            }

        }

        if(triggers.includes("am I in the bedroom")) {
            if(state.robot_position == 'bedroom') {
                output.push(1)
            } else {
                output.push(0)
            }
   
        }

        if(triggers.includes("am I in the playroom")) {
            if(state.robot_position == "playroom") {
                output.push(1)
            } else {
                output.push(0)
            }

        }

        if(triggers.includes("am I holding a toy")) {
            if(state.holding == true) {
                output.push(1)
            } else {
                output.push(0)
            }

        }
        
        if(triggers.includes("is there a toy in the room")) {
            if(state.blocks.includes(state.robot_position)) {
                output.push(1)
            } else {
                output.push(0)
            }
        }

        return output
    }

}

let init_state = {robot_position: "bedroom", blocks: ["playroom"], holding: false, person: null}

function run_rl(triggers, actions, goal) {
    is_done = generate_goal_func(goal)
    trigger_func = generate_triggers(triggers)
    initial_representation = state(init_state)
    max_depth = 5
    pairs = [(init_state, [], 0)]


    while (!pairs.length==0) {

        state, policy, depth = pairs.shift()

        if(is_done(state, goal)) {
            return policy
        }

        representation = trigger_func(state)

        if(representation in policy) {

            newState = simulator(state, policy[representation])

            if ((!(newState == false)) && depth+1 < max_depth){
                pairs.push((newState, policy, depth+1))
            }
        }

        for (action in actions){
            
            newState = simulator(state, action)
            copiedPolicy = JSON.parse(JSON.stringify(policy))

            if ((!(newState == false)) && depth+1 < max_depth){

                copiedPolicy[representation] = action
                pairs.push((newState, copiedPolicy, depth+1))
            }

        }
        
    }

    return false
}