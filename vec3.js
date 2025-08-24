import {Temp} from './temp.js';
import {Rotor3} from './rotor3.js';

const tempStorage = Temp.registerStorage(() => new Vec3());

export class Vec3 {
  static temp(x=0, y=0, z=0) {
    return tempStorage.acquire().setXyz(x, y, z);
  }

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

  setXyz(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  // TODO: Test.
  setPolarXy(angle, length=1) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
    this.z = 0;
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

  setMultiplyMat4Vec3(m, v) {
    return this.setXyz(
      m.aa * v.x + m.ab * v.y + m.ac * v.z + m.ad,
      m.ba * v.x + m.bb * v.y + m.bc * v.z + m.bd,
      m.ca * v.x + m.cb * v.y + m.cc * v.z + m.cd,
    );
  }

  // TODO: Test.
  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, -v.z, v.x];
    return this;
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
    // = x(bf - ce) + y(cd - af) + z(ae - bd)

    const {x: a, y: b, z: c} = va;
    const {x: d, y: e, z: f} = vb;
    this.x = b * f - c * e;
    this.y = c * d - a * f;
    this.z = a * e - b * d;
    return this;
  }

  setTurnXy(v) {
    return this.setXyz(-v.y, v.x, v.z);
  }

  // TODO: Test.
  // normal must be a unit vector.
  // Same as setPlaneProjection() but uses a planeOrigin of (0,0,0).
  setNormalProjection(normal, v) {
    return this.setScaleAdd(v, -v.dot(normal), normal);
  }

  // TODO: Test.
  // Projects v onto a plane.
  // planeNormal must be a unit vector.
  setPlaneProjection(planeOrigin, planeNormal, v) {
    return this
      .setRelativePlaneProjection(planeOrigin, planeNormal, v)
      .inplaceAdd(planeOrigin);
  }

  // TODO: Test.
  // Projects v onto a plane and returns the delta from the plane origin.
  // planeNormal must be a unit vector.
  setRelativePlaneProjection(planeOrigin, planeNormal, position) {
    return this
      .setDelta(planeOrigin, position)
      .inplaceNormalProjection(planeNormal)
  }

  // TODO: Test.
  // Takes a 3D point, projects it onto the plane and converts it to a "2D"
  // vector with only X and Y set to the local co-ordinates within the 2D plane
  // basis vectors.
  set2dPlaneProjection(planeBasis, v) {
    return this.setRelative2dPlaneProjection(planeBasis, this.setDelta(planeBasis.origin, v));
  }

  // TODO: Test.
  // Same as set2dPlaneProjection() but considers v as already relative to the
  // plane's origin.
  setRelative2dPlaneProjection(planeBasis, v) {
    return this.setXyz(planeBasis.xDirection.dot(v), planeBasis.yDirection.dot(v), 0);
  }

  // TODO: Test.
  // The reverse of set2dPlanePosition().
  // Takes a "2D" vector's X and Y values as being within the 2D plane's local
  // co-ordinates and converts it to a 3D vector on the plane's surface.
  set3dPlanePosition(planeBasis, v) {
    return this.setRelative3dPlanePosition(planeBasis, v).inplaceAdd(planeBasis.origin);
  }

  // TODO: Test.
  // The reverse of setRelative2dPlanePosition().
  // Same as set3dPlanePosition() but keeps the resulting vector relative to the
  // plane's origin.
  setRelative3dPlanePosition(planeBasis, v) {
    return this.setSum(v.x, planeBasis.xDirection, v.y, planeBasis.yDirection);
  }

  inplaceScale(k) { return this.setScale(k, this); }
  inplaceAdd(v) { return this.setAdd(this, v); }
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }
  inplaceDelta(v) { return this.setDelta(this, v); }
  inplaceNormalise() { return this.setNormalise(this); }
  inplaceRotateRotor(r) { return this.setRotateRotor(this, r); }
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }
  inplaceNonParallel() { return this.setNonParallel(this); }
  inplaceOrthogonal() { return this.setOrthogonal(this); }
  inplaceCross(v) { return this.setCross(this, v); }
  inplaceTurnXy() { return this.setTurnXy(this); }
  inplaceNormalProjection(normal) { return this.setNormalProjection(normal, this); }
  inplacePlaneProjection(planeOrigin, planeNormal) { return this.setPlaneProjection(planeOrigin, planeNormal, this); }
  inplaceRelativePlaneProjection(planeOrigin, planeNormal) { return this.setRelativePlaneProjection(planeOrigin, planeNormal, this); }
  inplace2dPlaneProjection(planeBasis) { return this.set2dPlaneProjection(planeBasis, this); }
  inplaceRelative2dPlaneProjection(planeBasis) { return this.setRelative2dPlaneProjection(planeBasis, this); }
  inplace3dPlanePosition(planeBasis) { return this.set3dPlanePosition(planeBasis, this); }
  inplaceRelative3dPlanePosition(planeBasis) { return this.setRelative3dPlanePosition(planeBasis, this); }
}
