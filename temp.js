export class Temp {
  static storageList = []

  static registerStorage({createNew, resetValue}) {
    const storage = new TempStorage({createNew, resetValue});
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
  constructor({createNew, resetValue}) {
    this.createNew = createNew;
    this.resetValue = resetValue;
    this.buffer = [];
    this.index = 0;
  }

  acquire() {
    if (this.buffer.length === this.index) {
      this.buffer.push(this.createNew())
    }
    const item = this.buffer[this.index++];
    this.resetValue(item);
    return item;
  }
}
