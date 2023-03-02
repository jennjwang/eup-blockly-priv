class Robot {
  constructor(room) {
    this.room = room;
    this.handsFree = true;
    this.holding = null;
    this.handsPrev = false;
    this.prev = room;
  }

  setRoom(room) {
    this.prev = this.room;
    this.room = room;
  }

  isRobotinRoom(room) {
    return this.room == room;
  }
}

class Person {
  constructor(room) {
    this.room = room;
    this.prev = room;
  }

  setRoom(room) {
    this.prev = this.room;
    this.room = room;
  }

  isPersoninRoom(room) {
    // console.log("robot", room);
    // console.log("person", this.room);
    return this.room == room;
  }
}

class Toy {
  constructor(room, width, height, id) {
    this.room = room;
    this.width = width;
    this.height = height;
    this.id = id;
  }
  setRoom(room) {
    this.room = room;
  }
}
