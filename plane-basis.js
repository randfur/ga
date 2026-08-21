/// ts-check

import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

/** @type {PlaneBasisType} */
export class PlaneBasis {

  /** @type {(typeof PlaneBasisType)['temp']} */
  static temp(origin, normal, guideXDirection=null) {
    return tempStorage.acquire().set(origin, normal, guideXDirection);
  }

  static singleton = new PlaneBasis();

  constructor() {
    this.origin = new Vec3();
    this.normal = new Vec3();
    this.xDirection = new Vec3();
    this.yDirection = new Vec3();
  }


  /** @type {PlaneBasisType['set']} */
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

  /** @type {(typeof PlaneBasisType)['set']} */
  static set(origin, normal, guideXDirection=null) {
    return this.singleton.set(origin, normal, guideXDirection);
  }

  // See "plane" methods on Vec3 for related operations involving PlaneBasis.
}

const tempStorage = Temp.registerStorage(() => new PlaneBasis());