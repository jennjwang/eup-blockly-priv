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
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_round1_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_round2_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_round3_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_round4_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round1_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round2_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round3_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round4_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round5_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round6_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    toy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round7_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round8_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round9_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotOutOfEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round1_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round1_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round10_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    toy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round2_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tmoveRobotToRandomRoom();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round3_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round4_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFull();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round5_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tmoveRobotToRandomRoom();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round6_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tmoveRobotToRandomRoom();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round7_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round9_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round1_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (((!isRobotinRoomEvent('kitchen') && toy_not_in_room())) && ((isRobotinRoomEvent('playroom') && toy_in_room())))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_6umuhl3snf_64cd57fa2ac236ff4e563545_round2_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (((!isRobotinRoomEvent('kitchen') && toy_not_in_room())) && ((isRobotinRoomEvent('playroom') && toy_in_room())))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round2_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (isPersonInRoomEvent() && isPersonNotInRoomEvent())\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round3_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  (isPersonInRoomEvent() && isPersonNotInRoomEvent())\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round4_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (isPersonInRoomEvent() && isPersonNotInRoomEvent())\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round1_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (!isRobotinRoomEvent('bedroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round10_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round11_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round12_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round13_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round14_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round15_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round16_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round17_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round18_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round19_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round2_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round20_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round21_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round22_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round23_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round24_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round25_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round26_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round3_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round4_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round5_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round6_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tdrop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round7_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('bedroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round8_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('bedroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_7js804yjf8_64dfba2172a3c2e14a5ad56a_round9_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('bedroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round1_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round2_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round3_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round4_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round1_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotOutOfEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round2_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotOutOfEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round3_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotOutOfEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round4_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotOutOfEvent('playroom');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_fngfn3pwgu_64dfd011ee951f78933ce577_round1_FULL_MDP_task3":
    "triggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n\n\nactions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_he3klemfo0f_64dfba2d261eaad29e67d9e4_round22_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFull();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round1_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  isPersonNotInRoomEvent()\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round1_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round2_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round3_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round4_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round5_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_pohsionjxv_64dfba0b9d10838cbac2529e_round6_FULL_MDP_task2":
    "actions(\n    pick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotOutOfEvent('bedroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round1_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round10_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round11_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round12_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round13_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round14_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round15_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round16_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round17_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round18_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round19_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round2_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round20_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round21_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round22_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round23_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round24_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n\n)\n\n\ngoals(\n  (eHandsFull() && toy_in_room())\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round3_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round30_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    toy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round31_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  toy_in_room()\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round38_FULL_MDP_task2":
    "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round39_FULL_MDP_task2":
    "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round4_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round40_FULL_MDP_task2":
    "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round41_FULL_MDP_task2":
    "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round42_FULL_MDP_task2":
    "actions(\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round9_FULL_MDP_task2":
    "actions(\n    drop_toy();\n  \tpick_up_toy();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n\n\ntriggers(\n    eHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('playroom');\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round1_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n\n)\n",
  "64cd50590f37fc832720ee73_rbhoiyzo9h_64dfba2387dd4adeed4d6fc1_round2_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n\n)\n\n\ngoals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round1_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round4_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round12_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && !isRobotinRoomEvent('playroom'))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round13_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && !isRobotinRoomEvent('playroom'))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round14_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && eHandsFree())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round15_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && eHandsFree())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round16_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && !isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round17_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && !isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round18_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round19_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round20_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && toy_not_in_room())))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round21_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('bedroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round22_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('bedroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round23_GOAL_MDP_task2":
    "goals(\n  (eHandsFree() && ((toy_in_room() || isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round24_GOAL_MDP_task2":
    "goals(\n  (eHandsFree() && ((toy_in_room() || isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round25_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round26_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round27_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round28_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round29_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round3_GOAL_MDP_task2":
    "goals(\n  (toy_not_in_room() && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round30_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((!isRobotinRoomEvent('playroom') && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round31_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((!isRobotinRoomEvent('bedroom') && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round32_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round33_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((eHandsFull() && !isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round34_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((eHandsFull() && !isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round35_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((eHandsFull() && !isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round36_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && (( && !isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round37_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && ((!isRobotinRoomEvent('playroom') && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round38_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round39_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round4_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round40_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round41_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((!isRobotinRoomEvent('playroom') && ((eHandsFree() && isRobotinRoomEvent('playroom'))))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round42_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && eHandsFree())\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round43_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && eHandsFull())))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round44_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round45_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_round1_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_round1_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && !isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_round3_GOAL_MDP_task2":
    "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_4sgaklzk3j_64cd564ceb08fa2b910ba81e_round1_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round1_GOAL_MDP_task1":
    "goals(\n  (((isRobotinRoomEvent('kitchen') || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round2_GOAL_MDP_task1":
    "goals(\n  (((isRobotinRoomEvent('kitchen') || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round3_GOAL_MDP_task1":
    "goals(\n  (((isRobotinRoomEvent('kitchen') || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round4_GOAL_MDP_task1":
    "goals(\n  ((( || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round5_GOAL_MDP_task1":
    "goals(\n  ((( || isRobotinRoomEvent('bedroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_6w4fd0u3q6_64dfba3076d6850bdd46f886_round6_GOAL_MDP_task1":
    "goals(\n  ((( || isRobotinRoomEvent('playroom'))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round10_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isPersonInRoomEvent() && ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() && ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round11_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('bedroom') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round12_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('bedroom') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round13_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('bedroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round14_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('bedroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round15_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round16_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round17_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round18_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round19_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') || isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round2_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round3_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round30_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round31_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isPersonInRoomEvent() && ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() && ((isRobotinRoomEvent('playroom') || isPersonInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round32_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isPersonInRoomEvent() && ((isRobotinRoomEvent('bedroom') || ((isPersonInRoomEvent() && ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round33_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && ((isPersonNotInRoomEvent() || ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() && )))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round39_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round4_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round40_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round43_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round44_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round5_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round6_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && ((isPersonNotInRoomEvent() || ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round7_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && ((isPersonNotInRoomEvent() || ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() || ((isRobotinRoomEvent('playroom') && isPersonNotInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round9_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') || ((isPersonInRoomEvent() && ((isRobotinRoomEvent('bedroom') && ((isPersonNotInRoomEvent() && ((isRobotinRoomEvent('playroom') || isPersonInRoomEvent())))))))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round1_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_not_in_room() && ((toy_not_in_room() && toy_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round65_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() && ((!isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round66_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() && ((!isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round67_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() && ((!isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round68_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() && ((!isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round69_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() && ((isRobotinRoomEvent('playroom') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round70_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('playroom') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round71_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round72_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round73_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round74_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round75_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round76_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round77_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('playroom') && ((toy_in_room() || ((isRobotinRoomEvent('kitchen') && toy_not_in_room())))))\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round84_GOAL_MDP_task3":
    "goals(\n  (!isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_8ovgzm7ia1j_64dfbabf990b7697c667d98a_round85_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round3_GOAL_MDP_task1":
    "goals(\n  (((isRobotinRoomEvent('kitchen') || ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('playroom'))))) && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round1_GOAL_MDP_task2":
    "goals(\n  (!isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round2_GOAL_MDP_task2":
    "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round3_GOAL_MDP_task2":
    "goals(\n  (isRobotinRoomEvent('playroom') && toy_in_room())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round1_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_i4clmi94hq_64dfba2db7d28448cb0879a6_round3_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_round1_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_mjoryjpjhn_64dfca5ebf83af79df71d29a_round2_GOAL_MDP_task1":
    "goals(\n  (isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n)\n",
  "64cd50590f37fc832720ee73_qest2te1ua_64cd5b93592240a2a8eae68e_round1_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "64cd50590f37fc832720ee73_two8kwn7o1_64cd582178e894da4462f36d_round1_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && ((toy_in_room() && toy_not_in_room())))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round1_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round1_GOAL_MDP_task2":
    "goals(\n  toy_in_room()\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round2_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round3_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() && isRobotinRoomEvent('playroom'))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round15_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round16_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round17_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_v330t41vh4_64dfba2ddfa5872cf9a22956_round18_GOAL_MDP_task3":
    "goals(\n  (toy_not_in_room() && isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_x4n32dhdem_64dfba14fe39b9ac034b892d_round1_GOAL_MDP_task2":
    "goals(\n  (toy_in_room() || isRobotinRoomEvent('kitchen'))\n)\n",
  "64cd50590f37fc832720ee73_xbnl8xp2wni_64dfdd4de565a27a44cb3aad_round2_GOAL_MDP_task1":
    "goals(\n  isPersonNotInRoomEvent()\n)\n",
  "64cd50590f37fc832720ee73_xtz47noxfx_64dfba1b97ba97b21829a322_round2_GOAL_MDP_task3":
    "goals(\n  (isRobotinRoomEvent('kitchen') && toy_not_in_room())\n)\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round1_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round2_SEQ_task1":
    "while ((true && isPersonInRoomEvent())) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round3_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n}\nmoveRobotToRandomRoom();\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round5_SEQ_task1":
    "while (!isPersonNotInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round2_SEQ_task2":
    "while (false) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round3_SEQ_task2":
    "if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round4_SEQ_task2":
    "while (eHandsFree()) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round5_SEQ_task2":
    "while (eHandsFree()) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "644b58f7c74e29dea19413b8_9506pr9tl4_64cc92f1bb810e0acec7e669_round7_SEQ_task2":
    "if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round1_SEQ_task1":
    "moveRobotToRoom('kitchen');\n\nmoveRobotToRoom('bedroom');\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round1_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round2_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round1_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round2_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round3_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round4_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (false) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_0j3jboybjul_64dfba2897ba97b21829a324_round5_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\nmoveRobotToRoom('kitchen');\n\twhile (false) {\n  pick_up_toy();\n  \tpick_up_toy();\n  \tpick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round2_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round3_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t} else {\n  }\n}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round4_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t} else {\n  }\n}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round10_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round11_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('bedroom');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round2_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round3_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round4_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round5_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round6_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round7_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round8_SEQ_task2":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round9_SEQ_task2":
    "while (true) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round1_SEQ_task3":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (eHandsFull()) {\n    moveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t} else {\n    pick_up_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round2_SEQ_task3":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_round3_SEQ_task3":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tif (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \tpick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round1_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round1_SEQ_task2":
    "while (!((isRobotinRoomEvent('playroom') && toy_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    if ((eHandsFull() && isRobotinRoomEvent('playroom'))) {\n      drop_toy();\n      \t}\n  }\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round2_SEQ_task2":
    "while (!((isRobotinRoomEvent('playroom') && toy_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    if ((eHandsFull() && isRobotinRoomEvent('playroom'))) {\n      drop_toy();\n      \t}\n  }\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round3_SEQ_task2":
    "while (!((isRobotinRoomEvent('playroom') && toy_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    if ((eHandsFull() && isRobotinRoomEvent('playroom'))) {\n      drop_toy();\n      \t}\n  }\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round1_SEQ_task3":
    "while (!((isRobotinRoomEvent('playroom') && toy_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && !isRobotinRoomEvent('playroom'))) {\n    pick_up_toy();\n    \t} else {\n    drop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round2_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && !isRobotinRoomEvent('playroom'))) {\n    pick_up_toy();\n    \t} else {\n    drop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round3_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && !isRobotinRoomEvent('playroom'))) {\n    pick_up_toy();\n    \t} else {\n    drop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_2y4p4aavs7k_64dfdc7978bd378772648231_round4_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && !isRobotinRoomEvent('playroom'))) {\n    pick_up_toy();\n    \t} else {\n    drop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round1_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round10_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round12_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round13_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t} else {\n  moveRobotToRoom('bedroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round15_SEQ_task1":
    "while (isPersonNotInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round16_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round17_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round18_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round19_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round2_SEQ_task1":
    "while (isRobotinRoomEvent('kitchen')) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isRobotinRoomEvent('bedroom')) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isRobotinRoomEvent('playroom')) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round20_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round21_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRoom('kitchen');\n  \t}\nwhile (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t}\nwhile (isPersonInRoomEvent()) {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round22_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round23_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round3_SEQ_task1":
    "while (isPersonNotInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round5_SEQ_task1":
    "while (isRobotinRoomEvent('kitchen')) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isRobotinRoomEvent('bedroom')) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isRobotinRoomEvent('playroom')) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round6_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round7_SEQ_task1":
    "while (isRobotinRoomEvent('kitchen')) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round8_SEQ_task1":
    "while (!isRobotinRoomEvent('kitchen')) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!isRobotinRoomEvent('bedroom')) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round1_SEQ_task2":
    "while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round2_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round3_SEQ_task2":
    "if (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round4_SEQ_task2":
    "while (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round5_SEQ_task2":
    "while (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round6_SEQ_task2":
    "while (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round1_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round2_SEQ_task3":
    "while (toy_not_in_room()) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round3_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round4_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_bo1hetynf8k_64dfcf6188d07e9e1775c3b7_round5_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tpick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round10_SEQ_task1":
    "moveRobotToRandomRoom();\n\twhile ((isPersonInRoomEvent() && isPersonNotInRoomEvent())) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round11_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round12_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round2_SEQ_task1":
    "while (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round3_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round4_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\nwhile (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round5_SEQ_task1":
    "moveRobotToRandomRoom();\n\twhile (!isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\nif (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round6_SEQ_task1":
    "moveRobotToRoom('kitchen');\n\tif (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\nwhile ((isPersonNotInRoomEvent() && isPersonInRoomEvent())) {\n}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round7_SEQ_task1":
    "moveRobotToRoom('kitchen');\n\tif (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\nwhile ((isPersonNotInRoomEvent() && isPersonInRoomEvent())) {\n}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round8_SEQ_task1":
    "if (false) {\n}\n\nmoveRobotToRandomRoom();\n\tif (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round9_SEQ_task1":
    "while ((isPersonInRoomEvent() && isPersonNotInRoomEvent())) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round1_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round10_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRandomRoom();\n\tif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round11_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round12_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round2_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round3_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round4_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round5_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\nwhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round6_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round7_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round8_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round9_SEQ_task2":
    "moveRobotToRandomRoom();\n\twhile (!toy_in_room()) {\n  pick_up_toy();\n  \t}\nif (eHandsFree()) {\n  pick_up_toy();\n  \t}\nif (isRobotinRoomEvent('playroom')) {\n  drop_toy();\n  \t} else {\n  moveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_exu9l4rnnq_64dfc3b1f06b94c0926bae98_round1_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n\tmoveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \twhile (true) {\n  }\n}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round1_SEQ_task2":
    "if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round2_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round3_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round1_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (true) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round2_SEQ_task3":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_fc7zuh70dk_64dfba0e8be58050479ca6f6_round3_SEQ_task3":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round2_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round3_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRoom('bedroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round4_SEQ_task1":
    "moveRobotToRoom('bedroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round5_SEQ_task1":
    "moveRobotToRoom('bedroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round1_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round2_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round3_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round4_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round5_SEQ_task2":
    "moveRobotToRoom('kitchen');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round1_SEQ_task3":
    "while (true) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round3_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round4_SEQ_task3":
    "while (toy_in_room()) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round5_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_j5g5uu1oaj_64dfbaa585898482dd1c2bc1_round6_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile ((isRobotinRoomEvent('kitchen') && toy_in_room())) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \t}\n",
  "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_round1_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_l7fqhbyhmwi_64cd578d2fd4a51b1885d743_round1_SEQ_task3":
    "moveRobotToRoom('kitchen');\n\twhile (true) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n}\nmoveRobotToRoom('kitchen');\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n} else {\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round1_SEQ_task2":
    "toy_not_in_room();\n\nmoveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t} else {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round10_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\npick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round11_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round12_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round13_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round14_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\npick_up_toy();\n\tmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round15_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\nif (eHandsFree()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round16_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n  if (eHandsFree()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round17_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\nif (eHandsFree()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round18_SEQ_task2":
    "if ((toy_in_room() && eHandsFree())) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round19_SEQ_task2":
    "if ((toy_in_room() && eHandsFree())) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round2_SEQ_task2":
    "while (true) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round20_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif ((toy_in_room() && eHandsFree())) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round21_SEQ_task2":
    "while (false) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t}\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round22_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t}\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round23_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round24_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round25_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round26_SEQ_task2":
    "while (true) {\n  if ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round27_SEQ_task2":
    "while (true) {\n  if ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round28_SEQ_task2":
    "while (true) {\n  if ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round29_SEQ_task2":
    "while (!true) {\n  if ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n    moveRobotToRandomRoom();\n    \t}\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round3_SEQ_task2":
    "while (true) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round30_SEQ_task2":
    "while (!true) {\n  moveRobotToRandomRoom();\n  \tif ((toy_in_room() && eHandsFree())) {\n    pick_up_toy();\n    \t} else {\n  }\n  moveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round31_SEQ_task2":
    "while (!true) {\n  moveRobotToRandomRoom();\n  \t}\nif ((toy_in_room() && eHandsFree())) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round32_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \t}\nif ((toy_in_room() && eHandsFree())) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round33_SEQ_task2":
    "while (!((toy_in_room() && eHandsFree()))) {\n  moveRobotToRandomRoom();\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round4_SEQ_task2":
    "if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round5_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round6_SEQ_task2":
    "while (true) {\n  moveRobotToRandomRoom();\n  \tif (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round7_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\nif (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round8_SEQ_task2":
    "moveRobotToRandomRoom();\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\nif (toy_not_in_room()) {\n  moveRobotToRandomRoom();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round9_SEQ_task2":
    "while (true) {\n  if (toy_not_in_room()) {\n    moveRobotToRandomRoom();\n    \t}\n}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round1_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round10_SEQ_task3":
    "while (!((!isRobotinRoomEvent('bedroom') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round11_SEQ_task3":
    "while (!((!isRobotinRoomEvent('playroom') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round12_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round2_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round3_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round4_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round5_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round6_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \tmoveRobotToRoom('kitchen');\n  \t}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round7_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_toy();\n  \t}\nmoveRobotToRoom('kitchen');\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round8_SEQ_task3":
    "while (!((isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_lsaiz7krb8_64cd557159591cfac58334cf_round9_SEQ_task3":
    "while (!((!isRobotinRoomEvent('kitchen') && toy_not_in_room()))) {\n  if (eHandsFree()) {\n    moveRobotToRoom('kitchen');\n    \tpick_up_toy();\n    \tmoveRobotToRoom('playroom');\n    \tdrop_toy();\n    \t}\n}\n",
  "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_round1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n}\nmoveRobotToRandomRoom();\n",
  "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_round2_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();\n  \t} else {\n}\n",
  "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_round1_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n}\nmoveRobotToRoom('playroom');\n\ndrop_toy();\n\tdrop_toy();\n",
  "64cd50590f37fc832720ee73_zwndr0bydr_64dfba2c29a0a33aaeb33503_round2_SEQ_task2":
    "moveRobotToRoom('bedroom');\n\tif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n  moveRobotToRoom('kitchen');\n  \t}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t} else {\n}\nmoveRobotToRoom('playroom');\n\tdrop_toy();\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round1_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (false && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round4_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (false && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1gnzf16ev8_64cd58af9fa5f454c085d767_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round1_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round2_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round3_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round4_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round5_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_1odsw88m8e_64cd51f96401e0696f0ba81e_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round1_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round4_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round5_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round6_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotOutOf('bedroom') && ((toy_in_room() && eHandsFree()))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && ((isRobotinRoomEvent('bedroom') || isRobotinRoomEvent('kitchen')))) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_2jqgqddxwq_64dfcfa280c9942ce9589178_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (handsFree() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round3_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round4_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_7mnjcrp4j_64dfba421cd27a0bca5a120d_round5_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round1_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && ((toy_in_room() && !isRobotinRoomEvent('playroom')))) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round10_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (false && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (false && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round4_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round5_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round6_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round7_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round8_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round9_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFree()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_9z6mip6rih_64dfba10d6861b040d562119_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFree()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_pk5x6s2s5d_64cd5825a5879580ac514c4b_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_vxc5b2kmen_64dfba2b9404f999494726ad_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_round1_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_y4fah5nnxg_64dfba17d52337ee7ec9f1ef_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round2_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round3_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round1_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round10_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round11_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round12_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round13_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round2_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round3_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round4_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_not_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round5_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round6_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFree() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round7_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round8_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round9_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round1_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "64cd50590f37fc832720ee73_zb3owo12ei_64dfdc7e3acebc95500b3968_round2_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 10);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_toy();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
};

function parse_key(key) {
  if (key.includes("MDP")) {
    const parts = key.split("_");
    // console.log(parts[(0, -3)]);
    const key_id = parts.slice(0, parts.length - 3).join("_");
    const key_format = parts.slice(4, parts.length - 1).join("_");
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

let robot_places = [];

function run_key(k, i) {
  return new Promise((resolve, reject) => {
    let [key_id, key_format, key_task] = parse_key(k);

    console.log("task", key_task);
    console.log("format", key_format);
    console.log("key", key_id);

    // let code = code_dict[k];

    let code =
      "goals(\n  (toy_in_room() && ((eHandsFree() && isRobotinRoomEvent('playroom'))))\n)\n";

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

    console.log(code);

    try {
      var myInterpreter = new Interpreter(code, initApi);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred with key " + key_id, error);
      resolve();
    }
    // resetLocs();
    // myInterpreter.run();
    let time = 4000;
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
// let task2_keys = keys.filter((key) => key.includes("task2"));
// let task1_keys = [
//   "644b58f7c74e29dea19413b8_iqrjdpw7fu_64cc788c5fa0100c34b14d8b_TAP_task1",
// ];
let task3_keys = keys.filter((key) => key.includes("task3"));
// let task3_keys = [
//   "64cd50590f37fc832720ee73_2cpt5bpaui_64cd5455bb88ef87f1783c5f_SEQ_task3",
// ];
task2_keys = [
  "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round18_GOAL_MDP_task2",
  // "64cd50590f37fc832720ee73_5rfvmt6mdy_64dfba30671c0691a677f4bb_round1_FULL_MDP_task2",
  // "64cd50590f37fc832720ee73_4q7o0q1ybhf_64dfdfdf665e1fe5fb5a1242_round36_GOAL_MDP_task2",
  // "644b58f7c74e29dea19413b8_xrpvkav917j_64cc840a0787283a2310ac9a_round1_FULL_MDP_task2",
];
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
  // self.postMessage({ type: "download", data: jsonData });
}

// Create a Blob with the JSON data
test(task2_keys);
