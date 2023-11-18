vec3
rotor3
mat4
export class Temp {
  static vec3Buffer = [];
  static rotor3Buffer = [];
  static mat4Buffer = [];

  static nextVec3Index = 0;
  static nextRotor3Index = 0;
  static nextMat4Index = 0;

  static vec3() {
    if (this.nextVec3Index === this.vec3Buffer.length) {
      this.vec3Buffer.push(new Vec3());
    }
    return this.vec3Buffer[this.nextVec3Index++];
  }
  static rotor3() {
    if (this.nextRotor3Index === this.rotor3Buffer.length) {
      this.rotor3Buffer.push(new Rotor3());
    }
    return this.rotor3Buffer[this.nextRotor3Index++];
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