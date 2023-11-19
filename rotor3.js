import {Temp} from './temp.js';

export class Rotor3 {
  constructor(rr=1, yz=0, zx=0, xy=0) {
    this.rr = rr;
    this.yz = yz;
    this.zx = zx;
    this.xy = xy;
  }

  squareLength() {
    return this.rr ** 2 + this.yz ** 2 + this.zx ** 2 + this.xy ** 2;
  }

  length() {
    return Math.sqrt(this.squareLength());
  }

  clone() {
    return new Rotor3().set(this);
  }

  setIdentity() {
    this.rr = 1;
    this.yz = 0;
    this.zx = 0;
    this.xy = 0;
    return this;
  }

  setComponents(rr, yz, zx, xy) {
    this.rr = rr;
    this.yz = yz;
    this.zx = zx;
    this.xy = xy;
    return this;
  }

  set(r) {
    this.rr = r.rr;
    this.yz = r.yz;
    this.zx = r.zx;
    this.xy = r.xy;
    return this;
  }

  setAxisAngle(axis, angle) {
    const sin = Math.sin(angle / 2);
    this.rr = Math.cos(angle / 2);
    this.yz = axis.x * sin;
    this.zx = axis.y * sin;
    this.xy = axis.z * sin;
    return this;
  }

  setVec3ToVec3(va, vb, reduceRatio=1) {
    if (reduceRatio <= 0) {
      this.setIdentity();
      return this;
    }

    const directionA = Temp.vec3().setNormalise(va);
    const directionB = Temp.vec3()
      .setNormalise(vb)
      .inplaceScaleAdd(1 / reduceRatio, directionA)
      .inplaceNormalise();
    const {x: a, y: b, z: c} = directionA;
    const {x: d, y: e, z: f} = directionB;
    // (ax + by + cz) * (dx + ey + fz)
    //
    // = adxx + aexy + afxz +
    //   bdyx + beyy + bfyz +
    //   cdzx + cezy + cfzz +
    //
    // = ad + aexy + -afzx +
    //   -bdxy + be + bfyz +
    //   cdzx + -ceyz + cf +
    //
    // = (ad + be + cf) +
    //   (bf - ce)yz +
    //   (-af + cd)zx +
    //   (ae - bd)xy +
    this.rr = a * d + b * e + c * f;
    this.yz = b * f - c * e;
    this.zx = -a * f + c * d;
    this.xy = a * e - b * d;
    return this;
  }

  // va and vb must be orthogonal, they define which plane to turn around in.
  setTurnAround(va, vb) {
    const rightAngleTurn = Temp.rotor3().setVec3ToVec3(va, vb)
    return this.setMultiply(rightAngleTurn, rightAngleTurn);
  }

  setConjugate(r) {
    this.rr = r.rr;
    this.yz = -r.yz;
    this.zx = -r.zx;
    this.xy = -r.xy;
    return this;
  }

  setNormalise(r) {
    const length = r.length();
    if (length === 0) {
      this.setIdentity();
      return this;
    }
    this.rr = r.rr / length;
    this.yz = r.yz / length;
    this.zx = r.zx / length;
    this.xy = r.xy / length;
    return this;
  }

  setMultiply(ra, rb) {
    const {rr: a, yz: b, zx: c, xy: d} = ra;
    const {rr: e, yz: f, zx: g, xy: h} = rb;
    // (arr + byz + czx + dxy) * (err + fyz + gzx + hxy)
    //
    // = aerrrr + beyzrr + cezxrr + dexyrr +
    //   afrryz + bfyzyz + cfzxyz + dfxyyz +
    //   agrrzx + bgyzzx + cgzxzx + dgxyzx +
    //   ahrrxy + bhyzxy + chzxxy + dhxyxy
    //
    // = aerr + beyz + cezx + dexy +
    //   afyz + -bfrr + cfxy + -dfzx +
    //   agzx + -bgxy + -cgrr + dgyz +
    //   ahxy + bhzx + -chyz + -dhrr
    //
    // = (ae + -bf + -cg + -dh)rr
    //   (be + af + dg + -ch)yz +
    //   (ce + -df + ag + bh)zx +
    //   (de + cf + -bg + ah)xy
    this.rr = a * e - b * f - c * g - d * h;
    this.yz = b * e + a * f + d * g - c * h;
    this.zx = c * e - d * f + a * g + b * h;
    this.xy = d * e + c * f - b * g + a * h;
    return this;
  }

  setReduce(r, ratio) {
    if (ratio <= 0) {
      this.setIdentity();
    } else {
      this.rr = r.rr + (1 / ratio) - 1;
      this.yz = r.yz;
      this.zx = r.zx;
      this.xy = r.xy;
      this.inplaceNormalise();
    }
    return this;
  }

  setTurnTo(vPosition, vBaseForward, rOrientation, vTarget, reduceRatio) {
    const delta = Temp.vec3().setDelta(vPosition, vTarget);
    const forward = Temp.vec3().set(vBaseForward).inplaceRotateRotor(rOrientation);
    const turn = Temp.rotor3().setVec3ToVec3(forward, delta, reduceRatio);
    return this.setMultiply(rOrientation, turn);
  }

  inplaceConjugate() { return this.setConjugate(this); }
  inplaceNormalise() { return this.setNormalise(this); }
  inplaceMultiplyLeft(r) { return this.setMultiply(r, this); }
  inplaceMultiplyRight(r) { return this.setMultiply(this, r); }
  inplaceReduce(ratio) { return this.setReduce(this, ratio); }
  inplaceTurnTo(vPosition, vBaseForward, vTarget, reduceRatio) { return this.setTurnTo(vPosition, vBaseForward, this, vTarget, reduceRatio); }
}
