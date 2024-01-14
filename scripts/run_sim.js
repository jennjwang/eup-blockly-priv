/*
TODO:
- filter out keys by task
- work the mdp formats
- check that seq works (done)
*/

importScripts("objects.js");
importScripts("blockly.min.js");
importScripts("game.js");
importScripts("../interpreter/acorn_interpreter.js");
importScripts("rl.js");
importScripts("mdp.js");

let jsonData = [];

let code_dict = {
  "65a16844ec0758896540ed02_4zufbygu65_65a1db1945a7e65bf25764ce_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_4zufbygu65_65a1db1945a7e65bf25764ce_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('playroom');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_4zufbygu65_65a1db1945a7e65bf25764ce_FULL_MDP_task5":
    "actions(\n    drop_any();\n  \tmoveRobotToRoom('porch');\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tdrop_any();\n  \tpick_up_thing('mail');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tthing_in_room('mail');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t<(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_dujeebkju6_65a1c1345eca3e3da74b1318_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n  ##);\n",
  "65a16844ec0758896540ed02_dujeebkju6_65a1c1345eca3e3da74b1318_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    toy_not_in_room()\n  eHandsFree()\t#  !isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_dujeebkju6_65a1c1345eca3e3da74b1318_FULL_MDP_task4":
    "actions(\n    pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \teHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    eHandsFull()\t#  isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_e9vasbzap7_65a1db1ffc75f965e7fbb535_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_e9vasbzap7_65a1db1ffc75f965e7fbb535_FULL_MDP_task4":
    "triggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n\n)\n\n\nactions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_e9vasbzap7_65a1db1ffc75f965e7fbb535_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('bedroom');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('playroom');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('porch');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\tisPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_l6av0u30bq_65a1b86a6cb3b8890f38a3f2_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_l6av0u30bq_65a1b86a6cb3b8890f38a3f2_FULL_MDP_task5":
    "triggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('bedroom');\n  \tthing_in_room('mail');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\nactions(\n    pick_up_thing('mail');\n  \tmoveRobotToRoom('porch');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');\n  \tdrop_any();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#  eHandsFree()\t);\n",
  "65a16844ec0758896540ed02_l6av0u30bq_65a1b86a6cb3b8890f38a3f2_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t#  <(!isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t#);\n",
  "65a16844ec0758896540ed02_meofh258kf_65a17ccf3cc27e970219722f_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_meofh258kf_65a17ccf3cc27e970219722f_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t<(toy_not_in_room() && !isRobotinRoomEvent('playroom'))>\t#  <(isRobotinRoomEvent('playroom') && toy_in_room())>\t#);\n",
  "65a16844ec0758896540ed02_meofh258kf_65a17ccf3cc27e970219722f_FULL_MDP_task8":
    "actions(\n    pick_up_thing('mail');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tthing_in_room('mail');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee')\tthing_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_oeeguii1mj_65a1db1825b0569bdc0c5da4_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \tisRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && !isRobotinRoomEvent('kitchen'))>\t<(isPersonInRoomEvent() && !isRobotinRoomEvent('bedroom'))>\t<(!isRobotinRoomEvent('playroom') && isPersonInRoomEvent())>\t<(isPersonInRoomEvent() && !isRobotinRoomEvent('porch'))>\t##);\n",
  "65a16844ec0758896540ed02_oeeguii1mj_65a1db1825b0569bdc0c5da4_FULL_MDP_task6":
    "actions(\n    pick_up_thing('mail');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tthing_in_room('mail');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    !isRobotinRoomEvent('porch')\t##);\n",
  "65a16844ec0758896540ed02_oeeguii1mj_65a1db1825b0569bdc0c5da4_FULL_MDP_task8":
    "actions(\n    pick_up_thing('mail');\n  \tdrop_any();\n  \tpick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ntriggers(\n    thing_in_room('mail');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('mail'))>\t<(eHandsFull() && !isRobotinRoomEvent('porch'))>\t#  <(thing_in_room('coffee') && isRobotinRoomEvent('porch'))>\t<(eHandsFull() && !isRobotinRoomEvent('porch'))>\t#);\n",
  "65a16844ec0758896540ed02_q021n6llci_65a18c99ce498ce15c31ed71_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    <(toy_in_room() && isRobotinRoomEvent('playroom'))>\t##);\n",
  "65a16844ec0758896540ed02_q021n6llci_65a18c99ce498ce15c31ed71_FULL_MDP_task6":
    "actions(\n    pick_up_thing('mail');\n  \tmoveRobotToRoom('porch');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(!isRobotinRoomEvent('porch') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_not_in_room('mail'))>\t#);\n",
  "65a16844ec0758896540ed02_q7vbu46pj5_65a18fc9f18636baf68da97e_FULL_MDP_task4":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('playroom');\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    <(thing_in_room('coffee') && isPersonNotInRoomEvent())>\t<(isPersonInRoomEvent() && eHandsFull())>\t##);\n",
  "65a16844ec0758896540ed02_q7vbu46pj5_65a18fc9f18636baf68da97e_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom')\tisPersonInRoomEvent()\t!isRobotinRoomEvent('playroom') && false)>\t##);\n",
  "65a16844ec0758896540ed02_q7vbu46pj5_65a18fc9f18636baf68da97e_FULL_MDP_task9":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \tisRobotinRoomEvent('bedroom');\n  \tthing_in_room('coffee');\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('bedroom')\teHandsFree() && thing_in_room('coffee')\teHandsFull())>\t<(isRobotinRoomEvent('kitchen')\teHandsFull() && eHandsFree())>\t##);\n",
  "65a16844ec0758896540ed02_sz7w6r1bcd_65a1df57fa2315c1f83bce37_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(toy_not_in_room() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_sz7w6r1bcd_65a1df57fa2315c1f83bce37_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t#  isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_sz7w6r1bcd_65a1df57fa2315c1f83bce37_FULL_MDP_task9":
    "actions(\n    drop_any();\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_v3u1m1dmzk_65a1b869ffdcc41e1c0e3e3a_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_v3u1m1dmzk_65a1b869ffdcc41e1c0e3e3a_FULL_MDP_task6":
    "actions(\n    pick_up_thing('mail');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_not_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_v3u1m1dmzk_65a1b869ffdcc41e1c0e3e3a_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('playroom');\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t#  isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_v8dkrinkzm_65a18c9e84065b3606fba50b_FULL_MDP_task4":
    "actions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRandomRoom();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tisPersonInRoomEvent();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    !isRobotinRoomEvent('kitchen')\t<(eHandsFull() && thing_in_room('coffee'))>\t#  isPersonInRoomEvent()\t<(eHandsFree() && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_v8dkrinkzm_65a18c9e84065b3606fba50b_FULL_MDP_task5":
    "actions(\n    pick_up_thing('mail');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('porch');\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('porch');\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && isRobotinRoomEvent('porch'))>\t<(thing_in_room('coffee') && thing_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_v8dkrinkzm_65a18c9e84065b3606fba50b_FULL_MDP_task6":
    "actions(\n    pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch')\tthing_in_room('mail') && eHandsFull())>\t##);\n",
  "65a16844ec0758896540ed02_xibkscpiaqi_65a1b86a629a05523800c708_FULL_MDP_task1":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && !isRobotinRoomEvent('kitchen')\t!isRobotinRoomEvent('bedroom')\t!isRobotinRoomEvent('playroom')\t!isRobotinRoomEvent('porch'))>\t##);\n",
  "65a16844ec0758896540ed02_xibkscpiaqi_65a1b86a629a05523800c708_FULL_MDP_task3":
    "triggers(\n    isRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n\n)\n\n\nactions(\n    pick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n    <(toy_in_room()\teHandsFull()\tisRobotinRoomEvent('kitchen') && isRobotinRoomEvent('playroom')\ttoy_not_in_room()\n    eHandsFree())>\t##);\n",
  "65a16844ec0758896540ed02_xibkscpiaqi_65a1b86a629a05523800c708_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && !isRobotinRoomEvent('kitchen'))>\t<(isPersonInRoomEvent() && !isRobotinRoomEvent('bedroom'))>\t<(isPersonInRoomEvent() && !isRobotinRoomEvent('playroom'))>\t<(isPersonInRoomEvent() && !isRobotinRoomEvent('porch'))>\t#  <(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t#);\n",
  "65a16844ec0758896540ed02_y3kyp0x7t4_65a196801ba4a0356d29201d_FULL_MDP_task1":
    "triggers(\n    isPersonInRoomEvent();\n\n)\n\n\nactions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_y3kyp0x7t4_65a196801ba4a0356d29201d_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n  \tpick_up_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(!isRobotinRoomEvent('kitchen') && toy_in_room()\teHandsFree())>\t#  <(isRobotinRoomEvent('kitchen') && toy_not_in_room()\n    eHandsFull())>\t#);\n",
  "65a16844ec0758896540ed02_y3kyp0x7t4_65a196801ba4a0356d29201d_FULL_MDP_task9":
    "actions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_ykt6wq86oij_65a1dae193e28f68a8c0be00_FULL_MDP_task6":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_any();\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    thing_in_room('mail');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    thing_not_in_room('mail')\t##);\n",
  "65a16844ec0758896540ed02_ykt6wq86oij_65a1dae193e28f68a8c0be00_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t#  isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_ykt6wq86oij_65a1dae193e28f68a8c0be00_FULL_MDP_task8":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_17psi517ig_65a1db217be6e728c2c2028c_GOAL_MDP_task1":
    "goals(\n    <(isRobotinRoomEvent('porch') && isPersonNotInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_17psi517ig_65a1db217be6e728c2c2028c_GOAL_MDP_task5":
    "goals(\n    <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#);\n",
  "65a16844ec0758896540ed02_17psi517ig_65a1db217be6e728c2c2028c_GOAL_MDP_task7":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t#  <(isPersonInRoomEvent() && !isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_1y7778rkii_65a18ccdc1351ba1920511d2_GOAL_MDP_task2":
    "goals(\n    isRobotinRoomEvent('bedroom')\t!isRobotinRoomEvent('bedroom')\t#  isRobotinRoomEvent('porch')\ttoy_in_room()\t#);\n",
  "65a16844ec0758896540ed02_1y7778rkii_65a18ccdc1351ba1920511d2_GOAL_MDP_task4":
    "goals(\n    isRobotinRoomEvent('bedroom')\t<(false && false)>\tisRobotinRoomEvent('kitchen')\t<(false && false)>\t#  thing_in_room('coffee')\t#);\n",
  "65a16844ec0758896540ed02_1y7778rkii_65a18ccdc1351ba1920511d2_GOAL_MDP_task6":
    "goals(\n    !isRobotinRoomEvent('bedroom')\tisRobotinRoomEvent('porch')\t#  thing_in_room('mail')\t#);\n",
  "65a16844ec0758896540ed02_2ergth4dv4_65a1dada18e4e0064e4df641_GOAL_MDP_task1":
    "goals(\n    isPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_2ergth4dv4_65a1dada18e4e0064e4df641_GOAL_MDP_task3":
    "goals(\n    <(toy_not_in_room() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_2ergth4dv4_65a1dada18e4e0064e4df641_GOAL_MDP_task4":
    "goals(\n    <(thing_in_room('coffee') && isPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_6jslo7lnxjf_65a17c326ab1cf34ac005503_GOAL_MDP_task1":
    "goals(\n    isPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_6jslo7lnxjf_65a17c326ab1cf34ac005503_GOAL_MDP_task2":
    "goals(\n    <(toy_in_room() && isRobotinRoomEvent('playroom'))>\t##);\n",
  "65a16844ec0758896540ed02_6jslo7lnxjf_65a17c326ab1cf34ac005503_GOAL_MDP_task7":
    "goals(\n    <(isPersonNotInRoomEvent() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_c4b3sd5npri_65a1db18c1b9bd7353547072_GOAL_MDP_task2":
    "goals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_c4b3sd5npri_65a1db18c1b9bd7353547072_GOAL_MDP_task5":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_c4b3sd5npri_65a1db18c1b9bd7353547072_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_kotapvxrodl_65a1dce6faaefa19031d0fa1_GOAL_MDP_task0":
    "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_kotapvxrodl_65a1dce6faaefa19031d0fa1_GOAL_MDP_task6":
    "goals(\n    <(isRobotinRoomEvent('porch') && thing_not_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_kotapvxrodl_65a1dce6faaefa19031d0fa1_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_njyi5qn3ak_65a1a07441c74f5d31cc45ce_GOAL_MDP_task0":
    "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_njyi5qn3ak_65a1a07441c74f5d31cc45ce_GOAL_MDP_task1":
    "goals(\n    isPersonInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_njyi5qn3ak_65a1a07441c74f5d31cc45ce_GOAL_MDP_task5":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#  <(toy_in_room() && isRobotinRoomEvent('bedroom'))>\t#);\n",
  "65a16844ec0758896540ed02_ohheswx81v_65a1db21f0287bdcaf28dfac_GOAL_MDP_task3":
    "goals(\n    <(toy_in_room() && !isRobotinRoomEvent('kitchen'))>\t<(isRobotinRoomEvent('kitchen') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_ohheswx81v_65a1db21f0287bdcaf28dfac_GOAL_MDP_task4":
    "goals(\n    <(thing_in_room('coffee') && isPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_ohheswx81v_65a1db21f0287bdcaf28dfac_GOAL_MDP_task9":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_xlp4ai6dm9_65a1dad9e92ac510f8deb114_GOAL_MDP_task0":
    "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_xlp4ai6dm9_65a1dad9e92ac510f8deb114_GOAL_MDP_task4":
    "goals(\n    <(isPersonInRoomEvent() && thing_in_room('coffee'))>\t#  eHandsFree()\t#);\n",
  "65a16844ec0758896540ed02_xlp4ai6dm9_65a1dad9e92ac510f8deb114_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_xs4rx32yhv_65a19dd5d95e64b0f574330d_GOAL_MDP_task1":
    "goals(\n    <(!isRobotinRoomEvent('kitchen') && isPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_xs4rx32yhv_65a19dd5d95e64b0f574330d_GOAL_MDP_task2":
    "goals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_xs4rx32yhv_65a19dd5d95e64b0f574330d_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_yz43lgpye7_65a1b86b60b1e46f4e1d17c1_GOAL_MDP_task6":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t);\n",
  "65a16844ec0758896540ed02_yz43lgpye7_65a1b86b60b1e46f4e1d17c1_GOAL_MDP_task7":
    "goals(\n    isRobotinRoomEvent('porch')\t##);\n",
  "65a16844ec0758896540ed02_yz43lgpye7_65a1b86b60b1e46f4e1d17c1_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_zqsk8877wyl_65a1dad918e4e0064e4df63f_GOAL_MDP_task0":
    "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_zqsk8877wyl_65a1dad918e4e0064e4df63f_GOAL_MDP_task5":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_zqsk8877wyl_65a1dad918e4e0064e4df63f_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_0is4p4zjek_65a1b868889d045da0546805_SEQ_task1":
    "moveRobotToRoom('porch');moveRobotToRoom('bedroom');moveRobotToRoom('kitchen');moveRobotToRoom('bedroom');moveRobotToRoom('playroom');",
  "65a16844ec0758896540ed02_0is4p4zjek_65a1b868889d045da0546805_SEQ_task7":
    "moveRobotToRoom('kitchen');if (isRobotinRoomEvent('kitchen')) {\n  moveRobotToRoom('porch');moveRobotToRoom('kitchen');} else {\n}\n",
  "65a16844ec0758896540ed02_0is4p4zjek_65a1b868889d045da0546805_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_5utr3hsp8x_65a18115c4667f1af45aa44f_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_5utr3hsp8x_65a18115c4667f1af45aa44f_SEQ_task7":
    "while (true) {\n  if (!isRobotinRoomEvent('kitchen')) {\n    moveRobotToRoom('kitchen');}\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n}\n",
  "65a16844ec0758896540ed02_5utr3hsp8x_65a18115c4667f1af45aa44f_SEQ_task8":
    "moveRobotToRoom('porch');pick_up_any();\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_6m8umbn0ty_65a1dadbfc75f965e7fbb52a_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_6m8umbn0ty_65a1dadbfc75f965e7fbb52a_SEQ_task3":
    "while (toy_not_in_room\t) {\n  moveRobotToRoom('kitchen');pick_up_toy();\n  \tmoveRobotToRandomRoom();drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_6m8umbn0ty_65a1dadbfc75f965e7fbb52a_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_7vo5m8zf9n_65a1af65ea682612b352ece8_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n}\n",
  "65a16844ec0758896540ed02_7vo5m8zf9n_65a1af65ea682612b352ece8_SEQ_task2":
    "moveRobotToRoom('kitchen');if (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('bedroom');if (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('porch');if (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');drop_any();\n",
  "65a16844ec0758896540ed02_7vo5m8zf9n_65a1af65ea682612b352ece8_SEQ_task7":
    "while (true) {\n  moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n}\n",
  "65a16844ec0758896540ed02_7zprory6qjk_65a1dae06bf9a9f5140b11f8_SEQ_task2":
    "moveRobotToRoom('kitchen');if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('bedroom');}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('porch');}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('playroom');}\n",
  "65a16844ec0758896540ed02_7zprory6qjk_65a1dae06bf9a9f5140b11f8_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_7zprory6qjk_65a1dae06bf9a9f5140b11f8_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\nif (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_bzj6sjna38h_65a1941ed95e64b0f5743125_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_bzj6sjna38h_65a1941ed95e64b0f5743125_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \t} else {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_bzj6sjna38h_65a1941ed95e64b0f5743125_SEQ_task6":
    "moveRobotToRoom('porch');while (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \tmoveRobotToRoom('porch');}\n",
  "65a16844ec0758896540ed02_cspgsrz670g_65a18cc79ecff6408856186d_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_cspgsrz670g_65a18cc79ecff6408856186d_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_thing('coffee');\n\tmoveRobotToRoom('porch');if (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('bedroom');}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('playroom');}\ndrop_any();\n",
  "65a16844ec0758896540ed02_cspgsrz670g_65a18cc79ecff6408856186d_SEQ_task7":
    "while (true) {\n  if (!isRobotinRoomEvent('kitchen')) {\n    moveRobotToRoom('kitchen');} else if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n}\n",
  "65a16844ec0758896540ed02_hktr8tcatk_65a190fa3c1821d69d0c2565_SEQ_task2":
    "drop_any();\n",
  "65a16844ec0758896540ed02_hktr8tcatk_65a190fa3c1821d69d0c2565_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \t}\nif (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \t}\nif (thing_in_room('coffee')) {\n}\nif (eHandsFull()) {\n  moveRobotToRoom('kitchen');drop_any();\n  \t} else {\n}\n",
  "65a16844ec0758896540ed02_hktr8tcatk_65a190fa3c1821d69d0c2565_SEQ_task7":
    "moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();if (isPersonInRoomEvent()) {\n    moveRobotToRoom('kitchen');}\n}\n",
  "65a16844ec0758896540ed02_i8ljawj8kv_65a179e3c8e80dc721ffe9ae_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_i8ljawj8kv_65a179e3c8e80dc721ffe9ae_SEQ_task6":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \tmoveRobotToRoom('porch');pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \tmoveRobotToRoom('porch');pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_i8ljawj8kv_65a179e3c8e80dc721ffe9ae_SEQ_task9":
    "moveRobotToRoom('bedroom');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \t} else {\n}\nif (thing_in_room('coffee')) {\n  moveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_mijj278nnp_65a1ca84b530fad7d6dea8b0_SEQ_task7":
    "moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n  moveRobotToRoom('porch');} else {\n  moveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_mijj278nnp_65a1ca84b530fad7d6dea8b0_SEQ_task8":
    "moveRobotToRoom('porch');pick_up_any();\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_mijj278nnp_65a1ca84b530fad7d6dea8b0_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_any();\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_ms5a0t6yds_65a1dade83e9bfcacd4df9fe_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('kitchen');if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');drop_any();\n    \t}\n  moveRobotToRoom('porch');if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');drop_any();\n    \t}\n  moveRobotToRoom('bedroom');if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');drop_any();\n    \t}\n}\n",
  "65a16844ec0758896540ed02_ms5a0t6yds_65a1dade83e9bfcacd4df9fe_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_thing('coffee');\n\tmoveRobotToRoom('playroom');drop_any();\n",
  "65a16844ec0758896540ed02_ms5a0t6yds_65a1dade83e9bfcacd4df9fe_SEQ_task8":
    "while (true) {\n  moveRobotToRoom('porch');pick_up_any();\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_net5w3p5my_65a1db19d95e64b0f5743fa0_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_net5w3p5my_65a1db19d95e64b0f5743fa0_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');}\nif (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_net5w3p5my_65a1db19d95e64b0f5743fa0_SEQ_task6":
    "moveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRandomRoom();drop_any();\n\twhile (thing_in_room('mail')) {\n  moveRobotToRoom('porch');pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_nq21nkx15uf_65a1daf3ea682612b352f6c2_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_nq21nkx15uf_65a1daf3ea682612b352f6c2_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_thing('coffee');\n\tmoveRobotToRoom('playroom');drop_any();\n",
  "65a16844ec0758896540ed02_nq21nkx15uf_65a1daf3ea682612b352f6c2_SEQ_task7":
    "moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();}\nif (isPersonNotInRoomEvent()\t) {\n  moveRobotToRoom('kitchen');} else {\n}\n",
  "65a16844ec0758896540ed02_t78k2gh1bhk_65a192d13830fdcc6796bcec_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_t78k2gh1bhk_65a192d13830fdcc6796bcec_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_t78k2gh1bhk_65a192d13830fdcc6796bcec_SEQ_task7":
    "while (true) {\n  moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n    moveRobotToRoom('playroom');}\n}\n",
  "65a16844ec0758896540ed02_xog59id0vbj_65a192cb0652b97162512e9c_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_xog59id0vbj_65a192cb0652b97162512e9c_SEQ_task7":
    "moveRobotToRoom('kitchen');while (!isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();}\n",
  "65a16844ec0758896540ed02_xog59id0vbj_65a192cb0652b97162512e9c_SEQ_task9":
    "moveRobotToRandomRoom();if (thing_not_in_room('coffee')\t) {\n  moveRobotToRandomRoom();}\nif (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_xr8zxzmrzlf_65a1a275c4bdba3a0500c3ec_SEQ_task2":
    "moveRobotToRandomRoom();if (toy_in_room()) {\n  moveRobotToRoom('playroom');pick_up_toy();\n  \t}\n",
  "65a16844ec0758896540ed02_xr8zxzmrzlf_65a1a275c4bdba3a0500c3ec_SEQ_task6":
    "moveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRandomRoom();drop_any();\n\tmoveRobotToRoom('porch');while (!thing_not_in_room('mail')\t) {\n  moveRobotToRoom('porch');pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_xr8zxzmrzlf_65a1a275c4bdba3a0500c3ec_SEQ_task8":
    "moveRobotToRoom('porch');if ((thing_in_room('mail') || thing_in_room('coffee'))) {\n  pick_up_any();\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_0q646o679a_65a1dadf133ddfc5d19c51f1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (false && false) {\n      trigs.push(\n        function(){\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0q646o679a_65a1dadf133ddfc5d19c51f1_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0q646o679a_65a1dadf133ddfc5d19c51f1_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (handsFull() && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_447nzhbbuf_65a1b86aabbc573eb8ce9e09_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull() && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (handsFull() && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_447nzhbbuf_65a1b86aabbc573eb8ce9e09_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_447nzhbbuf_65a1b86aabbc573eb8ce9e09_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_lizn038wtg_65a18c9a1af2b330138f6fa3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull() && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_lizn038wtg_65a18c9a1af2b330138f6fa3_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_lizn038wtg_65a18c9a1af2b330138f6fa3_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_qrnpiyff04g_65a18ca4fb3e77fc07b0811c_TAP_task0":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_qrnpiyff04g_65a18ca4fb3e77fc07b0811c_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinRoom('playroom') && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_qrnpiyff04g_65a18ca4fb3e77fc07b0811c_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_y9p73pm9h4_65a1b86a93e28f68a8c0b740_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_y9p73pm9h4_65a1b86a93e28f68a8c0b740_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_y9p73pm9h4_65a1b86a93e28f68a8c0b740_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_any();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotOutOf('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_z2yvtd37df_65a1dc03c730f0722538acce_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_any();\n\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_z2yvtd37df_65a1dc03c730f0722538acce_TAP_task7":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isPersonInRoom() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_z2yvtd37df_65a1dc03c730f0722538acce_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
};

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
  console.log("can't find s");
}

