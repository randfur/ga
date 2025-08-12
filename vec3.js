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
      Rotor3.temp().setComponents(r.rr, -r.yz, -r.zx, -r.xy)
        .inplaceMultiplyRight(Rotor3.temp().setComponents(0, v.x, v.y, v.z))
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

  // normal must be a unit vector.
  setNormalProjection(normal, position) {
    return this.setScaleAdd(position, -position.dot(normal), normal);
  }

  // planeNormal must be a unit vector.
  setRelativePlaneProjection(planePosition, planeNormal, position) {
    return this
      .setDelta(planePosition, position)
      .inplaceNormalProjection(planeNormal)
  }

  // planeNormal must be a unit vector.
  setPlaneProjection(planePosition, planeNormal, position) {
    return this
      .setRelativePlaneProjection(planePosition, planeNormal, position)
      .inplaceAdd(planePosition);
  }

  setNonParallel(v) {
    [this.x, this.y, this.z] = [v.y, v.z, -v.x];
    return this;
  }

  static #orthogonalTemp = new Vec3();
  // normal must be a unit vector.
  setOrthogonal(normal) {
    Vec3.#orthogonalTemp.set(normal);
    return this
      .setNonParallel(Vec3.#orthogonalTemp)
      .inplaceNormalProjection(Vec3.#orthogonalTemp)
      .implaceNormalise();
  }

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

  inplaceScale(k) { return this.setScale(k, this); }
  inplaceAdd(v) { return this.setAdd(this, v); }
  inplaceScaleAdd(k, v) { return this.setScaleAdd(this, k, v); }
  inplaceSum(ka, kb, vb) { return this.setSum(ka, this, kb, vb); }
  inplaceDelta(v) { return this.setDelta(this, v); }
  inplaceNormalise() { return this.setNormalise(this); }
  inplaceRotateRotor(r) { return this.setRotateRotor(this, r); }
  inplaceMultiplyMat4Left(m) { return this.setMultiplyMat4Vec3(m, this); }
  inplaceNormalProjection(normal) { return this.setNormalProjection(normal, this); }
  inplaceRelativePlaneProjection(planePosition, planeNormal) { return this.setRelativePlaneProjection(planePosition, planeNormal, this); }
  inplacePlaneProjection(planePosition, planeNormal) { return this.setPlaneProjection(planePosition, planeNormal, this); }
  inplaceNonParallel() { return this.setNonParallel(this); }
  inplaceOrthogonal() { return this.setOrthogonal(this); }
  inplaceCross(v) { return this.setCross(this, v); }
}
