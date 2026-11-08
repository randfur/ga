/** @import {PlaneBasis} from './plane-basis.js' */
import {Mat4} from './mat4.js';
import {Rotor3} from './rotor3.js';
import {Temp} from './temp.js';

export class Vec3 {
  static singleton = new Vec3();
  static a = new Vec3();
  static b = new Vec3();
  static c = new Vec3();
  static d = new Vec3();

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static temp(x=0, y=0, z=0) {
    return tempStorage.acquire().setXyz(x, y, z);
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /** @returns {Vec3} */
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  /** @returns {number} */
  squareLength() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  /** @returns {number} */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * @param {Vec3} v
   * @returns {number}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * @param {(v: Vec3) => void} f
   * @returns {Vec3}
   */
  apply(f) {
    f(this);
    return this;
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static set(v) { return this.singleton.set(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  set(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  /** @returns {Vec3} */
  static setZero() { return this.singleton.setZero(); }
  /** @returns {Vec3} */
  setZero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static setXyz(x=0, y=0, z=0) { return this.singleton.setXyz(x, y, z); }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  setXyz(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /**
   * @param {number} x
   * @returns {Vec3}
   */
  static setX(x=1) { return this.singleton.setX(x); }
  /**
   * @param {number} x
   * @returns {Vec3}
   */
  setX(x=1) {
    this.x = x;
    this.y = 0;
    this.z = 0;
    return this;
  }

  /**
   * @param {number} y
   * @returns {Vec3}
   */
  static setY(y=1) { return this.singleton.setY(y); }
  /**
   * @param {number} y
   * @returns {Vec3}
   */
  setY(y=1) {
    this.x = 0;
    this.y = y;
    this.z = 0;
    return this;
  }

  /**
   * @param {number} z
   * @returns {Vec3}
   */
  static setZ(z=1) { return this.singleton.setZ(z); }
  /**
   * @param {number} z
   * @returns {Vec3}
   */
  setZ(z=1) {
    this.x = 0;
    this.y = 0;
    this.z = z;
    return this;
  }

  /**
   * @param {number} angle
   * @param {number} radius
   * @returns {Vec3}
   */
  static setPolar(angle, radius=1) { return this.singleton.setPolar(angle, radius); }
  /**
   * @param {number} angle
   * @param {number} radius
   * @returns {Vec3}
   */
  setPolar(angle, radius=1) {
    this.x = Math.cos(angle) * radius;
    this.y = Math.sin(angle) * radius;
    this.z = 0;
    return this;
  }

  /**
   * @param {number} angleXy
   * @param {number} angleZ
   * @param {number} radius
   * @returns {Vec3}
   */
  static setSpherical(angleXy, angleZ, radius=1) { return this.singleton.setSpherical(angleXy, angleZ, radius); }
  /**
   * @param {number} angleXy
   * @param {number} angleZ
   * @param {number} radius
   * @returns {Vec3}
   */
  setSpherical(angleXy, angleZ, radius=1) {
    this.x = Math.cos(angleXy) * Math.sin(angleZ) * radius;
    this.y = Math.sin(angleXy) * Math.sin(angleZ) * radius;
    this.z = Math.cos(angleZ) * radius;
    return this;
  }

  /**
   * @param {number} k
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setScale(k, v) { return this.singleton.setScale(k, v); }
  /**
   * @param {number} k
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setScale(k, v) {
    this.x = k * v.x;
    this.y = k * v.y;
    this.z = k * v.z;
    return this;
  }
  /**
   * @param {number} k
   * @returns {Vec3}
   */
  scale(k) { return this.setScale(k, this); }

  /**
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setScaleAdd(va, kb, vb) { return this.singleton.setScaleAdd(va, kb, vb); }
  /**
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setScaleAdd(va, kb, vb) {
    this.x = va.x + kb * vb.x;
    this.y = va.y + kb * vb.y;
    this.z = va.z + kb * vb.z;
    return this;
  }
  /**
   * @param {number} k
   * @param {Vec3} v
   * @returns {Vec3}
   */
  scaleAdd(k, v) { return this.setScaleAdd(this, k, v); }

  /**
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static setScaleXyz(v, x=1, y=1, z=1) { return this.singleton.setScaleXyz(v, x, y, z); }
  /**
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  setScaleXyz(v, x=1, y=1, z=1) {
    this.x = x * v.x;
    this.y = y * v.y;
    this.z = z * v.z;
    return this;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  scaleXyz(x=1, y=1, z=1) { return this.setScaleXyz(this, x, y, z); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setAdd(va, vb) { return this.singleton.setAdd(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setAdd(va, vb) {
    this.x = va.x + vb.x;
    this.y = va.y + vb.y;
    this.z = va.z + vb.z;
    return this;
  }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  add(v) { return this.setAdd(this, v); }

  /**
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static setAddXyz(v, x=0, y=0, z=0) { return this.singleton.setAddXyz(v, x, y, z); }
  /**
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  setAddXyz(v, x=0, y=0, z=0) {
    this.x = v.x + x;
    this.y = v.y + y;
    this.z = v.z + z;
    return this;
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  addXyz(x=0, y=0, z=0) { return this.setAddXyz(this, x, y, z); }

  /**
   * @param {number} ka
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setSum(ka, va, kb, vb) { return this.singleton.setSum(ka, va, kb, vb); }
  /**
   * @param {number} ka
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setSum(ka, va, kb, vb) {
    this.x = ka * va.x + kb * vb.x;
    this.y = ka * va.y + kb * vb.y;
    this.z = ka * va.z + kb * vb.z;
    return this;
  }
  /**
   * @param {number} k
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  sum(k, kb, vb) { return this.setSum(k, this, kb, vb); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setDelta(va, vb) { return this.singleton.setDelta(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setDelta(va, vb) {
    this.x = vb.x - va.x;
    this.y = vb.y - va.y;
    this.z = vb.z - va.z;
    return this;
  }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  delta(v) { return this.setDelta(this, v); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setSubtract(va, vb) { return this.singleton.setSubtract(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setSubtract(va, vb) {
    this.x = va.x - vb.x;
    this.y = va.y - vb.y;
    this.z = va.z - vb.z;
    return this;
  }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  subtract(v) { return this.setSubtract(this, v); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @param {number} t
   * @returns {Vec3}
   */
  static setLerp(va, vb, t) { return this.singleton.setLerp(va, vb, t); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @param {number} t
   * @returns {Vec3}
   */
  setLerp(va, vb, t) {
    this.x = va.x + t * (vb.x - va.x);
    this.y = va.y + t * (vb.y - va.y);
    this.z = va.z + t * (vb.z - va.z);
    return this;
  }
  /**
   * @param {Vec3} v
   * @param {number} t
   * @returns {Vec3}
   */
  lerp(v, t) { return this.setLerp(this, v, t); }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setNormalise(v) { return this.singleton.setNormalise(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
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
  /** @returns {Vec3} */
  normalise() { return this.setNormalise(this); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setMin(va, vb) { return this.singleton.setMin(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setMin(va, vb) {
    this.x = Math.min(va.x, vb.x);
    this.y = Math.min(va.y, vb.y);
    this.z = Math.min(va.z, vb.z);
    return this;
  }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  min(v) { return this.setMin(this, v); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setMax(va, vb) { return this.singleton.setMax(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setMax(va, vb) {
    this.x = Math.max(va.x, vb.x);
    this.y = Math.max(va.y, vb.y);
    this.z = Math.max(va.z, vb.z);
    return this;
  }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  max(v) { return this.setMax(this, v); }

  /**
   * @param {Vec3} v
   * @param {(x: number) => number} f
   * @returns {Vec3}
   */
  static setMap(v, f) { return this.singleton.setMap(v, f); }
  /**
   * @param {Vec3} v
   * @param {(x: number) => number} f
   * @returns {Vec3}
   */
  setMap(v, f) {
    this.x = f(v.x);
    this.y = f(v.y);
    this.z = f(v.z);
    return this;
  }
  /**
   * @param {(x: number) => number} f
   * @returns {Vec3}
   */
  map(f) { return this.setMap(this, f); }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setYzx(v) { return this.singleton.setYzx(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setYzx(v) {
    const { x, y, z } = v;
    this.x = y;
    this.y = z;
    this.z = x;
    return this;
  }
  /** @returns {Vec3} */
  yzx() { return this.setYzx(this) }

  /**
   * @param {Vec3} v
   * @param {Rotor3} r
   * @returns {Vec3}
   */
  static setRotateRotor3(v, r) { return this.singleton.setRotateRotor3(v, r); }
  /**
   * @param {Vec3} v
   * @param {Rotor3} r
   * @returns {Vec3}
   */
  setRotateRotor3(v, r) {
    initRotor3Statics?.();
    staticQungedRotation
      .setComponents(r.rr, -r.yz, -r.zx, -r.xy)
      .multiply(
        staticQungedPosition.setComponents(0, v.x, v.y, v.z)
      )
      .multiply(r);
    this.x = staticQungedRotation.yz;
    this.y = staticQungedRotation.zx;
    this.z = staticQungedRotation.xy;
    return this;
  }
  /**
   * @param {Rotor3} r
   * @returns {Vec3}
   */
  rotateRotor3(r) { return this.setRotateRotor3(this, r); }

  /**
   * @param {Mat4} m
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setMultiplyMat4Vec3(m, v) { return this.singleton.setMultiplyMat4Vec3(m, v); }
  /**
   * @param {Mat4} m
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setMultiplyMat4Vec3(m, v) {
    return this.setXyz(
      m.aa * v.x + m.ab * v.y + m.ac * v.z + m.ad,
      m.ba * v.x + m.bb * v.y + m.bc * v.z + m.bd,
      m.ca * v.x + m.cb * v.y + m.cc * v.z + m.cd,
    );
  }
  /**
   * @param {Mat4} m
   * @returns {Vec3}
   */
  leftMultiplyMat4(m) { return this.setMultiplyMat4Vec3(m, this); }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setNonParallel(v) { return this.singleton.setNonParallel(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, -v.z, v.x];
    return this;
  }
  /** @returns {Vec3} */
  nonParallel() { return this.setNonParallel(this); }

  /**
   * @param {Vec3} normal
   * @returns {Vec3}
   */
  static setOrthogonal(normal) { return this.singleton.setOrthogonal(normal); }
  /**
   * @param {Vec3} normal
   * @returns {Vec3}
   */
  setOrthogonal(normal) {
    staticOrthogonal.set(normal);
    return this
      .setNonParallel(staticOrthogonal)
      .normalProjection(staticOrthogonal)
      .normalise();
  }
  /** @returns {Vec3} */
  orthogonal() { return this.setOrthogonal(this); }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static setCross(va, vb) { return this.singleton.setCross(va, vb); }
  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  setCross(va, vb) {
    // Matrix determinant method:
    //     [x y z]
    // det([a b c])
    //     [d e f]
    // = x(bf - ce) - y(af - cd) + z(ae - bd)

    // Geometric algebra method:
    // munge(nonscalar((ax + by + cz) * (dx + ey + fz)))
    // = munge(nonscalar(adxx + aexy + afxz + bdyx + beyy + bfyz + cdzx + cezy + cfzz))
    // = munge(aexy + afxz + bdyx + bfyz + cdzx + cezy)
    // = munge(aexy - afzx - bdxy + bfyz + cdzx - ceyz)
    // = aez - afy - bdz + bfx + cdy - cex
    // = x(bf - ce) + y(cd - af) + z(ae - bd)

    const { x: a, y: b, z: c } = va;
    const { x: d, y: e, z: f } = vb;
    this.x = b * f - c * e;
    this.y = c * d - a * f;
    this.z = a * e - b * d;
    return this;
  }
  /**
   * @param {Vec3} right
   * @returns {Vec3}
   */
  cross(right) { return this.setCross(this, right); }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setTurnXy(v) { return this.singleton.setTurnXy(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setTurnXy(v) {
    return this.setXyz(-v.y, v.x, v.z);
  }
  /** @returns {Vec3} */
  turnXy() { return this.setTurnXy(this); }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setUnturnXy(v) { return this.singleton.setUnturnXy(v); }
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setUnturnXy(v) {
    return this.setXyz(v.y, -v.x, v.z);
  }
  /** @returns {Vec3} */
  unturnXy() { return this.setUnturnXy(this); }

  /**
   * @param {Vec3} v
   * @param {Vec3} r
   * @returns {Vec3}
   */
  static setRotateXy(v, r) { return this.singleton.setRotateXy(v, r); }
  /**
   * @param {Vec3} v
   * @param {Vec3} r
   * @returns {Vec3}
   */
  setRotateXy(v, r) {
    return this.setXyz(
      v.x * r.x - v.y * r.y,
      v.x * r.y + v.y * r.x,
      v.z,
    );
  }
  /**
   * @param {Vec3} r
   * @returns {Vec3}
   */
  rotateXy(r) { return this.setRotateXy(this, r); }

  /**
   * @param {Vec3} v
   * @param {number} angle
   * @returns {Vec3}
   */
  static setRotateXyAngle(v, angle) { return this.singleton.setRotateXyAngle(v, angle); }
  /**
   * @param {Vec3} v
   * @param {number} angle
   * @returns {Vec3}
   */
  setRotateXyAngle(v, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return this.setXyz(
      v.x * cos - v.y * sin,
      v.x * sin + v.y * cos,
      v.z,
    );
  }
  /**
   * @param {number} angle
   * @returns {Vec3}
   */
  rotateXyAngle(angle) { return this.setRotateXyAngle(this, angle); }

  /**
   * @param {Vec3} direction
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns {Vec3}
   */
  static setTurnTowards(direction, position, destination, cosMaxTurnAngle) { return this.singleton.setTurnTowards(direction, position, destination, cosMaxTurnAngle); }
  /**
   * @param {Vec3} direction
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns {Vec3}
   */
  setTurnTowards(direction, position, destination, cosMaxTurnAngle) {
    staticDestinationDirection.setDelta(position, destination).normalise();
    if (direction.dot(staticDestinationDirection) >= cosMaxTurnAngle) {
      return this.set(staticDestinationDirection);
    }
    staticOrthogonal
      .setNormalProjection(direction, staticDestinationDirection)
      .normalise();
    return this.setSum(
      cosMaxTurnAngle,
      direction,
      Math.sqrt(1 - cosMaxTurnAngle ** 2),
      staticOrthogonal,
    ).normalise();
  }
  /**
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns {Vec3}
   */
  turnTowards(position, destination, cosMaxTurnAngle) { return this.setTurnTowards(this, position, destination, cosMaxTurnAngle); }

  /**
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {Vec3}
   */
  static setFractionTowards(position, destination, fraction) { return this.singleton.setFractionTowards(position, destination, fraction); }
  /**
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {Vec3}
   */
  setFractionTowards(position, destination, fraction) {
    this.x = position.x + (destination.x - position.x) * fraction;
    this.y = position.y + (destination.y - position.y) * fraction;
    this.z = position.z + (destination.z - position.z) * fraction;
    return this;
  }
  /**
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {Vec3}
   */
  fractionTowards(destination, fraction) { return this.setFractionTowards(this, destination, fraction); }

  /**
   * @param {Vec3} normal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setNormalProjection(normal, v) { return this.singleton.setNormalProjection(normal, v); }
  /**
   * @param {Vec3} normal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setNormalProjection(normal, v) {
    return this.setScaleAdd(v, -v.dot(normal), normal);
  }
  /**
   * @param {Vec3} normal
   * @returns {Vec3}
   */
  normalProjection(normal) { return this.setNormalProjection(normal, this); }

  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setPlaneProjection(planeOrigin, planeNormal, v) { return this.singleton.setPlaneProjection(planeOrigin, planeNormal, v); }
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setPlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setRelativePlaneProjection(planeOrigin, planeNormal, v)
      .add(planeOrigin);
  }
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @returns {Vec3}
   */
  planeProjection(planeOrigin, planeNormal) { return this.setPlaneProjection(planeOrigin, planeNormal, this); }

  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setRelativePlaneProjection(planeOrigin, planeNormal, v) { return this.singleton.setRelativePlaneProjection(planeOrigin, planeNormal, v); }
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setRelativePlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setDelta(planeOrigin, v)
      .normalProjection(planeNormal)
  }
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @returns {Vec3}
   */
  relativePlaneProjection(planeOrigin, planeNormal) { return this.setRelativePlaneProjection(planeOrigin, planeNormal, this); }

  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setPlaneProjection2d(planeBasis, v) { return this.singleton.setPlaneProjection2d(planeBasis, v); }
  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setPlaneProjection2d(planeBasis, v) {
    return this.setRelativePlaneProjection2d(planeBasis, this.setDelta(planeBasis.origin, v));
  }
  /**
   * @param {PlaneBasis} planeBasis
   * @returns {Vec3}
   */
  planeProjection2d(planeBasis) { return this.setPlaneProjection2d(planeBasis, this); }

  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setRelativePlaneProjection2d(planeBasis, v) { return this.singleton.setRelativePlaneProjection2d(planeBasis, v); }
  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setRelativePlaneProjection2d(planeBasis, v) {
    return this.setXyz(planeBasis.xDirection.dot(v), planeBasis.yDirection.dot(v), 0);
  }
  /**
   * @param {PlaneBasis} planeBasis
   * @returns {Vec3}
   */
  relativePlaneProjection2d(planeBasis) { return this.setRelativePlaneProjection2d(planeBasis, this); }

  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setPlanePosition3d(planeBasis, v) { return this.singleton.setPlanePosition3d(planeBasis, v); }
  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setPlanePosition3d(planeBasis, v) {
    return this.setRelativePlanePosition3d(planeBasis, v).add(planeBasis.origin);
  }
  /**
   * @param {PlaneBasis} planeBasis
   * @returns {Vec3}
   */
  planePosition3d(planeBasis) { return this.setPlanePosition3d(planeBasis, this); }

  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setRelativePlanePosition3d(planeBasis, v) { return this.singleton.setRelativePlanePosition3d(planeBasis, v); }
  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setRelativePlanePosition3d(planeBasis, v) {
    return this.setSum(v.x, planeBasis.xDirection, v.y, planeBasis.yDirection);
  }
  /**
   * @param {PlaneBasis} planeBasis
   * @returns {Vec3}
   */
  relativePlanePosition3d(planeBasis) { return this.setRelativePlanePosition3d(planeBasis, this); }
}

const tempStorage = Temp.registerStorage(() => new Vec3());

const staticOrthogonal = new Vec3();
const staticDestinationDirection = new Vec3();

/** @type {Rotor3} */
let staticQungedRotation;
/** @type {Rotor3} */
let staticQungedPosition;
/** @type {(() => void) | null} */
let initRotor3Statics = function () {
  initRotor3Statics = null;
  staticQungedRotation = new Rotor3();
  staticQungedPosition = new Rotor3();
};