function get_current_state(state_ids, taskNum) {
  person_location = null;
  if (taskNum == 1 || taskNum == 4) {
    person_location = person.room;
  }

  toy_whereabouts = [];
  for (let toy in toys_in_room) {
    toy_whereabouts = toy_whereabouts.concat(toys_in_room[toy]);
  }

  all_objs = [null, null, null];
  for (let toy in toy_whereabouts) {
    if (toy_whereabouts[toy]["thing_id"] == "mail") {
      all_objs[0] = toy_whereabouts[toy]["room"];
    } else if (toy_whereabouts[toy]["thing_id"] == "coffee") {
      all_objs[1] = toy_whereabouts[toy]["room"];
    } else if (all_objs[2] == null) {
      all_objs[2] = toy_whereabouts[toy]["room"];
    } else {
      all_objs.push(toy_whereabouts[toy]["room"]);
    }
  }
  if (all_objs.length < 3) {
    all_objs.push(null);
  }

  if (taskNum == 6) {
    all_objs = [[], null, null];
    for (var m in toy_whereabouts) {
      if (toy_whereabouts[m] == null) {
        all_objs[0].push(null);
      } else {
        all_objs[0].push(toy_whereabouts[m]["room"]);
      }
    }
  }

  held_obj = null;
  if (robot_c.holding != null) {
    if (
      robot_c.holding.thing_id != "mail" &&
      robot_c.holding.thing_id != "coffee"
    ) {
      held_obj = "toy";
    } else {
      held_obj = robot_c.holding.thing_id;
    }
  }
  return find_state(
    state_ids,
    robot_c.room,
    all_objs,
    held_obj,
    person_location
  );
}

