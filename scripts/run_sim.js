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
  "65a16844ec0758896540ed02_8rgwd8imh6_65aaef4001581c2899e7e29b_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_8rgwd8imh6_65aaef4001581c2899e7e29b_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(!isRobotinRoomEvent('kitchen') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_8rgwd8imh6_65aaef4001581c2899e7e29b_FULL_MDP_task9":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('bedroom');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_9bhpsatrd4l_65aaef43bea7b0a2d8432972_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom')\ttoy_not_in_room() && !isRobotinRoomEvent('playroom')\tisRobotinRoomEvent('kitchen')\teHandsFree()\ttoy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_9bhpsatrd4l_65aaef43bea7b0a2d8432972_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('porch');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('bedroom')\t!isRobotinRoomEvent('bedroom') && isRobotinRoomEvent('kitchen')\teHandsFree()\tthing_in_room('coffee')\teHandsFull()\t!isRobotinRoomEvent('kitchen')\tisRobotinRoomEvent('porch')\teHandsFree())>\t##);\n",
  "65a16844ec0758896540ed02_9bhpsatrd4l_65aaef43bea7b0a2d8432972_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    <(!isRobotinRoomEvent('kitchen') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_9e9dh6whtp_65ab0e4c0cc74fc6024eece6_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(toy_not_in_room() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_9e9dh6whtp_65ab0e4c0cc74fc6024eece6_FULL_MDP_task4":
    "triggers(\n    eHandsFree();\n  \tisPersonInRoomEvent();\n  \tthing_in_room('coffee');\n  \teHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('porch');\n\n)\n\n\nactions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('porch');\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_9e9dh6whtp_65ab0e4c0cc74fc6024eece6_FULL_MDP_task6":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('mail');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(thing_not_in_room('mail') && isRobotinRoomEvent('porch'))>\t##);\n",
  "65a16844ec0758896540ed02_ezic7iv9v9_65ab1e9f0b118ec1eda2fd36_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('bedroom') && toy_in_room())>\t#  <(isRobotinRoomEvent('playroom') && eHandsFree())>\t#);\n",
  "65a16844ec0758896540ed02_ezic7iv9v9_65ab1e9f0b118ec1eda2fd36_FULL_MDP_task5":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_ezic7iv9v9_65ab1e9f0b118ec1eda2fd36_FULL_MDP_task9":
    "actions(\n    moveRobotToRoom('bedroom');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('kitchen') && eHandsFree())>\t#);\n",
  "65a16844ec0758896540ed02_hma9t7jp9l_65aaef532a188d698a4dec4a_FULL_MDP_task5":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_any();\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tthing_in_room('mail');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('mail')\tthing_in_room('coffee'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen')\t<(thing_in_room('coffee') && isRobotinRoomEvent('bedroom'))>)>\t#  eHandsFree()\t);\n",
  "65a16844ec0758896540ed02_hma9t7jp9l_65aaef532a188d698a4dec4a_FULL_MDP_task6":
    "triggers(\n    isRobotinRoomEvent('porch');\n  \tthing_in_room('mail');\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n\n)\n\n\nactions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('kitchen') && eHandsFree())>\t#);\n",
  "65a16844ec0758896540ed02_hma9t7jp9l_65aaef532a188d698a4dec4a_FULL_MDP_task7":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_ldohzg9d5wk_65aaef410b118ec1eda2f358_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    <(thing_in_room('coffee') && isPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_ldohzg9d5wk_65aaef410b118ec1eda2f358_FULL_MDP_task8":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_any();\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('mail');\n  \tthing_in_room('coffee');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee')\tthing_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_ldohzg9d5wk_65aaef410b118ec1eda2f358_FULL_MDP_task9":
    "actions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('kitchen');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_ly8kiqutk_65aaef3eaec436bf7dfcab22_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('playroom');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_ly8kiqutk_65aaef3eaec436bf7dfcab22_FULL_MDP_task3":
    "actions(\n    pick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('porch');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_ly8kiqutk_65aaef3eaec436bf7dfcab22_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && !isRobotinRoomEvent('kitchen'))>\t#  <(isPersonNotInRoomEvent() && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_z9kvhss9n2_65aaef4d5a0cd41c6f372d70_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    !isRobotinRoomEvent('bedroom')\t!isRobotinRoomEvent('playroom')\t!isRobotinRoomEvent('porch')\t!isRobotinRoomEvent('kitchen')\tisPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_z9kvhss9n2_65aaef4d5a0cd41c6f372d70_FULL_MDP_task2":
    "actions(\n    moveRobotToRandomRoom();\n  \tpick_up_toy();\n  \tdrop_any();\n  \tmoveRobotToRoom('playroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('playroom');\n  \tisRobotinRoomEvent('porch');\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_z9kvhss9n2_65aaef4d5a0cd41c6f372d70_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_0lyej96g97_65aaef4776fdd80628b2682a_GOAL_MDP_task0":
    "goals(\n    !isRobotinRoomEvent('bedroom')\t#  isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_0lyej96g97_65aaef4776fdd80628b2682a_GOAL_MDP_task4":
    "goals(\n    <(eHandsFull() && isRobotinRoomEvent('playroom'))>\t##);\n",
  "65a16844ec0758896540ed02_0lyej96g97_65aaef4776fdd80628b2682a_GOAL_MDP_task5":
    "goals(\n    <(eHandsFull() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_1hksjq6j3dj_65aaef52b2375188a47239ac_GOAL_MDP_task1":
    "goals(\n    !isRobotinRoomEvent('porch')\t#  !isRobotinRoomEvent('kitchen')\t#  !isRobotinRoomEvent('playroom')\t!isRobotinRoomEvent('bedroom')\t);\n",
  "65a16844ec0758896540ed02_1hksjq6j3dj_65aaef52b2375188a47239ac_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t#  <(isRobotinRoomEvent('playroom') && toy_in_room())>\t#  <(isRobotinRoomEvent('playroom') && toy_in_room())>\t);\n",
  "65a16844ec0758896540ed02_1hksjq6j3dj_65aaef52b2375188a47239ac_GOAL_MDP_task4":
    "goals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_6bbk6uj0pm_65aaef4f2ff987a371a2f554_GOAL_MDP_task1":
    "goals(\n    <(!isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_6bbk6uj0pm_65aaef4f2ff987a371a2f554_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_6bbk6uj0pm_65aaef4f2ff987a371a2f554_GOAL_MDP_task4":
    "goals(\n    <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_6i6a2m222l_65aaf03b659c1c8109129e89_GOAL_MDP_task5":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t<(thing_in_room('coffee') && isRobotinRoomEvent('bedroom'))>\t##);\n",
  "65a16844ec0758896540ed02_6i6a2m222l_65aaf03b659c1c8109129e89_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_6i6a2m222l_65aaf03b659c1c8109129e89_GOAL_MDP_task9":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_9nxfm6imy0l_65aaef43479fdc244d16161a_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && toy_in_room())>\t<(eHandsFull() && isRobotinRoomEvent('playroom')\t<(eHandsFree() && isRobotinRoomEvent('kitchen')\ttoy_in_room())>\t<(eHandsFull() && isRobotinRoomEvent('playroom'))>)>\t##);\n",
  "65a16844ec0758896540ed02_9nxfm6imy0l_65aaef43479fdc244d16161a_GOAL_MDP_task4":
    "goals(\n    <(isPersonInRoomEvent() && eHandsFull())>\t##);\n",
  "65a16844ec0758896540ed02_9nxfm6imy0l_65aaef43479fdc244d16161a_GOAL_MDP_task7":
    "goals(\n    isRobotinRoomEvent('kitchen')\tisPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_ahnmytzs4o_65aaef4865b3bf56fd5abad1_GOAL_MDP_task4":
    "goals(\n  ##);\n",
  "65a16844ec0758896540ed02_ahnmytzs4o_65aaef4865b3bf56fd5abad1_GOAL_MDP_task7":
    "goals(\n  ##);\n",
  "65a16844ec0758896540ed02_ahnmytzs4o_65aaef4865b3bf56fd5abad1_GOAL_MDP_task8":
    "goals(\n  ##);\n",
  "65a16844ec0758896540ed02_e3yc901tmr_65aaef54fba0333687abf87b_GOAL_MDP_task1":
    "goals(\n    <(isPersonInRoomEvent() && isRobotinRoomEvent('kitchen'))>\t!isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_e3yc901tmr_65aaef54fba0333687abf87b_GOAL_MDP_task4":
    "goals(\n    <(<(isRobotinRoomEvent('porch') && isRobotinRoomEvent('kitchen'))>\t<(isRobotinRoomEvent('playroom') && isRobotinRoomEvent('bedroom'))> && <(thing_in_room('coffee') && eHandsFree())>)>\tisPersonInRoomEvent()\tthing_not_in_room('coffee')\t#  <(!isRobotinRoomEvent('porch')\t!isRobotinRoomEvent('kitchen')\t!isRobotinRoomEvent('bedroom')\t!isRobotinRoomEvent('playroom') && isRobotinRoomEvent('bedroom')\tisRobotinRoomEvent('kitchen')\tisRobotinRoomEvent('playroom'))>\t#);\n",
  "65a16844ec0758896540ed02_e3yc901tmr_65aaef54fba0333687abf87b_GOAL_MDP_task6":
    "goals(\n    isRobotinRoomEvent('porch')\t#  <(thing_in_room('mail') && eHandsFree())>\tthing_not_in_room('mail')\t#  isRobotinRoomEvent('bedroom')\tisRobotinRoomEvent('kitchen')\tisRobotinRoomEvent('playroom')\t);\n",
  "65a16844ec0758896540ed02_gi34ddouvhj_65aaef3f56a5a3d32fb3d496_GOAL_MDP_task5":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_gi34ddouvhj_65aaef3f56a5a3d32fb3d496_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_gi34ddouvhj_65aaef3f56a5a3d32fb3d496_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_gxm3t2cmip_65aafac8787ebe87b45abc3d_GOAL_MDP_task6":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('bedroom'))>\t#  <(eHandsFree() && thing_in_room('mail'))>\t#  thing_not_in_room('mail')\t<(isRobotinRoomEvent('porch') && eHandsFull()\t<(isRobotinRoomEvent('playroom') && thing_in_room('mail'))>)>\t);\n",
  "65a16844ec0758896540ed02_gxm3t2cmip_65aafac8787ebe87b45abc3d_GOAL_MDP_task8":
    "goals(\n    eHandsFree()\t#  isRobotinRoomEvent('kitchen')\t#  thing_in_room('mail')\t);\n",
  "65a16844ec0758896540ed02_gxm3t2cmip_65aafac8787ebe87b45abc3d_GOAL_MDP_task9":
    "goals(\n    eHandsFree()\t<(thing_in_room('coffee') && thing_not_in_room('coffee'))>\t#  isRobotinRoomEvent('playroom')\t#  !isRobotinRoomEvent('bedroom')\t);\n",
  "65a16844ec0758896540ed02_jmvjf2manl_65aafa1565b3bf56fd5abcc9_GOAL_MDP_task1":
    "goals(\n    <(!isRobotinRoomEvent('bedroom') && isPersonNotInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_jmvjf2manl_65aafa1565b3bf56fd5abcc9_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && toy_in_room())>\t#  <(isRobotinRoomEvent('kitchen') && toy_in_room())>\t#);\n",
  "65a16844ec0758896540ed02_jmvjf2manl_65aafa1565b3bf56fd5abcc9_GOAL_MDP_task4":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\teHandsFull()\t#  <(isRobotinRoomEvent('porch') && thing_not_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_ltsyvvxzph_65aaef4d1014fe04c7da2bc8_GOAL_MDP_task4":
    "goals(\n    <(isPersonInRoomEvent() && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_ltsyvvxzph_65aaef4d1014fe04c7da2bc8_GOAL_MDP_task5":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_ltsyvvxzph_65aaef4d1014fe04c7da2bc8_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_qa7rxq27z4_65aaef475db5a801a6137a67_GOAL_MDP_task2":
    "goals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_qa7rxq27z4_65aaef475db5a801a6137a67_GOAL_MDP_task4":
    "goals(\n    <(!isRobotinRoomEvent('kitchen') && thing_in_room('coffee')\tisPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_qa7rxq27z4_65aaef475db5a801a6137a67_GOAL_MDP_task6":
    "goals(\n    <(isRobotinRoomEvent('porch') && thing_not_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_tkosmkvaqe_65ab22864c8491a1bb90292f_GOAL_MDP_task4":
    "goals(\n    thing_in_room('coffee')\t#  isPersonInRoomEvent()\t#);\n",
  "65a16844ec0758896540ed02_tkosmkvaqe_65ab22864c8491a1bb90292f_GOAL_MDP_task8":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_tkosmkvaqe_65ab22864c8491a1bb90292f_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_xm1fx5u8yl_65aaef4e88afb265041616d4_GOAL_MDP_task1":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_xm1fx5u8yl_65aaef4e88afb265041616d4_GOAL_MDP_task5":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('bedroom'))>\t##);\n",
  "65a16844ec0758896540ed02_xm1fx5u8yl_65aaef4e88afb265041616d4_GOAL_MDP_task7":
    "goals(\n    isRobotinRoomEvent('kitchen')\t<(false && isPersonInRoomEvent())>\t#  !isRobotinRoomEvent('kitchen')\t#);\n",
  "65a16844ec0758896540ed02_a98de119x3_65aaef4ae41d9ffb01b3d5aa_SEQ_task0":
    "while (true) {\n  moveRobotToRoom('kitchen');moveRobotToRoom('bedroom');}\n",
  "65a16844ec0758896540ed02_a98de119x3_65aaef4ae41d9ffb01b3d5aa_SEQ_task5":
    "while (true) {\n  moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n    pick_up_thing('coffee');\n    \tmoveRobotToRoom('bedroom');drop_any();\n    \t}\n  if (thing_in_room('mail')) {\n    pick_up_thing('mail');\n    \tmoveRobotToRoom('kitchen');drop_any();\n    \t}\n}\n",
  "65a16844ec0758896540ed02_a98de119x3_65aaef4ae41d9ffb01b3d5aa_SEQ_task7":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();} else {\n    moveRobotToRoom('kitchen');}\n}\n",
  "65a16844ec0758896540ed02_d5qvpnocvy_65aaff1c0b118ec1eda2f692_SEQ_task2":
    "moveRobotToRoom('playroom');while (toy_not_in_room()\t) {\n  while (!toy_in_room()) {\n    moveRobotToRandomRoom();}\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_d5qvpnocvy_65aaff1c0b118ec1eda2f692_SEQ_task7":
    "moveRobotToRoom('kitchen');while (isRobotinRoomEvent('kitchen')) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();} else {\n    moveRobotToRoom('kitchen');}\n  while (!isRobotinRoomEvent('kitchen')) {\n    moveRobotToRoom('kitchen');}\n}\n",
  "65a16844ec0758896540ed02_d5qvpnocvy_65aaff1c0b118ec1eda2f692_SEQ_task8":
    "moveRobotToRoom('porch');if (thing_not_in_room('coffee')\t) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t} else {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_h30r1j03wd_65aaef4037524e721d890de1_SEQ_task1":
    "if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();} else {\n  moveRobotToRandomRoom();}\nwhile (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();}\n",
  "65a16844ec0758896540ed02_h30r1j03wd_65aaef4037524e721d890de1_SEQ_task8":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\nif (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_h30r1j03wd_65aaef4037524e721d890de1_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_h6eysj4jhz_65aaef429d83c7246aa05b9b_SEQ_task1":
    "while (true) {\n  if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n}\n",
  "65a16844ec0758896540ed02_h6eysj4jhz_65aaef429d83c7246aa05b9b_SEQ_task2":
    "while (!toy_in_room()) {\n  moveRobotToRandomRoom();}\nif (toy_in_room()) {\n  pick_up_toy();\n  \t}\nmoveRobotToRoom('playroom');drop_any();\n",
  "65a16844ec0758896540ed02_h6eysj4jhz_65aaef429d83c7246aa05b9b_SEQ_task8":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \t}\nmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \t}\nmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_jcafrqa0um_65aaef51a3cfc6aff3840f53_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_jcafrqa0um_65aaef51a3cfc6aff3840f53_SEQ_task6":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \t} else {\n}\nmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \t} else {\n}\nmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \t} else {\n}\nmoveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_jcafrqa0um_65aaef51a3cfc6aff3840f53_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_ke3si90n17_65aaf948b2375188a4723c1b_SEQ_task1":
    "moveRobotToRandomRoom();while (!isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();}\n",
  "65a16844ec0758896540ed02_ke3si90n17_65aaf948b2375188a4723c1b_SEQ_task3":
    "moveRobotToRoom('kitchen');pick_up_toy();\n\tmoveRobotToRandomRoom();drop_any();\n\tmoveRobotToRoom('kitchen');pick_up_toy();\n\tmoveRobotToRandomRoom();drop_any();\n\tmoveRobotToRoom('kitchen');pick_up_toy();\n\tmoveRobotToRandomRoom();drop_any();\n\twhile (!toy_not_in_room()\t) {\n  pick_up_any();\n  \t}\nmoveRobotToRandomRoom();drop_any();\n",
  "65a16844ec0758896540ed02_ke3si90n17_65aaf948b2375188a4723c1b_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_lf6syybacn_65aaf69caf135f60daefbcd2_SEQ_task1":
    "if (isRobotinRoomEvent('bedroom')) {\n  moveRobotToRoom('playroom');}\n",
  "65a16844ec0758896540ed02_lf6syybacn_65aaf69caf135f60daefbcd2_SEQ_task5":
    "moveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_lf6syybacn_65aaf69caf135f60daefbcd2_SEQ_task6":
    "moveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('playroom');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRandomRoom();",
  "65a16844ec0758896540ed02_npqnhkhhwl_65aaef3d7f6422055cc39c19_SEQ_task4":
    "moveRobotToRoom('kitchen');if (isPersonNotInRoomEvent()\t) {\n  pick_up_thing('coffee');\n  \t}\nmoveRobotToRoom('playroom');if (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('bedroom');}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('porch');}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_npqnhkhhwl_65aaef3d7f6422055cc39c19_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \t} else {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_npqnhkhhwl_65aaef3d7f6422055cc39c19_SEQ_task9":
    "moveRobotToRoom('bedroom');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_p7keh0foph_65aaef423ad8cbf00a1f5829_SEQ_task1":
    "moveRobotToRandomRoom();if (isPersonInRoomEvent()) {\n  moveRobotToRandomRoom();while (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();}\n} else {\n}\n",
  "65a16844ec0758896540ed02_p7keh0foph_65aaef423ad8cbf00a1f5829_SEQ_task3":
    "moveRobotToRoom('kitchen');if (toy_in_room()) {\n  while (!toy_not_in_room()\t) {\n    pick_up_any();\n    \tmoveRobotToRoom('playroom');drop_any();\n    \tmoveRobotToRoom('kitchen');}\n} else {\n}\n",
  "65a16844ec0758896540ed02_p7keh0foph_65aaef423ad8cbf00a1f5829_SEQ_task5":
    "moveRobotToRoom('porch');pick_up_any();\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_tcye7w4dvv_65aaef537eb71b8c6f53d218_SEQ_task3":
    "moveRobotToRoom('kitchen');if (toy_in_room()) {\n  while (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');drop_any();\n    \tmoveRobotToRoom('kitchen');}\n}\n",
  "65a16844ec0758896540ed02_tcye7w4dvv_65aaef537eb71b8c6f53d218_SEQ_task8":
    "moveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_tcye7w4dvv_65aaef537eb71b8c6f53d218_SEQ_task9":
    "moveRobotToRoom('bedroom');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_wwixtzyuvb_65aaef4c3cc6658db9c01491_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_any();\n\tmoveRobotToRandomRoom();moveRobotToRandomRoom();",
  "65a16844ec0758896540ed02_wwixtzyuvb_65aaef4c3cc6658db9c01491_SEQ_task5":
    "moveRobotToRandomRoom();",
  "65a16844ec0758896540ed02_wwixtzyuvb_65aaef4c3cc6658db9c01491_SEQ_task9":
    "moveRobotToRandomRoom();moveRobotToRandomRoom();pick_up_any();\n",
  "65a16844ec0758896540ed02_y0sxfzn21l_65aaefa01d1aa8daf91f59ce_SEQ_task1": "",
  "65a16844ec0758896540ed02_y0sxfzn21l_65aaefa01d1aa8daf91f59ce_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_any();\n\tmoveRobotToRandomRoom();if (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  while (isPersonNotInRoomEvent()\t) {\n    moveRobotToRandomRoom();drop_any();\n    \t}\n}\n",
  "65a16844ec0758896540ed02_y0sxfzn21l_65aaefa01d1aa8daf91f59ce_SEQ_task8":
    "moveRobotToRoom('porch');pick_up_any();\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_yvdbca6mag_65aaf53415940869d228f65e_SEQ_task2":
    "moveRobotToRoom('bedroom');if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('porch');}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('kitchen');}\nif (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  moveRobotToRoom('playroom');}\n",
  "65a16844ec0758896540ed02_yvdbca6mag_65aaf53415940869d228f65e_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('playroom');}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('bedroom');}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  moveRobotToRoom('porch');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_yvdbca6mag_65aaf53415940869d228f65e_SEQ_task8":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_any();\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t} else {\n  pick_up_any();\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_5ztuu60y5d_65aaef563cc6658db9c01498_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (isRobotOutOf('bedroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_5ztuu60y5d_65aaef563cc6658db9c01498_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_5ztuu60y5d_65aaef563cc6658db9c01498_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (isRobotOutOf('bedroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotOutOf('bedroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotOutOf('bedroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_9acgplujea_65aaef490cc1792287be9a01_TAP_task0":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_9acgplujea_65aaef490cc1792287be9a01_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_9acgplujea_65aaef490cc1792287be9a01_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_bnazqqdtiw_65aaef3a368fec9f7a7b65e8_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_bnazqqdtiw_65aaef3a368fec9f7a7b65e8_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_bnazqqdtiw_65aaef3a368fec9f7a7b65e8_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_f3x2y6vgwc_65aaef4e818a52543753d792_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_f3x2y6vgwc_65aaef4e818a52543753d792_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (handsFull() && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_f3x2y6vgwc_65aaef4e818a52543753d792_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gfspa6ef9x_65aaef4b24789c0daa6ea54b_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gfspa6ef9x_65aaef4b24789c0daa6ea54b_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gfspa6ef9x_65aaef4b24789c0daa6ea54b_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hgt3n4txck_65aaef4e307f025b4b623b39_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hgt3n4txck_65aaef4e307f025b4b623b39_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hgt3n4txck_65aaef4e307f025b4b623b39_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hrs87trfiy_65aaef4c833c22e9dd5e215b_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hrs87trfiy_65aaef4c833c22e9dd5e215b_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_hrs87trfiy_65aaef4c833c22e9dd5e215b_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && eHandsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_jjrwkoejap_65aafadb87321ce3a9012b65_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isPersonInRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_jjrwkoejap_65aafadb87321ce3a9012b65_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_jjrwkoejap_65aafadb87321ce3a9012b65_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_m53leit5sg_65aaef4b5a0cd41c6f372d6e_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_m53leit5sg_65aaef4b5a0cd41c6f372d6e_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_m53leit5sg_65aaef4b5a0cd41c6f372d6e_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_my9j4lb4a3_65aaef571f2c936e1154fb69_TAP_task0":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_my9j4lb4a3_65aaef571f2c936e1154fb69_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_my9j4lb4a3_65aaef571f2c936e1154fb69_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && eHandsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinAnyRoom() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_n675i9yrxl_65aaef425a0cd41c6f372d6c_TAP_task1":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_n675i9yrxl_65aaef425a0cd41c6f372d6c_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_n675i9yrxl_65aaef425a0cd41c6f372d6c_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_rs3yz1atsk_65aaf624721ad5c78aefd972_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull() && toy_in_room()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_not_in_room()\t) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotOutOf('playroom') && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotOutOf('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotOutOf('playroom') && !isRobotinRoomEvent('playroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (isRobotOutOf('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom') && toy_in_room()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_rs3yz1atsk_65aaf624721ad5c78aefd972_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_rs3yz1atsk_65aaf624721ad5c78aefd972_TAP_task7":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (start() && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (start() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_tb8g51mc7h_65aaf3b32c561233fe228345_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && !isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_tb8g51mc7h_65aaf3b32c561233fe228345_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && ((isPersonInRoomEvent() && eHandsFull()))) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinAnyRoom() && ((isPersonNotInRoomEvent()\t && eHandsFull()))) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_tb8g51mc7h_65aaf3b32c561233fe228345_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && ((eHandsFull() || thing_not_in_room('mail')\t))) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && !isRobotinRoomEvent('porch')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
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
  arr = key.split("_");
  //   console.log(arr[(0, arr.length - 1)]);
  let key_id = arr.slice(0, arr.length - 2).join("_");
  let key_format = arr.slice(-2)[0];
  let key_task = arr.slice(-1)[0];

  if (key.includes("MDP")) {
    const parts = key.split("_");
    // console.log(parts[(0, -3)]);
    key_id = parts.slice(0, parts.length - 3).join("_");
    key_format = parts.slice(3, parts.length - 1).join("_");
    key_task = parts[parts.length - 1];
    // return [key_id, key_format, key_task];
  }

  if (key_format.includes("round")) {
    let format_parts = key_format.split("_");
    key_format = format_parts.slice(1, format_parts.length).join("_");
  }
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
    // code =
    //   "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n   <(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>	#  <(!isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())>	#);\n";
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
    // console.log(taskNum);
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
        if (current_state && transition_table) {
          let [cur_action, next_state, cur_val] =
            transition_table[current_state];

          while (cur_action != prv_action) {
            // console.log(cur_action);
            if (code.length > 500 && (taskNum == 8 || taskNum == 3)) {
              break;
            }
            code += cur_action;
            // console.log(code.length);
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
        if (current_state && transition_table) {
          let [cur_action, next_state, cur_val] =
            transition_table[current_state];

          while (cur_action != prv_action) {
            if (code.length > 500 && (taskNum == 8 || taskNum == 3)) {
              break;
            }
            code += cur_action;
            prv_action = cur_action;
            current_state = get_current_state(state_ids, taskNum);
            [cur_action, next_state, cur_val] = transition_table[next_state];
          }
        }
      }
    }

    // console.log(code);

    // resetLocs();

    let time = 3000;
    if (key_task == "task7") {
      time = 1000;
    }
    if (key_task == "task8") {
      time = 1500;
    }
    // if (key_task == "task7" && key_format == "GOAL_MDP") {
    //   time = 4000;
    // }
    let count = 0;
    let same_room = 0;
    let kitchen_room = 0;

    if (key_format == "SEQ") {
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
        setTimeout(nextStep, 0);
        if (key_task == "task1" || key_task == "task7") {
          movePerson();
        }
        time -= 1;
      } else {
        // console.log("DONE");
        // pidList = [];
        resetLocs(key_id, key_task, key_format, i, time);
        resolve();
      }
    }

    nextStep();
  });
}

