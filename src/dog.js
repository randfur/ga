import {Cat} from './cat.js';

export class Dog {
  static d = new Dog(new Cat(0));

  /** @param {Cat} x */
  constructor(x) {
    this.x = x;
  }

  /**
   * @param {Dog} dog
   * @param {Cat} x
   * @returns Dog
   */
  setBark(dog, x) {
    this.x = x;
    return this;
  }

  /**
   * @param {Cat} x
   * @returns Dog
   */
  inplaceBark(x) {
    return this.setBark(this, x);
  }

  /**
   * @param {Dog} dog
   * @param {Cat} x
   * @returns Dog
   */
  static bark(dog, x) {
    return this.d.setBark(dog, x);
  }
}
