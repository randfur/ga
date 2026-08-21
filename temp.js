/// ts-check

/**
 * @type {TempType}
*/
export class Temp {
  /** @type {(typeof TempType)['storageList']} */
  static storageList = []

  /**
   * @template T
   * @param {TempStorageType<T>['createNew']} createNew
   * @returns {TempStorageType<T>}
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
 * @implements {TempStorageType<T>}
 */
class TempStorage {

  /** @param {TempStorageType<T>['createNew']} createNew */
  constructor(createNew) {
    this.createNew = createNew;
    /** @type {TempStorageType<T>['buffer']} */
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