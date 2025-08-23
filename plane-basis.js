import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

const tempStorage = Temp.registerStorage(() => new PlaneBasis());

export class PlaneBasis {
  static temp(origin, normal) {
    return tempStorage.acquire().set(origin, normal);
  }

  constructor() {
    this.origin = new Vec3();
    this.normal = new Vec3();
    this.xDirection = new Vec3();
    this.yDirection = new Vec3();
  }

  // TODO: Test.
  static #origin = new Vec3();
  set(origin, normal) {
    this.origin.set(origin);
    this.normal.setNormalise(normal);
    this.xDirection
      .setNonParallel(this.normal)
      .inplaceRelativePlaneProjection(PlaneBasis.#origin, this.normal)
      .inplaceNormalise();
    this.yDirection.setCross(this.normal, this.xDirection);
    return this;
  }
}
