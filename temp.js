import {Vec3} from './vec3.js';
import {Rotor3} from './rotor3.js';
import {Mat4} from './mat4.js';

export class Temp {
  static vec3Buffer = [];
  static rotor3Buffer = [];
  static mat4Buffer = [];

  static nextVec3Index = 0;
  static nextRotor3Index = 0;
  static nextMat4Index = 0;

  static vec3(x=0, y=0, z=0) {
    if (this.nextVec3Index === this.vec3Buffer.length) {
      this.vec3Buffer.push(new Vec3());
    }
    return this.vec3Buffer[this.nextVec3Index++].setXyz(x, y, z);
  }
  static rotor3(rr=1, yz=0, zx=0, xy=0) {
    if (this.nextRotor3Index === this.rotor3Buffer.length) {
      this.rotor3Buffer.push(new Rotor3());
    }
    return this.rotor3Buffer[this.nextRotor3Index++].setComponents(rr, yz, zx, xy);
  }
  static mat4() {
    if (this.nextMat4Index === this.mat4Buffer.length) {
      this.mat4Buffer.push(new Mat4());
    }
    return this.mat4Buffer[this.nextMat4Index++];
  }

  static reclaimAll() {
    this.nextVec3Index = 0;
    this.nextRotor3Index = 0;
    this.nextMat4Index = 0;
  }
}