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
  "65a16844ec0758896540ed02_gfdvjwq4jr_65b722d980725a7cca017be0_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_gfdvjwq4jr_65b722d980725a7cca017be0_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t##);\n",
  "65a16844ec0758896540ed02_gfdvjwq4jr_65b722d980725a7cca017be0_FULL_MDP_task3":
    "actions(\n    pick_up_any();\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    toy_in_room();\n  \tisRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t#  <(isRobotinRoomEvent('kitchen') && eHandsFull())>\t#  <(isRobotinRoomEvent('bedroom') && eHandsFree())>\t);\n",
  "65a16844ec0758896540ed02_gfdvjwq4jr_65b722d980725a7cca017be0_FULL_MDP_task4":
    "actions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n  \teHandsFree();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('kitchen') && eHandsFree())>\t#  <(isPersonInRoomEvent() && eHandsFull())>\t#);\n",
  "65a16844ec0758896540ed02_1598wnmaf1_65b735b6db27c90c4ee5a21f_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    <(isPersonInRoomEvent() && isPersonNotInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_1598wnmaf1_65b735b6db27c90c4ee5a21f_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('bedroom') && toy_not_in_room()\teHandsFree())>\t#  <(isRobotinRoomEvent('kitchen') && toy_in_room())>\t#);\n",
  "65a16844ec0758896540ed02_1598wnmaf1_65b735b6db27c90c4ee5a21f_FULL_MDP_task6":
    "actions(\n    pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n  \tpick_up_thing('mail');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    <(isRobotinRoomEvent('porch') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('porch') && eHandsFull())>\t#  <(!isRobotinRoomEvent('porch') && eHandsFree())>\t);\n",
  "65a16844ec0758896540ed02_1598wnmaf1_65b735b6db27c90c4ee5a21f_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ngoals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n",
  "65a16844ec0758896540ed02_wzixu6u1xp_65b7148a24b2568c3670bcd6_SEQ_task1":
    "if (isRobotinRoomEvent('porch')) {\n  moveRobotToRoom('bedroom');}\n",
  "65a16844ec0758896540ed02_wzixu6u1xp_65b7148a24b2568c3670bcd6_SEQ_task3":
    "moveRobotToRoom('kitchen');if (toy_in_room()) {\n  pick_up_toy();\n  \t}\nwhile (!false) {\n  pick_up_toy();\n  \t}\n",
  "65a16844ec0758896540ed02_wzixu6u1xp_65b7148a24b2568c3670bcd6_SEQ_tutorial":
    "if (eHandsFull()) {\n  pick_up_thing('coffee');\n  \t}\n",
  "65a16844ec0758896540ed02_wzixu6u1xp_65b7148a24b2568c3670bcd6_SEQ_task0":
    "moveRobotToRoom('kitchen');",
  "65a16844ec0758896540ed02_da9x2tyria_65b7296481650e8449450c60_SEQ_task3":
    "moveRobotToRoom('kitchen');while (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRandomRoom();drop_any();\n  \tmoveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_da9x2tyria_65b7296481650e8449450c60_SEQ_task0":
    "if (isRobotinRoomEvent('kitchen')) {\n} else {\n  moveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_da9x2tyria_65b7296481650e8449450c60_SEQ_tutorial":
    "moveRobotToRoom('porch');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_da9x2tyria_65b7296481650e8449450c60_SEQ_task7":
    "while (true) {\n  moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n    moveRobotToRandomRoom();} else {\n  }\n  moveRobotToRoom('kitchen');}\n",
  "65a16844ec0758896540ed02_20j0u493r4_65b7149bf2ae68f2d753d756_SEQ_task2":
    "moveRobotToRandomRoom();if (toy_in_room()) {\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t} else {\n  while (toy_not_in_room()\t) {\n    moveRobotToRandomRoom();}\n  pick_up_toy();\n  \tmoveRobotToRoom('playroom');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_20j0u493r4_65b7149bf2ae68f2d753d756_SEQ_task4":
    "while (thing_not_in_room('coffee')\t) {\n  moveRobotToRandomRoom();}\nif (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \t}\nif (isPersonInRoomEvent()) {\n  drop_any();\n  \t} else {\n  while (isPersonNotInRoomEvent()\t) {\n    moveRobotToRandomRoom();}\n  drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_20j0u493r4_65b7149bf2ae68f2d753d756_SEQ_task5":
    "moveRobotToRoom('porch');if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t} else {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');drop_any();\n  \t}\n",
  "65a16844ec0758896540ed02_20j0u493r4_65b7149bf2ae68f2d753d756_SEQ_tutorial":
    "moveRobotToRoom('porch');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "65a16844ec0758896540ed02_ffa12djzkx_65b717d062a760ff56f08e15_GOAL_MDP_task9":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_ffa12djzkx_65b717d062a760ff56f08e15_GOAL_MDP_tutorial":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_ffa12djzkx_65b717d062a760ff56f08e15_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_ffa12djzkx_65b717d062a760ff56f08e15_GOAL_MDP_task6":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t<(isRobotinRoomEvent('playroom') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_anaitk8b5f_65b714920601fd61b4180202_GOAL_MDP_tutorial":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#);\n",
  "65a16844ec0758896540ed02_anaitk8b5f_65b714920601fd61b4180202_GOAL_MDP_task6":
    "goals(\n    <(isRobotinRoomEvent('porch') && thing_not_in_room('mail'))>\t##);\n",
  "65a16844ec0758896540ed02_anaitk8b5f_65b714920601fd61b4180202_GOAL_MDP_task1":
    "goals(\n    <(isPersonNotInRoomEvent() && <(isRobotinRoomEvent('bedroom') && isRobotinRoomEvent('playroom')\t<(isRobotinRoomEvent('porch') && false)>)>\tisRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_anaitk8b5f_65b714920601fd61b4180202_GOAL_MDP_task4":
    "goals(\n    <(isPersonInRoomEvent() && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_pey1pl77mr_65b714821cbf2813e30ac698_GOAL_MDP_task2":
    "goals(\n    <(toy_in_room() && isRobotinRoomEvent('playroom'))>\t##);\n",
  "65a16844ec0758896540ed02_pey1pl77mr_65b714821cbf2813e30ac698_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('playroom') && eHandsFull())>\t##);\n",
  "65a16844ec0758896540ed02_pey1pl77mr_65b714821cbf2813e30ac698_GOAL_MDP_task5":
    "goals(\n    <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_pey1pl77mr_65b714821cbf2813e30ac698_GOAL_MDP_tutorial":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#);\n",
  "65a16844ec0758896540ed02_aw110q3w06_65b7148eaf161f61cd5fa7ef_GOAL_MDP_task2":
    "goals(\n    isRobotinRoomEvent('bedroom')\t<(toy_in_room() && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_aw110q3w06_65b7148eaf161f61cd5fa7ef_GOAL_MDP_task6":
    "goals(\n    isRobotinRoomEvent('porch')\t<(false && false)>\tthing_in_room('mail')\t#  isRobotinRoomEvent('kitchen')\t#  <(false && false)>\tthing_in_room('mail')\tisRobotinRoomEvent('kitchen')\t<(false && thing_in_room('mail'))>\t);\n",
  "65a16844ec0758896540ed02_aw110q3w06_65b7148eaf161f61cd5fa7ef_GOAL_MDP_task9":
    "goals(\n    isRobotinRoomEvent('porch')\t#  <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_aw110q3w06_65b7148eaf161f61cd5fa7ef_GOAL_MDP_tutorial":
    "goals(\n    thing_in_room('coffee')\t<(false && false)>\t#  isRobotinRoomEvent('kitchen')\t#  <(false && false)>\tisRobotinRoomEvent('kitchen')\t);\n\n<(false && false)>\t",
  "65a16844ec0758896540ed02_23ztljehxdl_65b7149ff2ae68f2d753d757_GOAL_MDP_task3":
    "goals(\n  ##);\n",
  "65a16844ec0758896540ed02_23ztljehxdl_65b7149ff2ae68f2d753d757_GOAL_MDP_task6":
    "goals(\n    isRobotinRoomEvent('porch')\t#  eHandsFree()\t#);\n",
  "65a16844ec0758896540ed02_23ztljehxdl_65b7149ff2ae68f2d753d757_GOAL_MDP_task9":
    "goals(\n    isRobotinRoomEvent('bedroom')\t#  eHandsFull()\t#  isRobotinRoomEvent('kitchen')\t);\n",
  "65a16844ec0758896540ed02_23ztljehxdl_65b7149ff2ae68f2d753d757_GOAL_MDP_tutorial":
    "goals(\n  ##);\n",
  "65a16844ec0758896540ed02_d2598p1zva_65b714a5c5e439669eec7928_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_d2598p1zva_65b714a5c5e439669eec7928_GOAL_MDP_task5":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#  <(isRobotinRoomEvent('bedroom') && thing_in_room('coffee'))>\t#);\n",
  "65a16844ec0758896540ed02_d2598p1zva_65b714a5c5e439669eec7928_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_d2598p1zva_65b714a5c5e439669eec7928_GOAL_MDP_tutorial":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t#  <(isRobotinRoomEvent('kitchen') && thing_in_room('mail'))>\t#);\n",
  "65a16844ec0758896540ed02_jse9ygwh6n_65b71a9e8b90e67ebca8e6ad_GOAL_MDP_task0":
    "goals(\n    isRobotinRoomEvent('kitchen')\t##);\n",
  "65a16844ec0758896540ed02_jse9ygwh6n_65b71a9e8b90e67ebca8e6ad_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('playroom') && toy_in_room())>\t#  <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t#);\n",
  "65a16844ec0758896540ed02_jse9ygwh6n_65b71a9e8b90e67ebca8e6ad_GOAL_MDP_task4":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(!isRobotinRoomEvent('kitchen') && isPersonInRoomEvent())>\t#);\n",
  "65a16844ec0758896540ed02_jse9ygwh6n_65b71a9e8b90e67ebca8e6ad_GOAL_MDP_tutorial":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_gafe83scpd_65b714a50601fd61b4180205_GOAL_MDP_task1":
    "goals(\n    <(isPersonNotInRoomEvent() && isRobotinRoomEvent('kitchen'))>\t<(isPersonNotInRoomEvent() && isRobotinRoomEvent('bedroom'))>\t<(isPersonNotInRoomEvent() && isRobotinRoomEvent('porch'))>\t<(isPersonNotInRoomEvent() && isRobotinRoomEvent('playroom'))>\t##);\n",
  "65a16844ec0758896540ed02_gafe83scpd_65b714a50601fd61b4180205_GOAL_MDP_task4":
    "goals(\n    isRobotinRoomEvent('kitchen')\t<(thing_in_room('coffee') && isPersonInRoomEvent())>\tisRobotinRoomEvent('bedroom')\t<(thing_in_room('coffee') && isPersonInRoomEvent())>\tisRobotinRoomEvent('playroom')\t<(thing_in_room('coffee') && isPersonInRoomEvent())>\tisRobotinRoomEvent('porch')\t<(thing_in_room('coffee') && isPersonInRoomEvent())>\t##);\n",
  "65a16844ec0758896540ed02_gafe83scpd_65b714a50601fd61b4180205_GOAL_MDP_task8":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_gafe83scpd_65b714a50601fd61b4180205_GOAL_MDP_tutorial":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_o3akpev374k_65b71499bebb02958b34fc09_GOAL_MDP_task0":
    "goals(\n    <(!isRobotinRoomEvent('bedroom') && isRobotinRoomEvent('kitchen'))>\t##);\n",
  "65a16844ec0758896540ed02_o3akpev374k_65b71499bebb02958b34fc09_GOAL_MDP_task3":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && toy_not_in_room())>\t##);\n",
  "65a16844ec0758896540ed02_o3akpev374k_65b71499bebb02958b34fc09_GOAL_MDP_task9":
    "goals(\n    <(isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))>\t##);\n",
  "65a16844ec0758896540ed02_o3akpev374k_65b71499bebb02958b34fc09_GOAL_MDP_tutorial":
    "goals(\n    <(thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))>\t#  <(thing_in_room('mail') && isRobotinRoomEvent('kitchen'))>\t#);\n",
  "65a16844ec0758896540ed02_mjwl26al9p_65b7196ff2ae68f2d753d7fc_TAP_task0":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start() && isRobotinRoomEvent('bedroom')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_mjwl26al9p_65b7196ff2ae68f2d753d7fc_TAP_task7":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isPersonInRoom() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_mjwl26al9p_65b7196ff2ae68f2d753d7fc_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && eHandsFree()) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_mjwl26al9p_65b7196ff2ae68f2d753d7fc_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_vp3oql9cpo_65b737e5f2ae68f2d753dc07_TAP_task4":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && ((eHandsFull() && isPersonNotInRoomEvent()\t))) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom() && ((eHandsFull() && isPersonInRoomEvent()))) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_vp3oql9cpo_65b737e5f2ae68f2d753dc07_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && isRobotinRoomEvent('porch')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree() && isRobotinRoomEvent('kitchen')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_vp3oql9cpo_65b737e5f2ae68f2d753dc07_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_vp3oql9cpo_65b737e5f2ae68f2d753dc07_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gp4k22r4g2k_65b714998da15f5a6ea8c358_TAP_task2":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gp4k22r4g2k_65b714998da15f5a6ea8c358_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gp4k22r4g2k_65b714998da15f5a6ea8c358_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_gp4k22r4g2k_65b714998da15f5a6ea8c358_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0hgwjomn5x_65b7149aee6f3aeb07a5400c_TAP_task0":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0hgwjomn5x_65b7149aee6f3aeb07a5400c_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0hgwjomn5x_65b7149aee6f3aeb07a5400c_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_0hgwjomn5x_65b7149aee6f3aeb07a5400c_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (false) {\n      trigs.push(\n        function(){\n\n        });\n      };\n\n    if (false && false) {\n      trigs.push(\n        function(){\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_1j5rdwi880l_65b7147edf0899edf489ef57_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull() && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull() && thing_not_in_room('mail')\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_1j5rdwi880l_65b7147edf0899edf489ef57_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_1j5rdwi880l_65b7147edf0899edf489ef57_TAP_task9":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (isRobotinRoom('bedroom') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && eHandsFull()) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('bedroom');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "65a16844ec0758896540ed02_1j5rdwi880l_65b7147edf0899edf489ef57_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
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
