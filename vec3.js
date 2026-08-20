/// ts-check
/// <reference path="./index.d.ts" />

/**
 * Getter index:
 * - clone()
 * - squareLength()
 * - length()
 * - dot(v)
 *
 * Setter index:
 * - set(v)
 * For the following setters e.g. `setAdd(va, vb)` there also exists
 * `Vec3.add(va, vb)` which operates on the `Vec3.singleton` instance.
 * For setters that take at least one Vec3 parameter there also exists
 * `inplaceAdd(vb)` which uses `this` as the first Vec3 parameter.
 * - setZero()
 * - setXyz(x, y, z)
 * - setX(x)
 * - setY(y)
 * - setZ(z)
 * - setPolar(angle, radius)
 * - setSpherical(angleXy, angleZ, radius=1)
 * - setScale(k, v)
 * - setAdd(va, vb)
 * - setAddXyz(v, x, y, z)
 * - setScaleAdd(va, kb, vb)
 * - setSum(ka, va, kb, vb)
 * - setDelta(va, vb)
 * - setSubtract(va, vb)
 * - setLerp(va, vb, t)
 * - setNormalise(v)
 * - setMin(va, vb)
 * - setMax(va, vb)
 * - setMap(f)
 * - setYzx(v)
 * - setRotateRotor3(v, r)
 * - setMultiplyMat4Vec3(m, v)
 * - setNonParallel(v)
 * - setOrthogonal(normal)
 * - setCross(va, vb)
 * - setTurnXy(v)
 * - setUnturnXy(v)
 * - setTurnTowards(direction, position, destination, cosMaxTurnAngle)
 * - setFractionTowards(position, destination, fraction)
 * - setNormalProjection(normal, v)
 * - setPlaneProjection(planeOrigin, planeNormal, v)
 * - setRelativePlaneProjection(planeOrigin, planeNormal, position)
 * - setPlaneProjection2d(planeBasis, v)
 * - setRelativePlaneProjection2d(planeBasis, v)
 * - setPlanePosition3d(planeBasis, v)
 * - setRelativePlanePosition3d(planeBasis, v)
 */

import {Temp} from './temp.js';
import {Rotor3} from './rotor3.js';
import { Mat4 } from './mat4.js';
import { PlaneBasis } from './plane-basis.js';


export class Vec3 {

  /**
   * Uses of this must include a call to Temp.reclaimAll().
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns
   */
  static temp(x=0, y=0, z=0) {
    return tempStorage.acquire().setXyz(x, y, z);
  }

  static singleton = new Vec3();
  static a = new Vec3();
  static b = new Vec3();
  static c = new Vec3();
  static d = new Vec3();

  constructor(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  // TODO: Test.
  /** @returns {Vec3} */
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  // TODO: Test.
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

  // TODO: Test.
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
  set(v) {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static set(v) {
    return this.singleton.set(v);
  }

  /** @returns {Vec3} */
  setZero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }

  /** @returns {Vec3} */
  static zero() {
    return this.singleton.setZero();
  }

  /** @returns {Vec3} */
  setXyz(x=0, y=0, z=0) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  /** @returns {Vec3} */
  static xyz(x=0, y=0, z=0) {
    return this.singleton.setXyz(x, y, z);
  }

  // TODO: Test.
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
   * @param {number} x
   * @returns {Vec3}
   */
  static x(x=1) {
    return this.singleton.setX(x);
  }

  // TODO: Test.
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
   * @param {number} y
   * @returns {Vec3}
   */
  static y(y=1) {
    return this.singleton.setY(y);
  }

  // TODO: Test.
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
   * @param {number} z
   * @returns {Vec3}
   */
  static z(z=1) {
    return this.singleton.setZ(z);
  }

  // TODO: Test.
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
   * @param {number} angle
   * @param {number} radius
   * @returns {Vec3}
   */
  static polar(angle, radius=1) {
    return this.singleton.setPolar(angle, radius);
  }

  // TODO: Test.
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
   * @param {number} angleXy
   * @param {number} angleZ
   * @param {number} radius
   * @returns {Vec3}
   */
  static spherical(angleXy, angleZ, radius=1) {
    return this.singleton.setSpherical(angleXy, angleZ, radius);
  }

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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static scale(k, v) {
    return this.singleton.setScale(k, v);
  }

  // TODO: Test.
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
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static scaleXyz(v, x=1, y=1, z=1) {
    return this.singleton.setScaleXyz(v, x, y, z);
  }

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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static add(va, vb) {
    return this.singleton.setAdd(va, vb);
  }

  // TODO: Test.
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
   * @param {Vec3} v
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Vec3}
   */
  static addXyz(v, x=0, y=0, z=0) {
    return this.singleton.setAddXyz(v, x, y, z);
  }

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
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static scaleAdd(va, kb, vb) {
    return this.singleton.setScaleAdd(va, kb, vb);
  }

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
   * @param {number} ka
   * @param {Vec3} va
   * @param {number} kb
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static sum(ka, va, kb, vb) {
    return this.singleton.setSum(ka, va, kb, vb);
  }

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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static delta(va, vb) {
    return this.singleton.setDelta(va, vb);
  }

