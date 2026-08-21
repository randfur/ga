import { Rotor3 } from '../rotor3.js';
import { Vec3 } from '../vec3.js';

declare global {
    class Rotor3Type {
        rr: number;

        yz: number;

        zx: number;

        xy: number;

        // Uses of this must include a call to Temp.reclaimAll().
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

        // va and vb must be orthogonal, they define which plane to turn around in.
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
}

export {};