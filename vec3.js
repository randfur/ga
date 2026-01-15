import {Temp} from './temp.js';
import {Rotor3} from './rotor3.js';

const tempStorage = Temp.registerStorage(() => new Vec3());

export class Vec3 {
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
  clone() {
    return new Vec3(this.x, this.y, this.z);
  }

  // TODO: Test.
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

  setZero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
  }
  static zero() {
    return this.singleton.setZero();
  }

  setXyz(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }
  static xyz(x, y, z) {
    return this.singleton.setXyz(x, y, z);
  }

  // TODO: Test.
  setX(x=1) {
    this.x = x;
    this.y = 0;
    this.z = 0;
    return this;
  }
  static x(x=1) {
    return this.singleton.setX(x);
  }

  // TODO: Test.
  setY(y=1) {
    this.x = 0;
    this.y = y;
    this.z = 0;
    return this;
  }
  static y(y=1) {
    return this.singleton.setY(y);
  }

  // TODO: Test.
  setZ(z=1) {
    this.x = 0;
    this.y = 0;
    this.z = z;
    return this;
  }
  static z(z=1) {
    return this.singleton.setZ(z);
  }

  // TODO: Test.
  setPolar(angle, radius=1) {
    this.x = Math.cos(angle) * radius;
    this.y = Math.sin(angle) * radius;
    this.z = 0;
    return this;
  }
  static polar(angle, radius=1) {
    return this.singleton.setPolar(angle, radius);
  }

  // TODO: Test.
  setSpherical(angleXy, angleZ, radius=1) {
    this.x = Math.cos(angleXy) * Math.sin(angleZ) * radius;
    this.y = Math.sin(angleXy) * Math.sin(angleZ) * radius;
    this.z = Math.cos(angleZ) * radius;
    return this;
  }
  static spherical(angleXy, angleZ, radius=1) {
    return this.singleton.setSpherical(angleXy, angleZ, radius);
  }

  setScale(k, v) {
    this.x = k * v.x;
    this.y = k * v.y;
    this.z = k * v.z;
    return this;
  }
  static scale(k, v) {
    return this.singleton.setScale(k, v);
  }

  setAdd(va, vb) {
    this.x = va.x + vb.x;
    this.y = va.y + vb.y;
    this.z = va.z + vb.z;
    return this;
  }
  static add(va, vb) {
    return this.singleton.setAdd(va, vb);
  }

  // TODO: Test.
  setAddXyz(v, x, y, z) {
    this.x = v.x + x;
    this.y = v.y + y;
    this.z = v.z + z;
    return this;
  }
  static addXyz(v, x, y, z) {
    return this.singleton.setAddXyz(v, x, y, z);
  }

  setScaleAdd(va, kb, vb) {
    this.x = va.x + kb * vb.x;
    this.y = va.y + kb * vb.y;
    this.z = va.z + kb * vb.z;
    return this;
  }
  static scaleAdd(va, kb, vb) {
    return this.singleton.setScaleAdd(va, kb, vb);
  }

  setSum(ka, va, kb, vb) {
    this.x = ka * va.x + kb * vb.x;
    this.y = ka * va.y + kb * vb.y;
    this.z = ka * va.z + kb * vb.z;
    return this;
  }
  static sum(ka, va, kb, vb) {
    return this.singleton.setSum(ka, va, kb, vb);
  }

  setDelta(va, vb) {
    this.x = vb.x - va.x;
    this.y = vb.y - va.y;
    this.z = vb.z - va.z;
    return this;
  }
  static delta(va, vb) {
    return this.singleton.setDelta(va, vb);
  }

  // TODO: Test.
  setSubtract(va, vb) {
    this.x = va.x - vb.x;
    this.y = va.y - vb.y;
    this.z = va.z - vb.z;
    return this;
  }
  static subtract(va, vb) {
    return this.singleton.setSubtract(va, vb);
  }

  // TODO: Test.
  setLerp(va, vb, t) {
    this.x = va.x + t * (vb.x - va.x);
    this.y = va.y + t * (vb.y - va.y);
    this.z = va.z + t * (vb.z - va.z);
    return this;
  }
  static lerp(va, vb, t) {
    return this.singleton.setLerp(va, vb, t);
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
  static normalise(v) {
    return this.singleton.setNormalise(v);
  }

  // TODO: Test.
  setMin(va, vb) {
    this.x = Math.min(va.x, vb.x);
    this.y = Math.min(va.y, vb.y);
    this.z = Math.min(va.z, vb.z);
    return this;
  }
  static min(va, vb) {
    return this.singleton.setMin(va, vb);
  }

  // TODO: Test.
  setMax(va, vb) {
    this.x = Math.max(va.x, vb.x);
    this.y = Math.max(va.y, vb.y);
    this.z = Math.max(va.z, vb.z);
    return this;
  }
  static max(va, vb) {
    return this.singleton.setMax(va, vb);
  }

  setRotateRotor(v, r) {
    const qunged =
      Rotor3.temp()
        .setComponents(r.rr, -r.yz, -r.zx, -r.xy)
        .inplaceMultiplyRight(
          Rotor3.temp().setComponents(0, v.x, v.y, v.z)
        )
        .inplaceMultiplyRight(r);
    this.x = qunged.yz;
    this.y = qunged.zx;
    this.z = qunged.xy;
    return this;
  }
  static rotateRotor(v, r) {
    return this.singleton.setRotateRotor(v, r);
  }

  setMultiplyMat4Vec3(m, v) {
    return this.setXyz(
      m.aa * v.x + m.ab * v.y + m.ac * v.z + m.ad,
      m.ba * v.x + m.bb * v.y + m.bc * v.z + m.bd,
      m.ca * v.x + m.cb * v.y + m.cc * v.z + m.cd,
    );
  }
  static multiplyMat4Vec3(m, v) {
    return this.singleton.setMultiplyMat4Vec3(m, v);
  }

  // TODO: Test.
  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, -v.z, v.x];
    return this;
  }
  static nonParallel(v) {
    return this.singleton.setNonParallel(v);
  }

  static #orthogonalTemp = new Vec3();
  // TODO: Test.
  // normal must be a unit vector.
  setOrthogonal(normal) {
    Vec3.#orthogonalTemp.set(normal);
    return this
      .setNonParallel(Vec3.#orthogonalTemp)
      .inplaceNormalProjection(Vec3.#orthogonalTemp)
      .inplaceNormalise();
  }
  static orthogonal(normal) {
    return this.singleton.setOrthogonal(normal);
  }

  // TODO: Test.
  setCross(va, vb) {
    // Matrix determinant method:
    //     [x y z]
    // det([a b c])
    //     [d e f]
    // = x(bf - ce) - y(af - cd) + z(ae - bd)

    // Geometric algebra method:
    // munge(nonreal((ax + by + cz) * (dx + ey + fz)))
    // = munge(nonreal(adxx + aexy + afxz + bdyx + beyy + bfyz + cdzx + cezy + cfzz))
    // = munge(aexy + afxz + bdyx + bfyz + cdzx + cezy)
    // = munge(aexy - afzx - bdxy + bfyz + cdzx - ceyz)
    // = aez - afy - bdz + bfx + cdy - cex
    // = x(bf - ce) + y(cd - af) + z(ae - bd)i

    const {x: a, y: b, z: c} = va;
    const {x: d, y: e, z: f} = vb;
    this.x = b * f - c * e;
    this.y = c * d - a * f;
    this.z = a * e - b * d;
    return this;
  }
  static cross(va, vb) {
    return this.singleton.setCross(va, vb);
  }

  // TODO: Test.
  setTurnXy(v) {
    return this.setXyz(-v.y, v.x, v.z);
  }
  static turnXy(v) {
    return this.singleton.setTurnXy(v);
  }

  // TODO: Test.
  setUnturnXy(v) {
    return this.setXyz(v.y, -v.x, v.z);
  }
  static unturnXy(v) {
    return this.singleton.setUnturnXy(v);
  }

  // TODO: Test.
  // normal must be a unit vector.
  // Same as setPlaneProjection() but uses a planeOrigin of (0,0,0).
  setNormalProjection(normal, v) {
    return this.setScaleAdd(v, -v.dot(normal), normal);
  }
  static normalProjection(normal, v) {
    return this.singleton.setNormalProjection(normal, v);
  }

  // TODO: Test.
  // Projects v onto a plane.
  // planeNormal must be a unit vector.
  setPlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setRelativePlaneProjection(planeOrigin, planeNormal, v)
      .inplaceAdd(planeOrigin);
  }
  static planeProjection(planeOrigin, planeNormal, v) {
    return this.singleton.setPlaneProjection(planeOrigin, planeNormal, v);
  }

  // TODO: Test.
  // Projects v onto a plane and returns the delta from the plane origin.
  // planeNormal must be a unit vector.
  setRelativePlaneProjection(planeOrigin, planeNormal, position) {
    return this
      .setDelta(planeOrigin, position)
      .inplaceNormalProjection(planeNormal)
  }
  static relativePlaneProjection(planeOrigin, planeNormal, position) {
    return this.singleton.setRelativePlaneProjection(planeOrigin, planeNormal, position);
  }

  // TODO: Test.
  // Takes a 3D point, projects it onto the plane and converts it to a "2D"
  // vector with only X and Y set to the local co-ordinates within the 2D plane
  // basis vectors.
  setPlaneProjection2d(planeBasis, v) {
    return this.setRelativePlaneProjection2d(planeBasis, this.setDelta(planeBasis.origin, v));
  }
  static planeProjection2d(planeBasis, v) {
    return this.singleton.setPlaneProjection2d(planeBasis, v);
  }

  // TODO: Test.
  // Same as set2dPlaneProjection() but considers v as already relative to the
  // plane's origin.
  setRelativePlaneProjection2d(planeBasis, v) {
    return this.setXyz(planeBasis.xDirection.dot(v), planeBasis.yDirection.dot(v), 0);
  }
  static relativePlaneProjection2d(planeBasis, v) {
    return this.singleton.setRelativePlaneProjection2d(planeBasis, v);
  }

  // TODO: Test.
  // The reverse of set2dPlanePosition().
  // Takes a "2D" vector's X and Y values as being within the 2D plane's local
  // co-ordinates and converts it to a 3D vector on the plane's surface.
  setPlanePosition3d(planeBasis, v) {
    return this.setRelativePlanePosition3d(planeBasis, v).inplaceAdd(planeBasis.origin);
  }
  static planePosition3d(planeBasis, v) {
    return this.singleton.setPlanePosition3d(planeBasis, v);
  }

  // TODO: Test.
  // The reverse of setRelative2dPlanePosition().
  // Same as set3dPlanePosition() but keeps the resulting vector relative to the
  // plane's origin.
  setRelativePlanePosition3d(planeBasis, v) {
    return this.setSum(v.x, planeBasis.xDirection, v.y, planeBasis.yDirection);
  }
  static relativePlanePosition3d(planeBasis, v) {
    return this.singleton.setRelativePlanePosition3d(planeBasis, v);
  }

  inplaceScale(k) { return this.setScale(k, this); }
  inplaceAdd(v) { return this.setAdd(this, v); }
  inplaceAddXyz(x, y, z) { return this.setAddXyz(this, x, y, z); }
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }
  inplaceDelta(v) { return this.setDelta(this, v); }
  inplaceSubtract(v) { return this.setSubtract(this, v); }
  inplaceLerp(v, t) { return this.setLerp(this, v, t); }
  inplaceNormalise() { return this.setNormalise(this); }
  inplaceMin(v) { return this.setMin(this, v); }
  inplaceMax(v) { return this.setMax(this, v); }
  inplaceRotateRotor(r) { return this.setRotateRotor(this, r); }
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }
  inplaceNonParallel() { return this.setNonParallel(this); }
  inplaceOrthogonal() { return this.setOrthogonal(this); }
  inplaceCross(v) { return this.setCross(this, v); }
  inplaceTurnXy() { return this.setTurnXy(this); }
  inplaceUnturnXy() { return this.setUnturnXy(this); }
  inplaceNormalProjection(normal) { return this.setNormalProjection(normal, this); }
  inplacePlaneProjection(planeOrigin, planeNormal) { return this.setPlaneProjection(planeOrigin, planeNormal, this); }
  inplaceRelativePlaneProjection(planeOrigin, planeNormal) { return this.setRelativePlaneProjection(planeOrigin, planeNormal, this); }
  inplacePlaneProjection2d(planeBasis) { return this.setPlaneProjection2d(planeBasis, this); }
  inplaceRelativePlaneProjection2d(planeBasis) { return this.setRelativePlaneProjection2d(planeBasis, this); }
  inplacePlanePosition3d(planeBasis) { return this.setPlanePosition3d(planeBasis, this); }
  inplaceRelativePlanePosition3d(planeBasis) { return this.setRelativePlanePosition3d(planeBasis, this); }
}
