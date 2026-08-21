import { Vec3 } from '../vec3.js';
import { PlaneBasis } from '../plane-basis.js';
import { Mat4 } from '../mat4.js';
import { Rotor3 } from '../rotor3.js';

declare global {
    class Vec3Type {
        x: number;
        y: number;
        z: number;
        static temp(x?: number, y?: number, z?: number): Vec3;
        static singleton: Vec3;
        static a: Vec3;
        static b: Vec3;
        static c: Vec3;
        static d: Vec3;
        constructor(x?: number, y?: number, z?: number);
        clone(): Vec3;
        squareLength(): number;
        length(): number;
        dot(v: Vec3): number;
        apply(f: (v: Vec3) => void): Vec3;
        set(v: Vec3): Vec3;
        static set(v: Vec3): Vec3;
        setZero(): Vec3;
        static zero(): Vec3;
        setXyz(x?: number, y?: number, z?: number): Vec3;
        static xyz(x?: number, y?: number, z?: number): Vec3;
        setX(x?: number): Vec3;
        static x(x?: number): Vec3;
        setY(y?: number): Vec3;
        static y(y?: number): Vec3;
        setZ(z?: number): Vec3;
        static z(z?: number): Vec3;
        setPolar(angle: number, radius?: number): Vec3;
        static polar(angle: number, radius?: number): Vec3;
        setSpherical(angleXy: number, angleZ: number, radius?: number): Vec3;
        static spherical(angleXy: number, angleZ: number, radius?: number): Vec3;
        setScale(k: number, v: Vec3): Vec3;
        static scale(k: number, v: Vec3): Vec3;
        setScaleXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        static scaleXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        setAdd(va: Vec3, vb: Vec3): Vec3;
        static add(va: Vec3, vb: Vec3): Vec3;
        setAddXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        static addXyz(v: Vec3, x?: number, y?: number, z?: number): Vec3;
        setScaleAdd(va: Vec3, kb: number, vb: Vec3): Vec3;
        static scaleAdd(va: Vec3, kb: number, vb: Vec3): Vec3;
        setSum(ka: number, va: Vec3, kb: number, vb: Vec3): Vec3;
        static sum(ka: number, va: Vec3, kb: number, vb: Vec3): Vec3;
        setDelta(va: Vec3, vb: Vec3): Vec3;
        static delta(va: Vec3, vb: Vec3): Vec3;
        setSubtract(va: Vec3, vb: Vec3): Vec3;
        static subtract(va: Vec3, vb: Vec3): Vec3;
        setLerp(va: Vec3, vb: Vec3, t: number): Vec3;
        static lerp(va: Vec3, vb: Vec3, t: number): Vec3;
        setNormalise(v: Vec3): Vec3;
        static normalise(v: Vec3): Vec3;
        setMin(va: Vec3, vb: Vec3): Vec3;
        static min(va: Vec3, vb: Vec3): Vec3;
        setMax(va: Vec3, vb: Vec3): Vec3;
        static max(va: Vec3, vb: Vec3): Vec3;
        setMap(v: Vec3, f: (n: number) => number): Vec3;
        static map(v: Vec3, f: (n: number) => number): Vec3;
        setYzx(v: Vec3): Vec3;
        static setYzx(v: Vec3): Vec3;
        setRotateRotor3(v: Vec3, r: Rotor3): Vec3;
        static rotateRotor3(v: Vec3, r: Rotor3): Vec3;
        setMultiplyMat4Vec3(m: Mat4, v: Vec3): Vec3;
        static multiplyMat4Vec3(m: Mat4, v: Vec3): Vec3;
        setNonParallel(v: Vec3): Vec3;
        static nonParallel(v: Vec3): Vec3;
        setOrthogonal(normal: Vec3): Vec3;
        static orthogonal(normal: Vec3): Vec3;
        setCross(va: Vec3, vb: Vec3): Vec3;
        static cross(va: Vec3, vb: Vec3): Vec3;
        setTurnXy(v: Vec3): Vec3;
        static turnXy(v: Vec3): Vec3;
        setUnturnXy(v: Vec3): Vec3;
        static unturnXy(v: Vec3): Vec3;
        setRotateXy(v: Vec3, r: Vec3): Vec3;
        static setRotateXy(v: Vec3, r: Vec3): Vec3;
        setRotateXyAngle(v: Vec3, angle: number): Vec3;
        static setRotateXyAngle(v: Vec3, angle: number): Vec3;
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
        setFractionTowards(position: Vec3, destination: Vec3, fraction: number): Vec3;
        static fractionTowards(position: Vec3, destination: Vec3, fraction: number): Vec3;
        setNormalProjection(normal: Vec3, v: Vec3): Vec3;
        static normalProjection(normal: Vec3, v: Vec3): Vec3;
        setPlaneProjection(planeOrigin: Vec3, planeNormal: Vec3, v: Vec3): Vec3;
        static planeProjection(planeOrigin: Vec3, planeNormal: Vec3, v: Vec3): Vec3;
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
        setPlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static planeProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        setRelativePlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static relativePlaneProjection2d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        setPlanePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;
        static planePosition3d(planeBasis: PlaneBasis, v: Vec3): Vec3;
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

export {};