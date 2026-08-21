/// ts-check

import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

/** @implements {Rotor3Type} */
export class Rotor3 {
  // Uses of this must include a call to Temp.reclaimAll().
  static temp() {
    return tempStorage.acquire().setIdentity();
  }

  static singleton = new Rotor3();
  static a = new Rotor3();
  static b = new Rotor3();
  static c = new Rotor3();
  static d = new Rotor3();

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
  static identity() {
    return this.singleton.setIdentity();
  }

  /** @type {Rotor3Type['setComponents']} */
  setComponents(rr, yz, zx, xy) {
    this.rr = rr;
    this.yz = yz;
    this.zx = zx;
    this.xy = xy;
    return this;
  }

  /** @type {(typeof Rotor3Type)['components']} */
  static components(rr, yz, zx, xy) {
    return this.singleton.setComponents(rr, yz, zx, xy);
  }

  /** @type {Rotor3Type['set']} */
  set(r) {
    this.rr = r.rr;
    this.yz = r.yz;
    this.zx = r.zx;
    this.xy = r.xy;
    return this;
  }

  /** @type {(typeof Rotor3Type)['set']} */
  static set(r) {
    return this.singleton.set(r);
  }

  /** @type {Rotor3Type['setAxisAngle']} */
  setAxisAngle(axis, angle) {
    const sin = Math.sin(angle / 2);
    this.rr = Math.cos(angle / 2);
    this.yz = axis.x * sin;
    this.zx = axis.y * sin;
    this.xy = axis.z * sin;
    return this;
  }

  /** @type {(typeof Rotor3Type)['axisAngle']} */
  static axisAngle(axis, angle) {
    return this.singleton.setAxisAngle(axis, angle);
  }

  /** @type {Rotor3Type['setVec3ToVec3']} */
  setVec3ToVec3(va, vb, reduceRatio=1) {
    if (reduceRatio <= 0) {
      this.setIdentity();
      return this;
    }

    initVec3Statics?.();
    staticDirectionA.setNormalise(va);
    staticDirectionB
      .setNormalise(vb)
      .inplaceScaleAdd(1 / reduceRatio, staticDirectionA)
      .inplaceNormalise();
    const {x: a, y: b, z: c} = staticDirectionA;
    const {x: d, y: e, z: f} = staticDirectionB;
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

  /** @type {(typeof Rotor3Type)['vec3ToVec3']} */
  static vec3ToVec3(va, vb, reduceRatio=1) {
    return this.singleton.setVec3ToVec3(va, vb, reduceRatio);
  }

  // va and vb must be orthogonal, they define which plane to turn around in.
  /** @type {Rotor3Type['setTurnAround']} */
  setTurnAround(va, vb) {
    staticRightAngleTurn.setVec3ToVec3(va, vb)
    return this.setMultiply(staticRightAngleTurn, staticRightAngleTurn);
  }

  /** @type {(typeof Rotor3Type)['turnAround']} */
  static turnAround(va, vb) {
    return this.singleton.setTurnAround(va, vb);
  }

  /** @type {Rotor3Type['setConjugate']} */
  setConjugate(r) {
    this.rr = r.rr;
    this.yz = -r.yz;
    this.zx = -r.zx;
    this.xy = -r.xy;
    return this;
  }

  /** @type {(typeof Rotor3Type)['conjugate']} */
  static conjugate(r) {
    return this.singleton.setConjugate(r);
  }

  /** @type {Rotor3Type['setNormalise']} */
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

  /** @type {(typeof Rotor3Type)['normalise']} */
  static normalise(r) {
    return this.singleton.setNormalise(r);
  }

  /** @type {Rotor3Type['setMultiply']} */
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

  /** @type {(typeof Rotor3Type)['multiply']} */
  static multiply(ra, rb) {
    return this.singleton.setMultiply(ra, rb);
  }

  /** @type {Rotor3Type['setReduce']} */
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

  /** @type {(typeof Rotor3Type)['reduce']} */
  static reduce(r, ratio) {
    return this.singleton.setReduce(r, ratio);
  }

  /** @type {Rotor3Type['setTurnTo']} */
  setTurnTo(vPosition, vBaseForward, rOrientation, vTarget, reduceRatio) {
    initVec3Statics?.();
    staticDelta.setDelta(vPosition, vTarget);
    staticForward.set(vBaseForward).inplaceRotateRotor3(rOrientation);
    staticTurn.setVec3ToVec3(staticForward, staticDelta, reduceRatio);
    return this.setMultiply(rOrientation, staticTurn);
  }

  /** @type {(typeof Rotor3Type)['turnTo']} */
  static turnTo(vPosition, vBaseForward, rOrientation, vTarget, reduceRatio) {
    return this.singleton.setTurnTo(vPosition, vBaseForward, rOrientation, vTarget, reduceRatio);
  }

  /** @type {Rotor3Type['setLerp']} */
  setLerp(ra, rb, t) {
    this.rr = ra.rr + t * (rb.rr - ra.rr);
    this.yz = ra.yz + t * (rb.yz - ra.yz);
    this.zx = ra.zx + t * (rb.zx - ra.zx);
    this.xy = ra.xy + t * (rb.xy - ra.xy);
    return this;
  }

  /** @type {Rotor3Type['lerp']} */
  lerp(ra, rb, t) {
    return Rotor3.singleton.setLerp(ra, rb, t);
  }

  inplaceConjugate() { return this.setConjugate(this); }

  inplaceNormalise() { return this.setNormalise(this); }

  /** @type {Rotor3Type['inplaceMultiplyLeft']} */
  inplaceMultiplyLeft(r) { return this.setMultiply(r, this); }

  /** @type {Rotor3Type['inplaceMultiplyRight']} */
  inplaceMultiplyRight(r) { return this.setMultiply(this, r); }

  /** @type {Rotor3Type['inplaceReduce']} */
  inplaceReduce(ratio) { return this.setReduce(this, ratio); }

  /** @type {Rotor3Type['inplaceTurnTo']} */
  inplaceTurnTo(vPosition, vBaseForward, vTarget, reduceRatio) { return this.setTurnTo(vPosition, vBaseForward, this, vTarget, reduceRatio); }

  /** @type {Rotor3Type['inplaceLerp']} */
  inplaceLerp(r, t) { return this.setLerp(this, r, t); }
}

const tempStorage = Temp.registerStorage(() => new Rotor3());

const staticRightAngleTurn = new Rotor3();
const staticTurn = new Rotor3();

/** @type {Vec3}  */
let staticDirectionA;
/** @type {Vec3}  */
let staticDirectionB;
/** @type {Vec3}  */
let staticDelta;
/** @type {Vec3}  */
let staticForward;
/** @type {(() => void) | null}  */
let initVec3Statics = function() {
  initVec3Statics = null;
  staticDirectionA = new Vec3();
  staticDirectionB = new Vec3();
  staticDelta = new Vec3();
  staticForward = new Vec3();
};