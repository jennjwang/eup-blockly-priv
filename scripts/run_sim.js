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

// second pilot
let code_dict = {
  "657dfd2f13ec3b61c3fa9f0c_feopz3h09w_658e3ef014c53a6d2a77bc91_FULL_MDP_task2":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n  \tmoveRobotToRoom('bedroom');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    toy_in_room();\n  \teHandsFree();\n  \tisRobotinRoomEvent('playroom');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('playroom') && toy_in_room())\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_feopz3h09w_658e3ef014c53a6d2a77bc91_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRandomRoom();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isPersonInRoomEvent()\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_feopz3h09w_658e3ef014c53a6d2a77bc91_FULL_MDP_task7":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n(isRobotinRoomEvent('kitchen') && isPersonNotInRoomEvent())\n\ngoals(\n    isPersonNotInRoomEvent()\tisRobotinRoomEvent('kitchen')\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_feopz3h09w_658e3ef014c53a6d2a77bc91_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n  \teHandsFree();\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  thing_in_room('mail')\t#  isRobotinRoomEvent('kitchen')\t);\n",
  "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task1":
    "actions(\n    moveRobotToRandomRoom();\n\n)\n\n\ntriggers(\n    isPersonInRoomEvent();\n\n)\n\n\ngoals(\n    isPersonNotInRoomEvent()\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task7":
    "triggers(\n    isRobotinRoomEvent('kitchen');\n  \tisPersonInRoomEvent();\n\n)\n\n\nactions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRandomRoom();\n\n)\n\n\ngoals(\n    isRobotinRoomEvent('kitchen')\t#  isPersonNotInRoomEvent()\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_task9":
    "triggers(\n    isRobotinRoomEvent('bedroom');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n\n)\n\n\nactions(\n    pick_up_thing('coffee');\n  \tdrop_any();\n  \tmoveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('bedroom');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_fs6cfzq0q3_658e2affa510094e82c95a2a_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ngoals(\n    (thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))\t#  (thing_in_room('mail') && isRobotinRoomEvent('kitchen'))\t#);\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n",
  "657dfd2f13ec3b61c3fa9f0c_gths71fbm9_658e2884e780d4b7e3da87aa_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('bedroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \ttoy_in_room();\n  \tisRobotinRoomEvent('bedroom');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && toy_in_room())\t#  ( && )\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_gths71fbm9_658e2884e780d4b7e3da87aa_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n  \tisRobotinRoomEvent('bedroom');\n  \tisRobotinRoomEvent('kitchen');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  (isRobotinRoomEvent('bedroom') && isPersonInRoomEvent())\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_gths71fbm9_658e2884e780d4b7e3da87aa_FULL_MDP_task5":
    "actions(\n    moveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');\n  \tdrop_any();\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('bedroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (thing_in_room('mail') && isRobotinRoomEvent('kitchen'))\t#  (isRobotinRoomEvent('porch') && thing_in_room('mail'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_gths71fbm9_658e2884e780d4b7e3da87aa_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \teHandsFree();\n  \tisRobotinRoomEvent('porch');\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  (isRobotinRoomEvent('kitchen') && thing_in_room('mail'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_mbc4gbugklh_658e310ac55fed0a22d7f2c4_FULL_MDP_task3":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_toy();\n  \tmoveRobotToRoom('playroom');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('playroom');\n  \ttoy_in_room();\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen')\ttoy_in_room() && isRobotinRoomEvent('playroom')\teHandsFree())\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_mbc4gbugklh_658e310ac55fed0a22d7f2c4_FULL_MDP_task4":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tpick_up_thing('coffee');\n  \tmoveRobotToRoom('playroom');\n  \tmoveRobotToRoom('bedroom');\n  \tmoveRobotToRoom('porch');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('kitchen');\n  \tthing_in_room('coffee');\n  \tisPersonInRoomEvent();\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen')\tthing_in_room('coffee') && eHandsFull()\tisPersonInRoomEvent())\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_mbc4gbugklh_658e310ac55fed0a22d7f2c4_FULL_MDP_task6":
    "actions(\n    moveRobotToRoom('porch');\n  \tmoveRobotToRandomRoom();\n  \tpick_up_thing('mail');\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    eHandsFree();\n  \tisRobotinRoomEvent('porch');\n  \tisRobotinRoomEvent('bedroom');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('porch')\tthing_in_room('mail') && isRobotinRoomEvent('bedroom')\teHandsFree())\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_mbc4gbugklh_658e310ac55fed0a22d7f2c4_FULL_MDP_tutorial":
    "actions(\n    moveRobotToRoom('kitchen');\n  \tmoveRobotToRoom('porch');\n  \tpick_up_thing('coffee');\n  \tpick_up_thing('mail');\n  \tdrop_any();\n  \tdrop_any();\n\n)\n\n\ntriggers(\n    isRobotinRoomEvent('kitchen');\n  \tisRobotinRoomEvent('porch');\n  \teHandsFree();\n  \tthing_in_room('coffee');\n  \tthing_in_room('mail');\n\n)\n\n\ngoals(\n    (isRobotinRoomEvent('kitchen')\tthing_in_room('coffee') && isRobotinRoomEvent('kitchen')\tthing_in_room('mail'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_0z3ksmw5fj_658e287f4a0278231e7774d9_GOAL_MDP_task3":
    "goals(\n    (toy_in_room()isRobotinRoomEvent('bedroom')\ttoy_in_room()isRobotinRoomEvent('bedroom') && )\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_0z3ksmw5fj_658e287f4a0278231e7774d9_GOAL_MDP_task6":
    "goals(\n    (thing_in_room('mail') && isRobotinRoomEvent('kitchen'))\t(thing_in_room('mail') && isRobotinRoomEvent('bedroom'))\t(thing_in_room('mail') && isRobotinRoomEvent('playroom'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_0z3ksmw5fj_658e287f4a0278231e7774d9_GOAL_MDP_task7":
    "goals(\n    ((!isRobotinRoomEvent('kitchen') && isPersonInRoomEvent()) && (isPersonNotInRoomEvent() && isRobotinRoomEvent('kitchen')))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_0z3ksmw5fj_658e287f4a0278231e7774d9_GOAL_MDP_tutorial":
    "goals(\n    (thing_in_room('coffee') && isRobotinRoomEvent('kitchen'))\t#  (thing_in_room('mail') && isRobotinRoomEvent('kitchen'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_task3":
    "goals(\n    (isRobotinRoomEvent('kitchen') && toy_not_in_room())\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_task8":
    "goals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('mail'))\t(isRobotinRoomEvent('kitchen') || thing_in_room('coffee'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_task9":
    "goals(\n    eHandsFree()\tthing_in_room('coffee')\t(eHandsFull() && isRobotinRoomEvent('kitchen'))\t##);\n",
  "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_tutorial":
    "goals(\n    (isRobotinRoomEvent('kitchen') && thing_in_room('coffee'))\t#  (!isRobotinRoomEvent('kitchen') && thing_in_room('coffee')\tthing_in_room('mail'))\t#);\n",
  "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_task2":
    "if (eHandsFree()) {\n  if (toy_not_in_room\t) {\n    pick_up_any();\n    \t} else {\n    while (false) {\n    }\n  }\n} else {\n}\nif (false) {\n} else {\n}\npick_up_any();\n",
  "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_task4":
    "if (eHandsFree()) {\n  drop_any();\n  \t}\nif (toy_in_room()) {\n} else {\n  drop_any();\n  \t}\nwhile (false) {\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_task6":
    "if (!isRobotinRoomEvent('kitchen')) {\n  drop_any();\n  \t} else {\n}\nif (eHandsFull()) {\n  if (eHandsFree()) {\n  } else {\n  }\n  pick_up_any();\n  \t} else {\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_jfbjgs6t87_658dc5ed7198d7eb419ec3bf_SEQ_tutorial":
    "if (eHandsFree()) {\n  moveRobotToRoom('kitchen');drop_any();\n  \tpick_up_any();\n  \tif (toy_in_room()) {\n    drop_any();\n    \t} else {\n  }\n  if (false) {\n  } else {\n  }\n} else {\n  moveRobotToRoom('kitchen');pick_up_any();\n  \twhile (false) {\n  }\n}\nif (( && )) {\n  while (false) {\n    moveRobotToRandomRoom();}\n  if (eHandsFull()) {\n    pick_up_any();\n    \t}\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_owv2h7pw5qf_658e2cb582ff025a05fd6c11_SEQ_task2":
    "moveRobotToRandomRoom();while (toy_not_in_room\t) {\n  if (toy_in_room()) {\n    pick_up_toy();\n    \tmoveRobotToRoom('playroom');pick_up_toy();\n    \t} else {\n    moveRobotToRandomRoom();}\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_owv2h7pw5qf_658e2cb582ff025a05fd6c11_SEQ_task6":
    "moveRobotToRoom('porch');while (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRandomRoom();drop_any();\n  \tmoveRobotToRoom('porch');}\n",
  "657dfd2f13ec3b61c3fa9f0c_owv2h7pw5qf_658e2cb582ff025a05fd6c11_SEQ_task8":
    "moveRobotToRoom('porch');if (thing_in_room('coffee')) {\n  pick_up_thing('coffee');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t} else if (thing_in_room('mail')) {\n  pick_up_thing('mail');\n  \tmoveRobotToRoom('kitchen');drop_any();\n  \t}\n",
  "657dfd2f13ec3b61c3fa9f0c_owv2h7pw5qf_658e2cb582ff025a05fd6c11_SEQ_tutorial":
    "moveRobotToRoom('porch');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "657dfd2f13ec3b61c3fa9f0c_skc6x7zukwl_658e2887fd1db21c14adb8fe_SEQ_task4":
    "moveRobotToRoom('kitchen');pick_up_thing('coffee');\n\twhile (!eHandsFree()) {\n  moveRobotToRoom('kitchen');if (isPersonInRoomEvent()) {\n    drop_any();\n    \t}\n  moveRobotToRoom('playroom');if (isPersonInRoomEvent()) {\n    drop_any();\n    \t}\n  moveRobotToRoom('bedroom');if (isPersonInRoomEvent()) {\n    drop_any();\n    \t}\n  moveRobotToRoom('porch');if (isPersonInRoomEvent()) {\n    drop_any();\n    \t}\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_skc6x7zukwl_658e2887fd1db21c14adb8fe_SEQ_task6":
    "moveRobotToRoom('porch');while (true) {\n  if ((isRobotinRoomEvent('porch') && thing_in_room('mail'))) {\n    pick_up_thing('mail');\n    \tmoveRobotToRandomRoom();drop_any();\n    \tmoveRobotToRoom('porch');}\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_skc6x7zukwl_658e2887fd1db21c14adb8fe_SEQ_task7":
    "while (true) {\n  while (isRobotinRoomEvent('kitchen')) {\n    if (isPersonInRoomEvent()) {\n      moveRobotToRandomRoom();}\n  }\n  while (!isRobotinRoomEvent('kitchen')) {\n    moveRobotToRoom('kitchen');}\n}\n",
  "657dfd2f13ec3b61c3fa9f0c_skc6x7zukwl_658e2887fd1db21c14adb8fe_SEQ_tutorial":
    "moveRobotToRoom('porch');pick_up_thing('coffee');\n\tmoveRobotToRoom('kitchen');drop_any();\n\tmoveRobotToRoom('porch');pick_up_thing('mail');\n\tmoveRobotToRoom('kitchen');drop_any();\n",
  "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_task8":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_cpqyh7kzcd_658dc58f58ab02636c14703e_TAP_task5":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_cpqyh7kzcd_658dc58f58ab02636c14703e_TAP_task7":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch')) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && isPersonNotInRoomEvent()\t) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_cpqyh7kzcd_658dc58f58ab02636c14703e_TAP_tutorial":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('coffee')) {\n      trigs.push(\n        function(){\n            pick_up_thing('coffee');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_not_in_room('coffee')\t) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task3":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && toy_in_room()) {\n      trigs.push(\n        function(){\n            pick_up_toy();\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('playroom');\n        });\n      };\n\n    if (isRobotinRoom('playroom')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task6":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (isRobotinRoom('porch') && thing_in_room('mail')) {\n      trigs.push(\n        function(){\n            pick_up_thing('mail');\n\n        });\n      };\n\n    if (handsFull()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen')) {\n      trigs.push(\n        function(){\n            drop_any();\n\n        });\n      };\n\n    if (handsFree()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('porch');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_task7":
    "  while (true) {\n    var randNum = Math.floor(Math.random() * 20);\n    var trigs = [];\n\n    if (start()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (isRobotinRoom('kitchen') && isPersonInRoomEvent()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isPersonInRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRandomRoom();\n        });\n      };\n\n    if (isRobotinAnyRoom()) {\n      trigs.push(\n        function(){\n            moveRobotToRoom('kitchen');\n        });\n      };\n\n    if (trigs.length != 0) {\n      trigs[randNum % trigs.length]();\n    }\n  }\n",
  "657dfd2f13ec3b61c3fa9f0c_houc5xeph5_658dcf600ced05035a778e74_TAP_tutorial":
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

    console.log(code);

    if ((key_task != "task1" || key_task != "task7") && key_format == "TAP") {
      var closingBraceIndex = code.lastIndexOf("}");
      code = code.slice(0, closingBraceIndex) + "    else { break; }\n  }";
    }

    // console.log(code);

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

    // console.log(code);
    // resetLocs();

    let time = 2000;
    let count = 0;
    let same_room = 0;
    let kitchen_room = 0;

    if (key_format == "SEQ" && (key_task != "task1" || key_task != "task7")) {
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
        //time % 80 == 0 &&
        if ((time % 10 == 0 && key_task == "task1") || key_task == "task7") {
          if (robot_c.room == person.room) {
            same_room += 1;
          } else if (robot_c.room == "kitchen") {
            kitchen_room += 1;
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
        resetLocs(
          key_id,
          key_task,
          key_format,
          i,
          same_room,
          // kitchen_room,
          count
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
//   "657dfd2f13ec3b61c3fa9f0c_k9fmc1zx0gg_6581ec16ff0d86cb8d485828_GOAL_MDP_task1",
//   // "657dfd2f13ec3b61c3fa9f0c_pr4951k1dt_6581f12085d70310ffb1fe53_FULL_MDP_task1",
// ];
let task2_keys = keys.filter((key) => key.includes("task2"));
let task3_keys = keys.filter((key) => key.includes("task3"));
// console.log(task3_keys);
// task3_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_34znmd7rp3_658e2ad6499b3eb22c6f49df_TAP_task3",
//   // "657dfd2f13ec3b61c3fa9f0c_ahz1r2mifd_658dc58293b8c23b59a5667b_GOAL_MDP_task3",
//   // "657dfd2f13ec3b61c3fa9f0c_k9fmc1zx0gg_6581ec16ff0d86cb8d485828_GOAL_MDP_task3",
// ];
let task4_keys = keys.filter((key) => key.includes("task4"));
let task5_keys = keys.filter((key) => key.includes("task5"));
// task5_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_zyppr92k8w_65820d984518b9c5df7076a0_SEQ_task5",
// ];
let task6_keys = keys.filter((key) => key.includes("task6"));
// task6_keys = [
//   "657dfd2f13ec3b61c3fa9f0c_zyppr92k8w_65820d984518b9c5df7076a0_SEQ_task6",
// ];
// let task7_keys = keys.filter((key) => key.includes("task7"));
let task7_keys = [
  "657dfd2f13ec3b61c3fa9f0c_ax8yfo9hbj_6581d3e1c200a7c1f0acb0bf_FULL_MDP_task7",
];
let task8_keys = keys.filter((key) => key.includes("task8"));
let task9_keys = keys.filter((key) => key.includes("task9"));

// importScripts("settings/task3_nodisp.js");
// importScripts("settings/task2_nodisp.js");
// importScripts("settings/task1_nodisp.js");
// importScripts("settings/task0_nodisp.js");
importScripts("settings/task4_nodisp.js");
// importScripts("settings/task6_nodisp.js");
// importScripts("settings/task5_nodisp.js");
// importScripts("settings/task7_nodisp.js");
// importScripts("settings/task9_nodisp.js");

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
  console.log(keys.length);
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

// test(task6_keys);
test(task3_keys);