function initApi(interpreter, globalObject) {
  var wrapper;

  wrapper = function (room, callback) {
    // resolveAfter3Seconds().then(() => {
    moveRobotToRoom(room);
    callback();
    // });
  };
  interpreter.setProperty(
    globalObject,
    "moveRobotToRoom",
    interpreter.createAsyncFunction(wrapper)
  );

  wrapper = function () {
    drop_toy();
  };
  interpreter.setProperty(
    globalObject,
    "drop_toy",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return inSameRoom();
  };
  interpreter.setProperty(
    globalObject,
    "inSameRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return is_mail_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_mail_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return is_coffee_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_coffee_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    pick_up_toy();
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_toy",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    pick_up_any();
  };

  interpreter.setProperty(
    globalObject,
    "pick_up_any",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    drop_any();
  };

  interpreter.setProperty(
    globalObject,
    "drop_any",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    pick_up_thing(thing);
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_thing",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isRobotinAnyRoom();
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinAnyRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    drop_thing(thing);
  };
  interpreter.setProperty(
    globalObject,
    "drop_thing",
    interpreter.createNativeFunction(wrapper)
  );

  // wrapper = function (thing) {
  //   drop_thing_disappears(thing);
  // };
  // interpreter.setProperty(
  //   globalObject,
  //   "drop_thing_disappears",
  //   interpreter.createNativeFunction(wrapper)
  // );

  wrapper = function () {
    return start();
  };
  interpreter.setProperty(
    globalObject,
    "start",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotOutOf(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotOutOf",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotOutOfEvent(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotOutOfEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return is_toy_in_room(room);
  };
  interpreter.setProperty(
    globalObject,
    "is_toy_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotinRoom(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (room) {
    return isRobotinRoomEvent(room);
  };
  interpreter.setProperty(
    globalObject,
    "isRobotinRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersoninRoom();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonInRoom",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersonInRoomEvent();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonInRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return isPersonNotInRoomEvent();
  };
  interpreter.setProperty(
    globalObject,
    "isPersonNotInRoomEvent",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return eHandsFree();
  };
  interpreter.setProperty(
    globalObject,
    "eHandsFree",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return handsFree();
  };
  interpreter.setProperty(
    globalObject,
    "handsFree",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return toy_in_room();
  };
  interpreter.setProperty(
    globalObject,
    "toy_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    return thing_in_room(thing);
  };
  interpreter.setProperty(
    globalObject,
    "thing_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (thing) {
    return thing_not_in_room(thing);
  };
  interpreter.setProperty(
    globalObject,
    "thing_not_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return toy_not_in_room();
  };
  interpreter.setProperty(
    globalObject,
    "toy_not_in_room",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return eHandsFull();
  };
  interpreter.setProperty(
    globalObject,
    "eHandsFull",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function () {
    return handsFull();
  };
  interpreter.setProperty(
    globalObject,
    "handsFull",
    interpreter.createNativeFunction(wrapper)
  );

  wrapper = function (callback) {
    // resolveAfter3Seconds().then(() => {
    moveRobotToRandomRoom();
    callback();
    // });
  };
  interpreter.setProperty(
    globalObject,
    "moveRobotToRandomRoom",
    interpreter.createAsyncFunction(wrapper)
  );
}

function parse_key(key) {
  if (key.includes("MDP")) {
    const parts = key.split("_");
    // console.log(parts[(0, -3)]);
    const key_id = parts.slice(0, parts.length - 3).join("_");
    const key_format = parts.slice(3, parts.length - 1).join("_");
    const key_task = parts[parts.length - 1];
    return [key_id, key_format, key_task];
  }
  arr = key.split("_");
  //   console.log(arr[(0, arr.length - 1)]);
  const key_id = arr.slice(0, arr.length - 2).join("_");
  const key_format = arr.slice(-2)[0];
  const key_task = arr.slice(-1)[0];
  //   url.searchParams.append("format", key_format);
  return [key_id, key_format, key_task];
}

function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom", "porch"];
  i = Math.floor(Math.random() * rooms.length);
  return rooms[i];
}

let robot_places = [];

function run_key(k, i) {
  return new Promise((resolve, reject) => {
    let [key_id, key_format, key_task] = parse_key(k);

    console.log("task", key_task);
    console.log("format", key_format);
    console.log("key", key_id);

    let code = code_dict[k];
    // let code =
    //   "goals(\n    (isRobotinRoomEvent('kitchen') && toy_not_in_room())\t##);\n";
    // "goals(\n    ((isRobotinRoomEvent('kitchen') && thing_in_room('mail')) || (isRobotinRoomEvent('bedroom') && thing_in_room('coffee')))\t##);\n"
    // let code = "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n";
    // let code =
    //   "moveRobotToRoom('porch');if (thing_in_room('mail')) {pick_up_thing('mail');moveRobotToRoom('kitchen');drop_any();}";

    if (key_task != "task1" && key_task != "task7" && key_format == "TAP") {
      var closingBraceIndex = code.lastIndexOf("}");
      code = code.slice(0, closingBraceIndex) + "    else { break; }\n  }";
    }
    console.log(code);

    const taskNum = key_task.slice(-1);
    console.log(taskNum);
    if (key_format == "FULL_MDP") {
      if (taskNum == 1 || taskNum == 7) {
        out = run_rl(code, taskNum);
        code = "while(true){" + out + "}";
        // return;
      } else {
        let [transition_table, state_ids] = run_rl(code, taskNum);
        // console.log("mdp", code);
        code = "";
        // console.log(state_ids);
        let current_state = get_current_state(state_ids, taskNum);
        let prv_action = null;
        if (current_state) {
          let [cur_action, next_state, cur_val] =
            transition_table[current_state];

          while (cur_action != prv_action) {
            code += cur_action;
            prv_action = cur_action;
            current_state = get_current_state(state_ids, taskNum);
            [cur_action, next_state, cur_val] = transition_table[next_state];
          }
        }
      }
      // console.log(code);
    }

    if (key_format == "GOAL_MDP") {
      if (taskNum == 1 || taskNum == 7) {
        out = run_mdp(code, taskNum);
        code = "while(true){" + out + "}";
        // return;
      } else {
        [transition_table, state_ids] = run_mdp(code, taskNum);
        code = "";
        // console.log(state_ids);
        // console.log(transition_table);
        // console.log("mdp", code);
        let current_state = get_current_state(state_ids, taskNum);
        let prv_action = null;
        // console.log(current_state);
        if (current_state) {
          let [cur_action, next_state, cur_val] =
            transition_table[current_state];

          while (cur_action != prv_action) {
            code += cur_action;
            prv_action = cur_action;
            current_state = get_current_state(state_ids, taskNum);
            [cur_action, next_state, cur_val] = transition_table[next_state];
          }
        }
      }
    }

    console.log(code);
    // resetLocs();

    let time = 3000;
    // if (key_task == "task1" || key_task == "task7") {
    //   time = 3000;
    // }
    // if (key_task == "task7" && key_format == "GOAL_MDP") {
    //   time = 4000;
    // }
    let count = 0;
    let same_room = 0;
    let kitchen_room = 0;

    if (key_format == "SEQ" && key_task != "task1") {
      time = 500;
    }

    // if (key_task == "task2" && key_format != "SEQ") {
    //   time = 10000;
    // }

    // code = "while (true) {  moveRobotToRoom('kitchen');  	}";

    try {
      var myInterpreter = new Interpreter(code, initApi);
    } catch (e) {
      resetLocs(
        key_id,
        key_task,
        key_format,
        i,
        same_room,
        kitchen_room,
        count
      );
      resolve();
    }

    function nextStep() {
      //   console.log("places", robot_places);
      //   console.log(time);
      if (time == 0) {
        console.log("times up!");
      }
      if (myInterpreter.step() && time != 0) {
        // nextStep();
        setTimeout(nextStep, 0);
        // if (key_task == "task1" || key_format == "SEQ" || key_task == "task2") {

        // if (time % 80 == 0 && (key_task == "task1" || key_task == "task7")) {
        //   if (robot_c.room == person.room) {
        //     same_room += 1;
        //   } else if (robot_c.room == "kitchen") {
        //     kitchen_room += 1;
        //   }
        //   count += 1;
        if (key_task == "task1" || key_task == "task7") {
          movePerson();
        }
        // }
        time -= 1;
        // }
        // console.log(time);
        // pids.push(pid);
      } else {
        // console.log("DONE");
        // pidList = [];
        console.log(count);
        console.log(same_room);
        resetLocs(
          key_id,
          key_task,
          key_format,
          i
          // same_room,
          // kitchen_room,
          // count
        );
        resolve();
      }
    }

    nextStep();
  });
}

function removeScript(script_id) {
  return new Promise((resolve, reject) => {
    var scriptToRemove = document.getElementById(script_id);
    console.log(scriptToRemove);
    var parent = scriptToRemove.parentElement;
    parent.removeChild(scriptToRemove);
    resolve();
  });
}

const KITCHEN = [80, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [280, 320];
const PORCH = [20, 320];
const rooms = {
  kitchen: KITCHEN,
  bedroom: BEDROOM,
  playroom: PLAYROOM,
  porch: PORCH,
};

let pidList = [];

function customSort(a, b) {
  const aContainsMDP = a.includes("MDP");
  const bContainsMDP = b.includes("MDP");

  if (aContainsMDP && !bContainsMDP) {
    return 1; // Place a after b
  }
  if (!aContainsMDP && bContainsMDP) {
    return -1; // Place a before b
  }

  // If both or neither contain MDP, maintain original order
  return 0;
}

const keys = Object.keys(code_dict).sort(customSort);
let task0_keys = keys.filter((key) => key.includes("task0"));
let task1_keys = keys.filter((key) => key.includes("task1"));
// task1_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_exviy7b3gr_6581fb6ca0e561efd3491ae7_GOAL_MDP_task1",
//   "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_exviy7b3gr_6581fb6ca0e561efd3491ae7_GOAL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_GOAL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task1",
// ];
let task2_keys = keys.filter((key) => key.includes("task2"));
task2_keys = [
  "65a16844ec0758896540ed02_0q646o679a_65a1dadf133ddfc5d19c51f1_TAP_task2",
];
let task3_keys = keys.filter((key) => key.includes("task3"));
// console.log(task3_keys);
// task3_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_10yz4utiej_6581eb036c1dd060aa9bf39e_TAP_task3",
// "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_task3",
// "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_task3",
// "657dfd2f13ec3b61c3fa9f0c_k9fmc1zx0gg_6581ec16ff0d86cb8d485828_GOAL_MDP_task3",
// ];
let task4_keys = keys.filter((key) => key.includes("task4"));
let task5_keys = keys.filter((key) => key.includes("task5"));
// task5_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_gths71fbm9_658e2884e780d4b7e3da87aa_FULL_MDP_task5",
//   // "657dfd2f13ec3b61c3fa9f0c_zyppr92k8w_65820d984518b9c5df7076a0_SEQ_task5",
// ];
let task6_keys = keys.filter((key) => key.includes("task6"));
// task6_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_task6",
//   // "657dfd2f13ec3b61c3fa9f0c_zyppr92k8w_65820d984518b9c5df7076a0_SEQ_task6",
// ];
let task7_keys = keys.filter((key) => key.includes("task7"));
// task7_keys = [
//   // "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task7",
//   // "657dfd2f13ec3b61c3fa9f0c_cpqyh7kzcd_658dc58f58ab02636c14703e_TAP_task7",
//   "657dfd2f13ec3b61c3fa9f0c_ezy59w3764_6581d20144e11bc83e5b5ee9_FULL_MDP_task7",
//   // "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task7",
// ];
let task8_keys = keys.filter((key) => key.includes("task8"));
let task9_keys = keys.filter((key) => key.includes("task9"));

async function run_one_loop(key, j) {
  let [key_id, key_format, key_task] = parse_key(key);
  console.log(key_id);
  n = 1;
  if (key_task == "task1" || key_task == "task7") {
    n = 1;
  }
  for (let i = 0; i < n; i++) {
    // if (key_format == "TAP" || key_format == "SEQ") {
    await run_key(key, i);
    // }
    // postMessage(`Worker A - Iteration ${i} ${j}`);
  }
}

async function test(keys) {
  console.log(keys.length);
  for (let j = 0; j < keys.length; j++) {
    console.log(keys[j]);
    await run_one_loop(keys[j], j);
  }
  let i = 0;
  // postMessage(`Worker A - Iteration ${i}`);
  // console.log(jsonData);
  // self.postMessage({ type: "download", data: jsonData });
}

// Create a Blob with the JSON data

// importScripts("settings/task3_nodisp.js");
importScripts("settings/task2_nodisp.js");
// importScripts("settings/task1_nodisp.js");
// importScripts("settings/task0_nodisp.js");
// importScripts("settings/task4_nodisp.js");
// importScripts("settings/task6_nodisp.js");
// importScripts("settings/task5_nodisp.js");
// importScripts("settings/task7_nodisp.js");
// importScripts("settings/task9_nodisp.js");

test(task2_keys);