  // TODO: Test.
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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static subtract(va, vb) {
    return this.singleton.setSubtract(va, vb);
  }

  // TODO: Test.
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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @param {number} t
   * @returns {Vec3}
   */
  static lerp(va, vb, t) {
    return this.singleton.setLerp(va, vb, t);
  }

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

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static normalise(v) {
    return this.singleton.setNormalise(v);
  }

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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static min(va, vb) {
    return this.singleton.setMin(va, vb);
  }

  // TODO: Test.
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
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static max(va, vb) {
    return this.singleton.setMax(va, vb);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @param {(n: number) => number} f
   * @returns {Vec3}
   */
  setMap(v, f) {
    this.x = f(v.x);
    this.y = f(v.y);
    this.z = f(v.z);
    return this;
  }

  /**
   * @param {Vec3} v
   * @param {(n: number) => number} f
   * @returns {Vec3}
   */
  static map(v, f) {
    return this.singleton.setMap(v, f);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setYzx(v) {
    const {x, y, z} = v;
    this.x = y;
    this.y = z;
    this.z = x;
    return this;
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static setYzx(v) {
    return this.singleton.setYzx(v);
  }

  /**
   * @param {Vec3} v
   * @param {Rotor3} r
   * @returns {Vec3}
   */
  setRotateRotor3(v, r) {
    initRotor3Statics?.();
    staticQungedRotation
      .setComponents(r.rr, -r.yz, -r.zx, -r.xy)
      .inplaceMultiplyRight(
        staticQungedPosition.setComponents(0, v.x, v.y, v.z)
      )
      .inplaceMultiplyRight(r);
    this.x = staticQungedRotation.yz;
    this.y = staticQungedRotation.zx;
    this.z = staticQungedRotation.xy;
    return this;
  }

  /**
   * @param {Vec3} v
   * @param {Rotor3} r
   * @returns
   */
  static rotateRotor3(v, r) {
    return this.singleton.setRotateRotor3(v, r);
  }

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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static multiplyMat4Vec3(m, v) {
    return this.singleton.setMultiplyMat4Vec3(m, v);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, -v.z, v.x];
    return this;
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static nonParallel(v) {
    return this.singleton.setNonParallel(v);
  }

  // TODO: Test.
  // normal must be a unit vector.
  /**
   * @param {Vec3} normal
   * @returns {Vec3}
   */
  setOrthogonal(normal) {
    staticOrthogonal.set(normal);
    return this
      .setNonParallel(staticOrthogonal)
      .inplaceNormalProjection(staticOrthogonal)
      .inplaceNormalise();
  }

  /**
   * @param {Vec3} normal
   * @returns {Vec3}
   */
  static orthogonal(normal) {
    return this.singleton.setOrthogonal(normal);
  }

  // TODO: Test.
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

    const {x: a, y: b, z: c} = va;
    const {x: d, y: e, z: f} = vb;
    this.x = b * f - c * e;
    this.y = c * d - a * f;
    this.z = a * e - b * d;
    return this;
  }

  /**
   * @param {Vec3} va
   * @param {Vec3} vb
   * @returns {Vec3}
   */
  static cross(va, vb) {
    return this.singleton.setCross(va, vb);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setTurnXy(v) {
    return this.setXyz(-v.y, v.x, v.z);
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static turnXy(v) {
    return this.singleton.setTurnXy(v);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setUnturnXy(v) {
    return this.setXyz(v.y, -v.x, v.z);
  }

  /**
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static unturnXy(v) {
    return this.singleton.setUnturnXy(v);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @param {Vec3} r
   * @returns
   */
  setRotateXy(v, r) {
    return this.setXyz(
      v.x * r.x - v.y * r.y,
      v.x * r.y + v.y * r.x,
      v.z,
    );
  }

  /**
   * @param {Vec3} v
   * @param {Vec3} r
   * @returns
   */
  static setRotateXy(v, r) {
    return this.singleton.setRotateXy(v, r);
  }

  // TODO: Test.
  /**
   * @param {Vec3} v
   * @param {number} angle
   * @returns
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
   * @param {Vec3} v
   * @param {number} angle
   * @returns {Vec3}
   */
  static setRotateXyAngle(v, angle) {
    return this.singleton.setRotateXyAngle(v, angle);
  }

  // TODO: Test.
  // direction must be a unit vector.
  /**
   * @param {Vec3} direction
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns {Vec3}
   */
  setTurnTowards(direction, position, destination, cosMaxTurnAngle) {
    staticDestinationDirection.setDelta(position, destination).inplaceNormalise();
    if (direction.dot(staticDestinationDirection) >= cosMaxTurnAngle) {
      return this.set(staticDestinationDirection);
    }
    staticOrthogonal
      .setNormalProjection(direction, staticDestinationDirection)
      .inplaceNormalise();
    return this.setSum(
      cosMaxTurnAngle,
      direction,
      Math.sqrt(1 - cosMaxTurnAngle ** 2),
      staticOrthogonal,
    ).inplaceNormalise();
  }

  /**
   * @param {Vec3} direction
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns {Vec3}
   */
  static turnTowards(direction, position, destination, cosMaxTurnAngle) {
    return this.singleton.setTurnTowards(direction, position, destination, cosMaxTurnAngle);
  }

  // TODO: Test.
  /**
   * FIXME?
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {void}
   */
  setFractionTowards(position, destination, fraction) {
    this.x = position.x + (destination.x - position.x) * fraction;
    this.y = position.y + (destination.y - position.y) * fraction;
    this.z = position.z + (destination.z - position.z) * fraction;
  }

  /**
   * FIXME?
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {void}
   */
  static fractionTowards(position, destination, fraction) {
    return this.singleton.setFractionTowards(position, destination, fraction);
  }

  // TODO: Test.
  // normal must be a unit vector.
  // Same as setPlaneProjection() but uses a planeOrigin of (0,0,0).
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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static normalProjection(normal, v) {
    return this.singleton.setNormalProjection(normal, v);
  }

  // TODO: Test.
  // Projects v onto a plane.
  // planeNormal must be a unit vector.
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setPlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setRelativePlaneProjection(planeOrigin, planeNormal, v)
      .inplaceAdd(planeOrigin);
  }

  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static planeProjection(planeOrigin, planeNormal, v) {
    return this.singleton.setPlaneProjection(planeOrigin, planeNormal, v);
  }

  // TODO: Test.
  // Projects v onto a plane and returns the delta from the plane origin.
  // planeNormal must be a unit vector.
  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} position
   * @returns {Vec3}
   */
  setRelativePlaneProjection(planeOrigin, planeNormal, position) {
    return this
      .setDelta(planeOrigin, position)
      .inplaceNormalProjection(planeNormal)
  }

  /**
   * @param {Vec3} planeOrigin
   * @param {Vec3} planeNormal
   * @param {Vec3} position
   * @returns {Vec3}
   */
  static relativePlaneProjection(planeOrigin, planeNormal, position) {
    return this.singleton.setRelativePlaneProjection(planeOrigin, planeNormal, position);
  }

  // TODO: Test.
  // Takes a 3D point, projects it onto the plane and converts it to a "2D"
  // vector with only X and Y set to the local co-ordinates within the 2D plane
  // basis vectors.
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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static planeProjection2d(planeBasis, v) {
    return this.singleton.setPlaneProjection2d(planeBasis, v);
  }

  // TODO: Test.
  // Same as set2dPlaneProjection() but considers v as already relative to the
  // plane's origin.
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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static relativePlaneProjection2d(planeBasis, v) {
    return this.singleton.setRelativePlaneProjection2d(planeBasis, v);
  }

  // TODO: Test.
  // The reverse of set2dPlanePosition().
  // Takes a "2D" vector's X and Y values as being within the 2D plane's local
  // co-ordinates and converts it to a 3D vector on the plane's surface.
  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  setPlanePosition3d(planeBasis, v) {
    return this.setRelativePlanePosition3d(planeBasis, v).inplaceAdd(planeBasis.origin);
  }

  /**
   * @param {PlaneBasis} planeBasis
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static planePosition3d(planeBasis, v) {
    return this.singleton.setPlanePosition3d(planeBasis, v);
  }

  // TODO: Test.
  // The reverse of setRelative2dPlanePosition().
  // Same as set3dPlanePosition() but keeps the resulting vector relative to the
  // plane's origin.
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
   * @param {Vec3} v
   * @returns {Vec3}
   */
  static relativePlanePosition3d(planeBasis, v) {
    return this.singleton.setRelativePlanePosition3d(planeBasis, v);
  }

  /** @param {number} k @returns {Vec3} */
  inplaceScale(k) { return this.setScale(k, this); }

  /** @param {number} x @param {number} y @param {number} z @returns {Vec3} */
  inplaceScaleXyz(x=1, y=1, z=1) { return this.setScaleXyz(this, x, y, z); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceAdd(v) { return this.setAdd(this, v); }

  /** @param {number} x @param {number} y @param {number} z @returns {Vec3} */
  inplaceAddXyz(x=0, y=0, z=0) { return this.setAddXyz(this, x, y, z); }

  /** @param {number} k @param {Vec3} v @returns {Vec3} */
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }

  /** @param {number} ka @param {number} kb @param {Vec3} vb @returns {Vec3} */
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceDelta(v) { return this.setDelta(this, v); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceSubtract(v) { return this.setSubtract(this, v); }

  /** @param {Vec3} v @param {number} t @returns {Vec3} */
  inplaceLerp(v, t) { return this.setLerp(this, v, t); }

  /** @returns {Vec3} */
  inplaceNormalise() { return this.setNormalise(this); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceMin(v) { return this.setMin(this, v); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceMax(v) { return this.setMax(this, v); }

  /** @param {(n: number) => number} f @return {Vec3} */
  inplaceMap(f) { return this.setMap(this, f); }

  /** @returns {Vec3} */
  inplaceYzx() { return this.setYzx(this) }

  /** @param {Rotor3} r @returns {Vec3} */
  inplaceRotateRotor3(r) { return this.setRotateRotor3(this, r); }

  /** @param {Mat4} m @returns {Vec3} */
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }

  /** @returns {Vec3} */
  inplaceNonParallel() { return this.setNonParallel(this); }

  /** @returns {Vec3} */
  inplaceOrthogonal() { return this.setOrthogonal(this); }

  /** @param {Vec3} v @returns {Vec3} */
  inplaceCross(v) { return this.setCross(this, v); }

  /** @returns {Vec3} */
  inplaceTurnXy() { return this.setTurnXy(this); }

  /** @returns {Vec3} */
  inplaceUnturnXy() { return this.setUnturnXy(this); }

  /** @param {Vec3} r @returns {Vec3} */
  inplaceRotateXy(r) { return this.setRotateXy(this, r); }

  /** @param {number} angle @returns {Vec3} */

  inplaceRotateXyAngle(angle) { return this.setRotateXyAngle(this, angle); }

  /**
   * @param {Vec3} position
   * @param {Vec3} destination
   * @param {number} cosMaxTurnAngle
   * @returns
   */
  inplaceTurnTowards(position, destination, cosMaxTurnAngle) { return this.setTurnTowards(this, position, destination, cosMaxTurnAngle); }

  /**
   * FIXME: This seems like this.setFractionTowards should return but it doesn't see above
   * @param {Vec3} destination
   * @param {number} fraction
   * @returns {void}
   */
  inplaceFractionTowards(destination, fraction) { return this.setFractionTowards(this, destination, fraction); }

  /** @param {Vec3} normal @returns {Vec3} */
  inplaceNormalProjection(normal) { return this.setNormalProjection(normal, this); }

  /** @param {Vec3} planeOrigin @param {Vec3} planeNormal @returns {Vec3} */
  inplacePlaneProjection(planeOrigin, planeNormal) { return this.setPlaneProjection(planeOrigin, planeNormal, this); }

  /** @param {Vec3} planeOrigin @param {Vec3} planeNormal @returns {Vec3} */
  inplaceRelativePlaneProjection(planeOrigin, planeNormal) { return this.setRelativePlaneProjection(planeOrigin, planeNormal, this); }

  /** @param {PlaneBasis} planeBasis @returns {Vec3} */
  inplacePlaneProjection2d(planeBasis) { return this.setPlaneProjection2d(planeBasis, this); }

  /** @param {PlaneBasis} planeBasis @returns {Vec3} */
  inplaceRelativePlaneProjection2d(planeBasis) { return this.setRelativePlaneProjection2d(planeBasis, this); }

  /** @param {PlaneBasis} planeBasis @returns {Vec3} */
  inplacePlanePosition3d(planeBasis) { return this.setPlanePosition3d(planeBasis, this); }

  /** @param {PlaneBasis} planeBasis @returns {Vec3} */
  inplaceRelativePlanePosition3d(planeBasis) { return this.setRelativePlanePosition3d(planeBasis, this); }
}

const tempStorage = Temp.registerStorage(() => new Vec3());

const staticOrthogonal = new Vec3();
const staticDestinationDirection = new Vec3();

/** @type {Rotor3} */
let staticQungedRotation;
/** @type {Rotor3} */
let staticQungedPosition;

/** @type {(() => void) | null} */
let initRotor3Statics = function() {
  initRotor3Statics = null;
  staticQungedRotation = new Rotor3();
  staticQungedPosition = new Rotor3();
};
