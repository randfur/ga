import {Temp} from './temp.js';
import {Vec3} from './vec3.js';

export class PlaneBasis {

  /**
   * @param {Vec3} origin
   * @param {Vec3} normal
   * @param {Vec3|null} guideXDirection
   * @returns PlaneBasis
   */
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

  /**
   * @param {Vec3} origin
   * @param {Vec3} normal
   * @param {Vec3|null} guideXDirection
   * @returns PlaneBasis
   */
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

  /**
   * @param {Vec3} origin
   * @param {Vec3} normal
   * @param {Vec3|null} guideXDirection
   * @returns PlaneBasis
   */
  static set(origin, normal, guideXDirection=null) {
    return this.singleton.set(origin, normal, guideXDirection);
  }

  // See "plane" methods on Vec3 for related operations involving PlaneBasis.
}

const tempStorage = Temp.registerStorage(() => new PlaneBasis());