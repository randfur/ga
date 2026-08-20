import { Rotor3 } from './rotor3.js';
import { Mat4 } from './mat4.js';
import { Vec3 } from './vec3.js';
import { PlaneBasis } from './plane-basis.js';

export { }

declare global {
    export class Mat4Type {
        aa: number;
        ab: number;
        ac: number;
        ad: number;
        ba: number;
        bb: number;
        bc: number;
        bd: number;
        ca: number;
        cb: number;
        cc: number;
        cd: number;
        da: number;
        db: number;
        dc: number;
        dd: number;
        static singleton: Mat4;
        static a: Mat4;
        static b: Mat4;
        static c: Mat4;
        static d: Mat4;
        constructor();
        static temp(): Mat4;
        static identity(): Mat4;
        static components(
            aa: number, ab: number, ac: number, ad: number,
            ba: number, bb: number, bc: number, bd: number,
            ca: number, cb: number, cc: number, cd: number,
            da: number, db: number, dc: number, dd: number
        ): Mat4;
        static set(m: Mat4): Mat4;
        static multiply(ma: Mat4, mb: Mat4): Mat4;
        static translateXyz(x: number, y: number, z: number): Mat4;
        static translateVec3(v: Vec3): Mat4;
        static scale(k: number): Mat4;
        static rotateRotor3(r: Rotor3): Mat4;
        static rotateXy(angle: number): Mat4;
        static rotateYz(angle: number): Mat4;
        static rotateZx(angle: number): Mat4;
        setIdentity(): Mat4;
        setComponents(
            aa: number, ab: number, ac: number, ad: number,
            ba: number, bb: number, bc: number, bd: number,
            ca: number, cb: number, cc: number, cd: number,
            da: number, db: number, dc: number, dd: number
        ): Mat4;
        set(m: Mat4): Mat4;
        setMultiply(ma: Mat4, mb: Mat4): Mat4;
        setTranslateXyz(x: number, y: number, z: number): Mat4;
        setTranslateVec3(v: Vec3): Mat4;
        setScale(k: number): Mat4;
        setRotateRotor3(r: Rotor3): Mat4;
        setRotateXy(angle: number): Mat4;
        setRotateYz(angle: number): Mat4;
        setRotateZx(angle: number): Mat4;
        inplaceMultiplyLeft(m: Mat4): Mat4;
        inplaceMultiplyRight(m: Mat4): Mat4;
        exportToArrayBuffer(float32ArrayBuffer: Float32Array): void;
    }

    export class PlaneBasisType {
        origin: Vec3;
        normal: Vec3;
        xDirection: Vec3;
        yDirection: Vec3;
        static singleton: PlaneBasis;
        static temp(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;
        constructor();
        set(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;
        static set(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;
    }

    export class Rotor3Type {
        rr: number;
        yz: number;
        zx: number;
        xy: number;
        static temp(): Rotor3;
        static singleton: Rotor3;
        static a: Rotor3;
        static b: Rotor3;
        static c: Rotor3;
        static d: Rotor3;
        constructor(rr?: number, yz?: number, zx?: number, xy?: number);
        squareLength(): number;
        length(): number;
        clone(): Rotor3;
        setIdentity(): Rotor3;
        static identity(): Rotor3;
        setComponents(rr: number, yz: number, zx: number, xy: number): Rotor3;
        static components(rr: number, yz: number, zx: number, xy: number): Rotor3;
        set(r: Rotor3): Rotor3;
        static set(r: Rotor3): Rotor3;
        setAxisAngle(axis: Vec3, angle: number): Rotor3;
        static axisAngle(axis: Vec3, angle: number): Rotor3;
        setVec3ToVec3(va: Vec3, vb: Vec3, reduceRatio?: number): Rotor3;
        static vec3ToVec3(va: Vec3, vb: Vec3, reduceRatio?: number): Rotor3;
        setTurnAround(va: Vec3, vb: Vec3): Rotor3;
        static turnAround(va: Vec3, vb: Vec3): Rotor3;
        setConjugate(r: Rotor3): Rotor3;
        static conjugate(r: Rotor3): Rotor3;
        setNormalise(r: Rotor3): Rotor3;
        static normalise(r: Rotor3): Rotor3;
        setMultiply(ra: Rotor3, rb: Rotor3): Rotor3;
        static multiply(ra: Rotor3, rb: Rotor3): Rotor3;
        setReduce(r: Rotor3, ratio: number): Rotor3;
        static reduce(r: Rotor3, ratio: number): Rotor3;
        setTurnTo(
            vPosition: Vec3,
            vBaseForward: Vec3,
            rOrientation: Rotor3,
            vTarget: Vec3,
            reduceRatio?: number
        ): Rotor3;
        static turnTo(
            vPosition: Vec3,
            vBaseForward: Vec3,
            rOrientation: Rotor3,
            vTarget: Vec3,
            reduceRatio?: number
        ): Rotor3;
        setLerp(ra: Rotor3, rb: Rotor3, t: number): Rotor3;
        lerp(ra: Rotor3, rb: Rotor3, t: number): Rotor3;
        inplaceConjugate(): Rotor3;
        inplaceNormalise(): Rotor3;
        inplaceMultiplyLeft(r: Rotor3): Rotor3;
        inplaceMultiplyRight(r: Rotor3): Rotor3;
        inplaceReduce(ratio: number): Rotor3;
        inplaceTurnTo(
            vPosition: Vec3,
            vBaseForward: Vec3,
            vTarget: Vec3,
            reduceRatio?: number
        ): Rotor3;
        inplaceLerp(r: Rotor3, t: number): Rotor3;
    }

    export class TempStorageType<T> {
        createNew: () => T;
        buffer: T[];
        index: number;
        constructor(createNew: () => T);
        acquire(): T;
    }

    export class TempType {
        static storageList: TempStorageType<any>[];
        static reclaimAll(): void;
    }

    export class Vec3Type {
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
