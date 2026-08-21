import { PlaneBasis } from "../plane-basis.js";
import { Vec3 } from "../vec3.js";

declare global {
    class PlaneBasisType {
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
}

export {};