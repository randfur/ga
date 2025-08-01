export class Temp {
  static storageList = []

  static registerStorage(createNew) {
    const storage = new TempStorage(createNew);
    this.storageList.push(storage);
    return storage;
  }

  static reclaimAll() {
    for (const storage of this.storageList) {
      storage.index = 0;
    }
  }
}

class TempStorage {
  constructor(createNew) {
    this.createNew = createNew;
    this.buffer = [];
    this.index = 0;
  }

  acquire() {
    if (this.buffer.length === this.index) {
      this.buffer.push(this.createNew())
    }
    return this.buffer[this.index++];
  }
}
