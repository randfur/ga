import {Temp} from './temp.js';

export class Vec3 {
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  squareLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  set(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  setXyz(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  setScale(k, v) {
    this.x = k * v.x;
    this.y = k * v.y;
    this.z = k * v.z;
    return this;
  }

  setAdd(va, vb) {
    this.x = va.x + vb.x;
    this.y = va.y + vb.y;
    this.z = va.z + vb.z;
    return this;
  }

  setScaleAdd(va, kb, vb) {
    this.x = va.x + kb * vb.x;
    this.y = va.y + kb * vb.y;
    this.z = va.z + kb * vb.z;
    return this;
  }

  setSum(ka, va, kb, vb) {
    this.x = ka * va.x + kb * vb.x;
    this.y = ka * va.y + kb * vb.y;
    this.z = ka * va.z + kb * vb.z;
    return this;
  }

  setDelta(va, vb) {
    this.x = vb.x - va.x;
    this.y = vb.y - va.y;
    this.z = vb.z - va.z;
    return this;
  }

  setNormalise(v) {
    const length = v.length();
    if (length === 0) {
      this.setXyz(0, 0, 0);
      return this;
    }
    this.x = v.x / length;
    this.y = v.y / length;
    this.z = v.z / length;
    return this;
  }

  setRotateRotor(v, r) {
    const qunged =
      Temp.rotor3().setComponents(r.rr, -r.yz, -r.zx, -r.xy)
        .inplaceMultiplyRight(Temp.rotor3().setComponents(0, v.x, v.y, v.z))
        .inplaceMultiplyRight(r);
    this.x = qunged.yz;
    this.y = qunged.zx;
    this.z = qunged.xy;
    return this;
  }

  setMultiplyMat4Vec3(m, v) {
    return this.setXyz(
      m.aa * v.x + m.ab * v.y + m.ac * v.z + m.ad,
      m.ba * v.x + m.bb * v.y + m.bc * v.z + m.bd,
      m.ca * v.x + m.cb * v.y + m.cc * v.z + m.cd,
    );
  }

  inplaceScale(k) { return this.setScale(k, this); }
  inplaceAdd(v) { return this.setAdd(this, v); }
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }
  inplaceDelta(v) { return this.setDelta(this, v); }
  inplaceNormalise() { return this.setNormalise(this); }
  inplaceRotateRotor(r) { return this.setRotateRotor(this, r); }
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }
}
