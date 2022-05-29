class Robot {
  constructor(room) {
    this.room = room;
    this.handsFree = true;
    this.holding = null;
  }

  setRoom(room) {
    this.room = room;
  }

  isRobotinRoom(room) {
    return this.room == room;
  }
}

class Person {
  constructor(room) {
    this.room = room;
  }

  setRoom(room) {
    this.room = room;
  }

  isPersoninRoom(room) {
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
