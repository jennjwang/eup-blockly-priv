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

//first pilot
// let code_dict = {
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "644b58f7c74e29dea19413b8_yaouc7ijh3_64cd3598cad64db9f1f46a1e_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && eHandsFull())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotOutOfEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
//   "644b58f7c74e29dea19413b8_yaouc7ijh3_64cd3598cad64db9f1f46a1e_FULL_MDP_task3":
//     "triggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotOutOfEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \tisRobotOutOfEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotOutOfEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \tisRobotOutOfEvent('playroom');\n\n)\n\n\nactions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && eHandsFull())\n)\n",
//   "644b58f7c74e29dea19413b8_yaouc7ijh3_64cd3598cad64db9f1f46a1e_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_0396ax68i7_64cd56c444b0e60067b11589_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_4bu3lvj1vg_64dfc34fb3a4668ed7172ad1_FULL_MDP_task1":
//     "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (!isRobotinRoomEvent('bedroom') && isPersonNotInRoomEvent())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n\n)\n",
//   "64cd50590f37fc832720ee73_4bu3lvj1vg_64dfc34fb3a4668ed7172ad1_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_4bu3lvj1vg_64dfc34fb3a4668ed7172ad1_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_4bu3lvj1vg_64dfc34fb3a4668ed7172ad1_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('playroom');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_4dz046czr5_64cd6df0dc81114fff796747_FULL_MDP_task1":
//     "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_4dz046czr5_64cd6df0dc81114fff796747_FULL_MDP_task2":
//     "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ngoals(\n  toy_not_in_room()\n)\n\n\ntriggers(\n    eHandsFull();\n\n)\n",
//   "64cd50590f37fc832720ee73_4dz046czr5_64cd6df0dc81114fff796747_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  eHandsFull()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "64cd50590f37fc832720ee73_4dz046czr5_64cd6df0dc81114fff796747_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_FULL_MDP_task2":
//     "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
//   "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task2":
//     "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFull();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_tutorial":
//     "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
//   "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (isPersonInRoomEvent() && isPersonNotInRoomEvent())\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_di09t140x1_64cd63d96f3154c0e0f9e503_FULL_MDP_task1":
//     "actions(\n    moveRobotToRoom('playroom');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_di09t140x1_64cd63d96f3154c0e0f9e503_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('playroom');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_di09t140x1_64cd63d96f3154c0e0f9e503_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  isRobotinRoomEvent('playroom')\n)\n\n\ntriggers(\n    eHandsFull();\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotOutOfEvent('playroom');\n  \tisRobotOutOfEvent('kitchen');\n\n)\n",
//   "64cd50590f37fc832720ee73_di09t140x1_64cd63d96f3154c0e0f9e503_FULL_MDP_tutorial":
//     "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('kitchen'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotOutOfEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_FULL_MDP_task3":
//     "triggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n\n\nactions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_FULL_MDP_tutorial":
//     "triggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n\n\nactions(\n    moveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_he3klemfo0f_64dfba2d261eaad29e67d9e4_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_he3klemfo0f_64dfba2d261eaad29e67d9e4_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "64cd50590f37fc832720ee73_he3klemfo0f_64dfba2d261eaad29e67d9e4_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('bedroom');\n  \teHandsFull();\n\n)\n",
//   "64cd50590f37fc832720ee73_he3klemfo0f_64dfba2d261eaad29e67d9e4_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_jjzc111y0v_64cd57212d48a041a4c30cb4_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_kw3hxj8wcq_64dfdc7d4702df9604d9f4ac_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  isRobotinRoomEvent('kitchen')\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n\n)\n",
//   "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_FULL_MDP_task2":
//     "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_FULL_MDP_task3":
//     "actions(\n    drop_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotOutOfEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
//   "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_FULL_MDP_tutorial":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
//   "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_FULL_MDP_task2":
//     "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
//   "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_FULL_MDP_tutorial":
//     "actions(\n    drop_toy();\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_xgfntw78b9h_64dfdc7fc804c68ba7e87b7b_FULL_MDP_tutorial":
//     "triggers(\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\nactions(\n\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && ((!isRobotinRoomEvent('kitchen') && !isRobotinRoomEvent('bedroom'))))\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "644b58f7c74e29dea19413b8_n1ue358df6k_64cced03e3c6bf4f3e67a07a_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_GOAL_MDP_task1":
//     "goals(\n  (isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())\n)\n",
//   "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
//   "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
//   "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_GOAL_MDP_task1":
//     "goals(\n  ((( || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
//   "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_GOAL_MDP_task1":
//     "goals(\n  (isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())\n)\n",
//   "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_h33j55uqec_64cd57bd96a55c17525d9f9c_GOAL_MDP_task3":
//     "goals(\n  (((eHandsFull() || eHandsFree())) && ((toy_in_room() && isRobotinRoomEvent('playroom'))))\n)\n",
//   "64cd50590f37fc832720ee73_h33j55uqec_64cd57bd96a55c17525d9f9c_GOAL_MDP_tutorial":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
//   "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_GOAL_MDP_task1":
//     "goals(\n  (((isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('playroom'))))) && isPersonNotInRoomEvent())\n)\n",
//   "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_i9e67ufja5_64dfba1e671c0691a677f4b8_GOAL_MDP_tutorial":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
//   "64cd50590f37fc832720ee73_if63b3bkto_64dfcfa39cf138bfce82fd00_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_if63b3bkto_64dfcfa39cf138bfce82fd00_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_if63b3bkto_64dfcfa39cf138bfce82fd00_GOAL_MDP_task3":
//     "goals(\n  undefined\n)\n",
//   "64cd50590f37fc832720ee73_if63b3bkto_64dfcfa39cf138bfce82fd00_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_GOAL_MDP_task1":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
//   "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task1":
//     "goals(\n  isRobotinRoomEvent('bedroom')\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_uv2htlcduy_64dfba1f10bddcb3e7c9e2a2_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_uv2htlcduy_64dfba1f10bddcb3e7c9e2a2_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_uv2htlcduy_64dfba1f10bddcb3e7c9e2a2_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_uv2htlcduy_64dfba1f10bddcb3e7c9e2a2_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_GOAL_MDP_task1":
//     "goals(\n  isPersonInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
//   "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_x4n32dhdem_64dfba14fe39b9ac034b892d_GOAL_MDP_task1":
//     "goals(\n  (!isRobotinRoomEvent('bedroom') && ((!isRobotinRoomEvent('playroom') && !isRobotinRoomEvent('kitchen'))))\n)\n",
//   "64cd50590f37fc832720ee73_x4n32dhdem_64dfba14fe39b9ac034b892d_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_x4n32dhdem_64dfba14fe39b9ac034b892d_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
//   "64cd50590f37fc832720ee73_x4n32dhdem_64dfba14fe39b9ac034b892d_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xbnl8xp2wni_64dfdd4de565a27a44cb3aad_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_xbnl8xp2wni_64dfdd4de565a27a44cb3aad_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xbnl8xp2wni_64dfdd4de565a27a44cb3aad_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xbnl8xp2wni_64dfdd4de565a27a44cb3aad_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xtz47noxfx_64dfba1b97ba97b21829a322_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_xtz47noxfx_64dfba1b97ba97b21829a322_GOAL_MDP_task2":
//     "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xtz47noxfx_64dfba1b97ba97b21829a322_GOAL_MDP_task3":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
//   "64cd50590f37fc832720ee73_xtz47noxfx_64dfba1b97ba97b21829a322_GOAL_MDP_tutorial":
//     "goals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n",
//   "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_SEQ_task1":
//     "while (!isPersonNotInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
//   "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_SEQ_task2":
//     "if (!isRobotinRoomEvent('kitchen')) {\n  drop_toy();\n  \t}\ndrop_toy();\n",
//   "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_SEQ_task1":
//     "moveRobotToRoom('kitchen');\n\nmoveRobotToRoom('bedroom');\n",
//   "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_SEQ_task2":
//     "moveRobotToRoom('bedroom');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_SEQ_task3":
//     "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (false) {\n  pick_up_toy();\n  \tpick_up_toy();\n  \tpick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('playroom');\n",
//   "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t} else {\n  }\n}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task2":
//     "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3":
//     "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_tutorial":
//     "",
//   "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_SEQ_task2":
//     "while (!((isRobotinRoomEvent('playroom') && toy_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    if ((eHandsFull() && isRobotinRoomEvent('playroom'))) {\n      drop_toy();\n      \t}\n  }\n}\n",
//   "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_SEQ_task3":
//     "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && !isRobotinRoomEvent('playroom'))) {\n    pick_up_toy();\n    \t} else {\n    drop_toy();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  if (eHandsFree()) {\n    pick_up_toy();\n    \t}\n}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_5l9zljc76o_64cd58418d9bb8091ebaa146_SEQ_task2":
//     "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
//   "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_SEQ_task1":
//     "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
//   "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_SEQ_task2":
//     "while (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRandomRoom();\n  \t}\n",
//   "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_SEQ_task3":
//     "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_SEQ_task1":
//     "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (true) {\n  moveRobotToRandomRoom();\n  \t}\n",
//   "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_SEQ_task2":
//     "moveRobotToRoom('kitchen');\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
//   "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_SEQ_task3":
//     "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_SEQ_task1":
//     "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \twhile (true) {\n  }\n}\n",
//   "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_SEQ_task2":
//     "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t} else {\n}\nmoveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_SEQ_task3":
//     "while (true) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_SEQ_task1":
//     "moveRobotToRoom('bedroom');\n",
//   "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_SEQ_task2":
//     "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
//   "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_SEQ_task3":
//     "while (true) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_jhp1zlvtri_64dfba272602f0541f7edef3_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task2":
//     "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\npick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_task3":
//     "moveRobotToRoom('kitchen');\n\twhile (!toy_not_in_room()) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \t}\n",
//   "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task2":
//     "while (!((toy_in_room() && eHandsFree()))) {\n  moveRobotToRandomRoom();\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task3":
//     "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_m13bsk6kxj_64dfba2272a3c2e14a5ad56b_SEQ_tutorial":
//     "!isRobotinRoomEvent('bedroom');\n\ndrop_toy();\n\tmoveRobotToRandomRoom();\n\ntoy_in_room();\n",
//   "64cd50590f37fc832720ee73_r9mgft7yvc_64dfce61c1553e5b6f7ededc_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_SEQ_task1":
//     "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t} else {\n}\n",
//   "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_SEQ_task2":
//     "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_SEQ_task3":
//     "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
//   "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_SEQ_tutorial":
//     "moveRobotToRoom('playroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n\tdrop_toy();\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (false && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFree()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_jw3cgzzomx_64cd56d24e61b84031ec3d89_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_lpwklvo4xc_64cd568e433e4f8ac1dd96a4_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_nhmk9enqyg_64dfdc7fcc333010fc528fad_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_o68eijqbokg_64dfceb20b34c42e5f3ce517_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_o68eijqbokg_64dfceb20b34c42e5f3ce517_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isRobotinRoom('playroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_o68eijqbokg_64dfceb20b34c42e5f3ce517_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_sedw69mahz_64dfba26781c291dbc75c3b4_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (true) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_sedw69mahz_64dfba26781c291dbc75c3b4_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_vpa5887tp7_64dfba292602f0541f7edef4_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isRobotOutOf('kitchen') && eHandsFree()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_wyacgvp6hh_64dfba262f8c9e3c7146f8d5_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_TAP_tutorial":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
// };

