import { Mat4 } from "../mat4.js";
import { Rotor3 } from "../rotor3.js";
import { Vec3 } from "../vec3.js";

declare global {
    /**
     * Matrix shape:
     * aa ab ac ad
     * ba bb bc bd
     * ca cb cc cd
     * da db dc dd
     */
    class Mat4Type {
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

          // Uses of this must include a call to Temp.reclaimAll().
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
}

export {};