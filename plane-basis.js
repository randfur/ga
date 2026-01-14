import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

const tempStorage = Temp.registerStorage(() => new PlaneBasis());

export class PlaneBasis {
  static temp(origin, normal, guideXDirection=null) {
    return tempStorage.acquire().set(origin, normal, guideXDirection);
  }

  constructor() {
    this.origin = new Vec3();
    this.normal = new Vec3();
    this.xDirection = new Vec3();
    this.yDirection = new Vec3();
  }

  // TODO: Test.
  set(origin, normal, guideXDirection=null) {
    this.origin.set(origin);
    this.normal.setNormalise(normal);
    if (guideXDirection === null) {
      this.xDirection.setOrthogonal(this.normal);
    } else {
      this.xDirection.setNormalProjection(this.normal, guideXDirection).inplaceNormalise();
    }
    this.yDirection.setCross(this.normal, this.xDirection);
    return this;
  }

  // See "plane" methods on Vec3 for related operations involving PlaneBasis.
}