// second pilot
let code_dict = {
  "657dfd2f13ec3b61c3fa9f0c_atij25ljwb_6581d2bb3be35c1e384a7eff_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    (!isRobotinRoomEvent('bedroom') && isRobotinRoomEvent('kitchen'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_atij25ljwb_6581d2bb3be35c1e384a7eff_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_thing('coffee');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_atij25ljwb_6581d2bb3be35c1e384a7eff_FULL_MDP_task9":
    "actions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))\teHandsFull()\t#  eHandsFree()\t(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_atij25ljwb_6581d2bb3be35c1e384a7eff_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  (isRobotinRoomEvent('kitchen') && thing_in_room('mail'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task0":
    "actions(\n    moveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('bedroom')\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task7":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\t#  (!isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task9":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    thing_in_room('coffee');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  (isRobotinRoomEvent('kitchen') && thing_in_room('mail'))\t#);\n",
};

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

function initApi(interpreter, globalObject) {
  var wrapper;

  // const wrapperHighlight = function (id) {
  //   id = String(id || "");
  //   // console.log(id);
  //   return highlightBlock(id);
  // };
  // interpreter.setProperty(
  //   globalObject,
  //   "highlightBlock",
  //   interpreter.createNativeFunction(wrapperHighlight)
  // );

  // Each step will run the interpreter until the highlightPause is true.
  // let highlightPause = false;

  function highlightBlock(id) {
    resolveAfter3Seconds().then(() => {
      workspace.highlightBlock(id);
      // highlightPause = true;
      console.log("highlight");
    });
  }

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

  wrapper = function () {
    pick_up_toy();
  };
  interpreter.setProperty(
    globalObject,
    "pick_up_toy",
    interpreter.createNativeFunction(wrapper)
  );

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

function randomRoom() {
  let rooms = ["kitchen", "bedroom", "playroom"];
  i = Math.floor(Math.random() * 3);
  return rooms[i];
}

function randomRoomWithoutKitchen() {
  let rooms = ["bedroom", "playroom"];
  i = Math.floor(Math.random() * 2);
  return rooms[i];
}

// let code_dict = {
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_TAP_task1":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task3":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2":
//     "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
//   "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_SEQ_task1":
//     "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task2":
//     "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3":
//     "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task3":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
//   "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_FULL_MDP_task1":
//     "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
//   "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_FULL_MDP_task2":
//     "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task1":
//     "goals(\n  isPersonNotInRoomEvent()\n)\n",
//   "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_GOAL_MDP_task2":
//     "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
//   "644b58f7c74e29dea19413b8_4qzwppgn4_64cd4bceebf8a35f6f9326f6_GOAL_MDP_task3":
//     "goals(\n  (toy_not_in_room() && ((!isRobotinRoomEvent('kitchen') && !isRobotinRoomEvent('bedroom'))))\n)\n",
// };

let robot_places = [];

function run_key(k, i) {
  return new Promise((resolve, reject) => {
    let [key_id, key_format, key_task] = parse_key(k);

    console.log("task", key_task);
    console.log("format", key_format);
    console.log("key", key_id);

    let code = code_dict[k];

    console.log(code);

    if (key_task != "task1" && key_format == "TAP") {
      var closingBraceIndex = code.lastIndexOf("}");
      code = code.slice(0, closingBraceIndex) + "    else { break; }\n  }";
    }

    const taskNum = key_task.slice(-1);
    if (key_format == "FULL_MDP") {
      code = run_rl(code, taskNum);
    }

    if (key_format == "GOAL_MDP") {
      code = run_mdp(code, taskNum);
      //   console.log(code);
    }
    var myInterpreter = new Interpreter(code, initApi);
    // resetLocs();
    // myInterpreter.run();
    let time = 8000;
    let count = 0;
    let same_room = 0;

    if (key_format == "SEQ" && key_task != "task1") {
      time = 500;
    }

    // if (key_task == "task2" && key_format != "SEQ") {
    //   time = 10000;
    // }

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
        if (time % 80 == 0 && key_task == "task1") {
          if (robot_c.room == person.room) {
            same_room += 1;
          }
          count += 1;
          movePerson();
        }
        time -= 1;
        // }
        // console.log(time);
        // pids.push(pid);
      } else {
        // console.log("DONE");
        // pidList = [];
        console.log(count);
        console.log(same_room);
        resetLocs(key_id, key_task, key_format, i, same_room, count);
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

const KITCHEN = [90, 90];
const PLAYROOM = [320, 90];
const BEDROOM = [150, 320];
const rooms = { kitchen: KITCHEN, bedroom: BEDROOM, playroom: PLAYROOM };
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
let task1_keys = keys.filter((key) => key.includes("task1"));
let task2_keys = keys.filter((key) => key.includes("task2"));
// let task1_keys = [
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1",
// ];
let task3_keys = keys.filter((key) => key.includes("task3"));
// let task3_keys = [
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3",
// ];
// let task2_keys = [
//   "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_TAP_task2",
// ];
// console.log(keys.length);

// importScripts("settings/task3_nodisp.js");
importScripts("settings/task2_nodisp.js");
// importScripts("settings/task1_nodisp.js");

// Worker A's loop

async function run_one_loop(key, j) {
  let [key_id, key_format, key_task] = parse_key(key);
  console.log(key_id);
  n = 5;
  for (let i = 0; i < n; i++) {
    // if (key_format == "TAP" || key_format == "SEQ") {
    await run_key(key, i);
    // }
    // postMessage(`Worker A - Iteration ${i} ${j}`);
  }
}

async function test(keys) {
  for (let j = 0; j < keys.length; j++) {
    // console.log(keys[j]);
    await run_one_loop(keys[j], j);
  }
  // let i = 0;
  // postMessage(`Worker A - Iteration ${i}`);
  console.log(jsonData);
  self.postMessage({ type: "download", data: jsonData });
}

// Create a Blob with the JSON data

test(task2_keys);
