import { Vec3 } from '../vec3.js';
import { PlaneBasis } from '../plane-basis.js';
import { Mat4 } from '../mat4.js';
import { Rotor3 } from '../rotor3.js';

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
declare global {
    class Vec3Type {

        x: number;
        y: number;
        z: number;

          // Uses of this must include a call to Temp.reclaimAll().
        static temp(x?: number, y?: number, z?: number): Vec3;
        static singleton: Vec3;
        static a: Vec3;
        static b: Vec3;
        static c: Vec3;
        static d: Vec3;

        constructor(x?: number, y?: number, z?: number);

        // TODO: Test.
        clone(): Vec3;

        // TODO: Test.
        squareLength(): number;

        length(): number;

        dot(v: Vec3): number;

        // TODO: Test.
        apply(f: (v: Vec3) => void): Vec3;

        set(v: Vec3): Vec3;
        static set(v: Vec3): Vec3;

        setZero(): Vec3;
        static zero(): Vec3;

        setXyz(x?: number, y?: number, z?: number): Vec3;
        static xyz(x?: number, y?: number, z?: number): Vec3;

        // TODO: Test.
        setX(x?: number): Vec3;
        static x(x?: number): Vec3;

        // TODO: Test.
        setY(y?: number): Vec3;
        static y(y?: number): Vec3;

        // TODO: Test.
        setZ(z?: number): Vec3;
        static z(z?: number): Vec3;

        // TODO: Test.
        setPolar(angle: number, radius?: number): Vec3;
        static polar(angle: number, radius?: number): Vec3;

        // TODO: Test.
        setSpherical(angleXy: number, angleZ: number, radius?: number): Vec3;
        static spherical(angleXy: number, angleZ: number, radius?: number): Vec3;

        setScale(k: number, v: Vec3): Vec3;
        static scale(k: number, v: Vec3): Vec3;

        // TODO: Test.
        setScaleXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        static scaleXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;

        setAdd(va: Vec3, vb: Vec3): Vec3;
        static add(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setAddXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        static addXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;

        setScaleAdd(va: Vec3, kb: number, vb: Vec3): Vec3;
        static scaleAdd(va: Vec3, kb: number, vb: Vec3): Vec3;

        setSum(ka: number, va: Vec3, kb: number, vb: Vec3): Vec3;
        static sum(ka: number, va: Vec3, kb: number, vb: Vec3): Vec3;

        setDelta(va: Vec3, vb: Vec3): Vec3;
        static delta(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setSubtract(va: Vec3, vb: Vec3): Vec3;
        static subtract(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setLerp(va: Vec3, vb: Vec3, t: number): Vec3;
        static lerp(va: Vec3, vb: Vec3, t: number): Vec3;

        setNormalise(v: Vec3): Vec3;
        static normalise(v: Vec3): Vec3;

        // TODO: Test.
        setMin(va: Vec3, vb: Vec3): Vec3;
        static min(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setMax(va: Vec3, vb: Vec3): Vec3;
        static max(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setMap(v: Vec3, f: (n: number) => number): Vec3;
        static map(v: Vec3, f: (n: number) => number): Vec3;

        // TODO: Test.
        setYzx(v: Vec3): Vec3;
        static setYzx(v: Vec3): Vec3;

        setRotateRotor3(v: Vec3, r: Rotor3): Vec3;
        static rotateRotor3(v: Vec3, r: Rotor3): Vec3;

        setMultiplyMat4Vec3(m: Mat4, v: Vec3): Vec3;
        static multiplyMat4Vec3(m: Mat4, v: Vec3): Vec3;

        // TODO: Test.
        setNonParallel(v: Vec3): Vec3;
        static nonParallel(v: Vec3): Vec3;

        // TODO: Test.
        // normal must be a unit vector.
        setOrthogonal(normal: Vec3): Vec3;
        static orthogonal(normal: Vec3): Vec3;

        // TODO: Test.
        setCross(va: Vec3, vb: Vec3): Vec3;
        static cross(va: Vec3, vb: Vec3): Vec3;

        // TODO: Test.
        setTurnXy(v: Vec3): Vec3;
        static turnXy(v: Vec3): Vec3;

        // TODO: Test.
        setUnturnXy(v: Vec3): Vec3;
        static unturnXy(v: Vec3): Vec3;

        // TODO: Test.
        setRotateXy(v: Vec3, r: Vec3): Vec3;
        static setRotateXy(v: Vec3, r: Vec3): Vec3;

        // TODO: Test.
        setRotateXyAngle(v: Vec3, angle: number): Vec3;
        static setRotateXyAngle(v: Vec3, angle: number): Vec3;

        // TODO: Test.
        // direction must be a unit vector.
        setTurnTowards(
            direction: Vec3,
            position: Vec3,
            destination: Vec3,
            cosMaxTurnAngle: number
        ): Vec3;
        static turnTowards(
            direction: Vec3,
            position: Vec3,
            destination: Vec3,
            cosMaxTurnAngle: number
        ): Vec3;

        // TODO: Test.
        setFractionTowards(position: Vec3, destination: Vec3, fraction: number): Vec3;
        static fractionTowards(position: Vec3, destination: Vec3, fraction: number): Vec3;

        // TODO: Test.
        // normal must be a unit vector.
        // Same as setPlaneProjection() but uses a planeOrigin of (0,0,0).
        setNormalProjection(normal: Vec3, v: Vec3): Vec3;
        static normalProjection(normal: Vec3, v: Vec3): Vec3;

        // TODO: Test.
        // Projects v onto a plane.
        // planeNormal must be a unit vector.
        setPlaneProjection(planeOrigin: Vec3, planeNormal: Vec3, v: Vec3): Vec3;
        static planeProjection(planeOrigin: Vec3, planeNormal: Vec3, v: Vec3): Vec3;

        // TODO: Test.
        // Projects v onto a plane and returns the delta from the plane origin.
        // planeNormal must be a unit vector.
        setRelativePlaneProjection(
            planeOrigin: Vec3,
            planeNormal: Vec3,
            position: Vec3
        ): Vec3;
        static relativePlaneProjection(
            planeOrigin: Vec3,
            planeNormal: Vec3,
            position: Vec3
        ): Vec3;

        // TODO: Test.
        // Takes a 3D point, projects it onto the plane and converts it to a "2D"
        // vector with only X and Y set to the local co-ordinates within the 2D plane
        // basis vectors.
        setPlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static planeProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;

        // TODO: Test.
        // Same as set2dPlaneProjection() but considers v as already relative to the
        // plane's origin.
        setRelativePlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static relativePlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;

        // TODO: Test.
        // The reverse of set2dPlanePosition().
        // Takes a "2D" vector's X and Y values as being within the 2D plane's local
        // co-ordinates and converts it to a 3D vector on the plane's surface.
        setPlanePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static planePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;

        // TODO: Test.
        // The reverse of setRelative2dPlanePosition().
        // Same as set3dPlanePosition() but keeps the resulting vector relative to the
        // plane's origin.
        setRelativePlanePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static relativePlanePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;

        inplaceScale(k: number): Vec3;

        inplaceScaleXyz(x?: number, y?: number, z?: number): Vec3;

        inplaceAdd(v: Vec3): Vec3;

        inplaceAddXyz(x?: number, y?: number, z?: number): Vec3;

        inplaceScaleAdd(k: number, v: Vec3): Vec3;

        inplaceSum(ka: number, kb: number, vb: Vec3): Vec3;

        inplaceDelta(v: Vec3): Vec3;

        inplaceSubtract(v: Vec3): Vec3;

        inplaceLerp(v: Vec3, t: number): Vec3;

        inplaceNormalise(): Vec3;

        inplaceMin(v: Vec3): Vec3;

        inplaceMax(v: Vec3): Vec3;

        inplaceMap(f: (n: number) => number): Vec3;

        inplaceYzx(): Vec3;

        inplaceRotateRotor3(r: Rotor3): Vec3;

        inplaceMultiplyMat4Left(m: Mat4): Vec3;

        inplaceNonParallel(): Vec3;

        inplaceOrthogonal(): Vec3;

        inplaceCross(v: Vec3): Vec3;

        inplaceTurnXy(): Vec3;

        inplaceUnturnXy(): Vec3;

        inplaceRotateXy(r: Vec3): Vec3;

        inplaceRotateXyAngle(angle: number): Vec3;

        inplaceTurnTowards(
            position: Vec3,
            destination: Vec3,
            cosMaxTurnAngle: number
        ): Vec3;

        inplaceFractionTowards(destination: Vec3, fraction: number): Vec3;

        inplaceNormalProjection(normal: Vec3): Vec3;

        inplacePlaneProjection(planeOrigin: Vec3, planeNormal: Vec3): Vec3;

        inplaceRelativePlaneProjection(planeOrigin: Vec3, planeNormal: Vec3): Vec3;

        inplacePlaneProjection2d(planeBasis: PlaneBasis): Vec3;

        inplaceRelativePlaneProjection2d(planeBasis: PlaneBasis): Vec3;

        inplacePlanePosition3d(planeBasis: PlaneBasis): Vec3;

        inplaceRelativePlanePosition3d(planeBasis: PlaneBasis): Vec3;
    }
}

export { };