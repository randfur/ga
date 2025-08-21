import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

const tempStorage = Temp.registerStorage(() => new PlaneBasis());

export class PlaneBasis {
  static temp(position, normal) {
    return tempStorage.acquire().set(position, normal);
  }

  constructor(position, normal) {
    this.position = new Vec3();
    this.normal = new Vec3();
    this.xDirection = new Vec3();
    this.yDirection = new Vec3();
    this.set(position, normal);
  }

  // TODO: Test.
  static #origin = new Vec3();
  set(position, normal) {
    this.position.set(position);
    this.normal.setNormalise(normal);
    this.xDirection
      .setNonParallel(this.normal)
      .inplaceRelativePlaneProjection(PlaneBasis.#origin, this.normal)
      .inplaceNormalise();
    this.yDirection.setCross(this.normal, this.xDirection);
    return this;
  }
}
