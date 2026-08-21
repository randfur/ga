import { PlaneBasis } from "../plane-basis.js";
import { Vec3 } from "../vec3.js";

declare global {
    class PlaneBasisType {
        origin: Vec3;

        normal: Vec3;

        xDirection: Vec3;

        yDirection: Vec3;

        static singleton: PlaneBasis;

        // Uses of this must include a call to Temp.reclaimAll().
        static temp(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;

        constructor();

        // TODO: Test.
        set(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;

        static set(origin: Vec3, normal: Vec3, guideXDirection?: Vec3 | null): PlaneBasis;
    }
}

export {};