/// ts-check
/// <reference path="./index.d.ts" />

export class Temp {
  /** @type {TempStorage<any>[]} */
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

  // Reclaims all temp objects as available for reuse, typically called at the
  // start or end of every frame.
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
  /**
   * @param {() => T} createNew
   */
  constructor(createNew) {
    this.createNew = createNew;
    /** @type T[] */
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
