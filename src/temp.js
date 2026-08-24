export class Temp {
  /** @type Array<TempStorage<any>> */
  static storageList = []

  /**
   * @template T
   * @param {() => T} createNew
   * @returns {TempStorage<T>}
   */
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

/**
 * @template T
 */
class TempStorage {
  /** @param {() => T} createNew */
  constructor(createNew) {
    this.createNew = createNew;
    /** @type {Array<T>} */
    this.buffer = [];
    this.index = 0;
  }

  /** @returns {T} */
  acquire() {
    if (this.buffer.length === this.index) {
      this.buffer.push(this.createNew())
    }
    return this.buffer[this.index++];
  }
}