function removeScript(script_id) {
  return new Promise((resolve, reject) => {
    var scriptToRemove = document.getElementById(script_id);
    // console.log(scriptToRemove);
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
//   "65a16844ec0758896540ed02_hktr8tcatk_65a190fa3c1821d69d0c2565_SEQ_task7",
// ];
// task1_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_exviy7b3gr_6581fb6ca0e561efd3491ae7_GOAL_MDP_task1",
//   "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_exviy7b3gr_6581fb6ca0e561efd3491ae7_GOAL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_GOAL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task1",
// ];
let task2_keys = keys.filter((key) => key.includes("task2"));
// task2_keys = [
//   "65a16844ec0758896540ed02_e7orsxgguq_65a98cce07f808a0b287e9eb_round1_GOAL_MDP_task2",
// ];
let task3_keys = keys.filter((key) => key.includes("task3"));
// task3_keys = [
//   "65a16844ec0758896540ed02_zdud99qknb_65a8774ae10ea01f2808d7f7_round2_FULL_MDP_task3",
// ];
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
// task5_keys = [
//   "65a16844ec0758896540ed02_7zprory6qjk_65a1dae06bf9a9f5140b11f8_SEQ_task5",
//   "65a16844ec0758896540ed02_zqsk8877wyl_65a1dad918e4e0064e4df63f_GOAL_MDP_task5",
// ];
let task6_keys = keys.filter((key) => key.includes("task6"));
// task6_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_task6",
//   // "657dfd2f13ec3b61c3fa9f0c_zyppr92k8w_65820d984518b9c5df7076a0_SEQ_task6",
// ];
let task7_keys = keys.filter((key) => key.includes("task7"));
// task7_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_ezy59w3764_6581d20144e11bc83e5b5ee9_FULL_MDP_task7",
// ];
// task7_keys = [
//   // "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task7",
//   // "657dfd2f13ec3b61c3fa9f0c_cpqyh7kzcd_658dc58f58ab02636c14703e_TAP_task7",
//   "657dfd2f13ec3b61c3fa9f0c_ezy59w3764_6581d20144e11bc83e5b5ee9_FULL_MDP_task7",
//   // "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task7",
// ];
let task8_keys = keys.filter((key) => key.includes("task8"));
// task8_keys = [
//   "65a16844ec0758896540ed02_ykt6wq86oij_65a1dae193e28f68a8c0be00_FULL_MDP_task8",
// ];
let task9_keys = keys.filter((key) => key.includes("task9"));
// task9_keys = [
//   "65a16844ec0758896540ed02_xog59id0vbj_65a192cb0652b97162512e9c_SEQ_task9",
// ];

async function run_one_loop(key, j) {
  let [key_id, key_format, key_task] = parse_key(key);
  console.log(key_id);
  n = 5;
  if (key_task == "task1") {
    n = 1;
  }
  if (
    key_task == "task7" ||
    key_task == "task5" ||
    key_task == "task8" ||
    key_task == "task4"
  ) {
    n = 10;
  }
  for (let i = 0; i < n; i++) {
    // if (key_format == "TAP" || key_format == "SEQ") {
    await run_key(key, i);
    // }
    // postMessage(`Worker A - Iteration ${i} ${j}`);
  }
}

async function test(keys) {
  // console.log(keys.length);
  for (let j = 0; j < keys.length; j++) {
    console.log(keys[j]);
    await run_one_loop(keys[j], j);
  }
  let i = 0;
  postMessage(`Worker A - Iteration ${i}`);
  console.log(jsonData);
  self.postMessage({ type: "download", data: jsonData });
}

// Create a Blob with the JSON data

importScripts("settings/task3_nodisp.js");
// importScripts("settings/task2_nodisp.js");
// importScripts("settings/task1_nodisp.js");
// importScripts("settings/task0_nodisp.js");
// importScripts("settings/task4_nodisp.js");
// importScripts("settings/task6_nodisp.js");
// importScripts("settings/task5_nodisp.js");
// importScripts("settings/task7_nodisp.js");
// importScripts("settings/task9_nodisp.js");

test(task3_keys);
