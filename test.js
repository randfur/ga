import {Vec3} from './vec3.js';
import {Rotor3} from './rotor3.js';
import {Mat4} from './mat4.js';
import {Temp} from './temp.js';

const TAU = Math.PI * 2;

function checkSimilar(a, b) {
  if (Math.abs(a - b) >= 0.001) {
    debugger;
    throw `${a} != ${b}`;
  }
}

function checkSimilarVec3s(va, vb) {
  checkSimilar(va.x, vb.x);
  checkSimilar(va.x, vb.x);
  checkSimilar(va.z, vb.z);
}

function checkSimilarRotor3s(ra, rb) {
  checkSimilar(ra.rr, rb.rr);
  checkSimilar(ra.yz, rb.yz);
  checkSimilar(ra.zx, rb.zx);
  checkSimilar(ra.xy, rb.xy);
}

function checkSimilarMat4s(ma, mb) {
  checkSimilar(ma.aa, mb.aa);
  checkSimilar(ma.ab, mb.ab);
  checkSimilar(ma.ac, mb.ac);
  checkSimilar(ma.ad, mb.ad);
  checkSimilar(ma.ba, mb.ba);
  checkSimilar(ma.bb, mb.bb);
  checkSimilar(ma.bc, mb.bc);
  checkSimilar(ma.bd, mb.bd);
  checkSimilar(ma.ca, mb.ca);
  checkSimilar(ma.cb, mb.cb);
  checkSimilar(ma.cc, mb.cc);
  checkSimilar(ma.cd, mb.cd);
  checkSimilar(ma.da, mb.da);
  checkSimilar(ma.db, mb.db);
  checkSimilar(ma.dc, mb.dc);
  checkSimilar(ma.dd, mb.dd);
}

function runTests(testSuites) {
  for (const [testSuiteName, testSuite] of Object.entries(testSuites)) {
    output.textContent += `${testSuiteName}: \n`;
    for (const [testName, test] of Object.entries(testSuite)) {
      output.textContent += `- ${testName}: ${runTest(test)}\n`;
    }
    output.textContent += '\n';
  }
}

function runTest(test) {
  try {
    test();
  } catch (error) {
    if (typeof error === 'string') {
      return error;
    }
    throw error;
  }
  return 'Pass';
}

function main() {
  // TODO: Tests.
  runTests({
    Vec3: {
      length() {
        checkSimilar(
          Math.sqrt(14),
          new Vec3(1, 2, 3).length(),
        );
      },
      dot() {
        checkSimilar(
          new Vec3(1, 2, 3).dot(new Vec3(4, 5, 6)),
          4 + 10 + 18,
        );
      },
      set() {
        checkSimilarVec3s(
          new Vec3(-1, -2, -3).set(new Vec3(1, 2, 3)),
          new Vec3(1, 2, 3),
        );
      },
      setXyz() {
        checkSimilarVec3s(
          new Vec3(-1, -2, -3).setXyz(1, 2, 3),
          new Vec3(1, 2, 3),
        );
      },
      scale() {
        checkSimilarVec3s(
          new Vec3(-1, -2, -3).inplaceScale(-1),
          new Vec3(1, 2, 3),
        );
      },
      add() {
        checkSimilarVec3s(
          new Vec3(-1, -2, -3).inplaceAdd(new Vec3(2, 4, 6)),
          new Vec3(1, 2, 3),
        );
      },
      scaleAdd() {
        checkSimilarVec3s(
          new Vec3(-1, -2, -3).inplaceScaleAdd(2, new Vec3(1, 2, 3)),
          new Vec3(1, 2, 3),
        );
      },
      sum() {
        checkSimilarVec3s(
          new Vec3(2, 4, 0).inplaceSum(0.5, -1, new Vec3(0, 0, -3)),
          new Vec3(1, 2, 3),
        );
      },
      delta() {
        checkSimilarVec3s(
          new Vec3(2, 4, 6).inplaceDelta(new Vec3(3, 6, 9)),
          new Vec3(1, 2, 3),
        );
      },
      normalise() {
        checkSimilarVec3s(
          new Vec3(0, 0, 0).inplaceNormalise(),
          new Vec3(0, 0, 0),
        );
        checkSimilarVec3s(
          new Vec3(3, 4, 5).inplaceNormalise(),
          new Vec3(3 / 7.07, 4 / 7.07, 5 / 7.07),
        );
      },
      rotateRotor() {
        checkSimilarVec3s(
          new Vec3(1, 2, 3)
            .inplaceRotateRotor(
              new Rotor3().setAxisAngle(new Vec3(1, 0, 0), TAU / 4)
            ),
          new Vec3(1, -3, 2),
        );
        checkSimilarVec3s(
          new Vec3(1, 2, 3)
            .inplaceRotateRotor(
              new Rotor3().setAxisAngle(new Vec3(0, 1, 0), TAU / 4)
            ),
          new Vec3(3, 2, -1),
        );
        checkSimilarVec3s(
          new Vec3(1, 2, 3)
            .inplaceRotateRotor(
              new Rotor3().setAxisAngle(new Vec3(0, 0, 1), TAU / 4)
            ),
          new Vec3(-2, 1, 3),
        );
      },
      multiplyMat4() {
        checkSimilarVec3s(
          new Vec3(1, 2, 3)
            .inplaceMultiplyMat4Left(
              new Mat4().setComponents(
                1, 1, 1, 1,
                2, 2, 2, 2,
                3, 3, 3, 3,
                4, 4, 4, 4,
              )
            ),
          new Vec3(7, 16, 21),
        );
      },
    },
    Rotor3: {
      // TODO: Multiply.
    },
    Mat4: {
      multiply() {
        checkSimilarMat4s(
          new Mat4().setComponents(
            1, 2, 3, 4,
            5, 6, 7, 8,
            9, 10, 11, 12,
            13, 14, 15, 16,
          ).inplaceMultiplyRight(
            new Mat4().setComponents(
              17, 18, 19, 20,
              21, 22, 23, 24,
              25, 26, 27, 28,
              29, 30, 31, 32,
            )
          ),
          new Mat4().setComponents(
            250, 260, 270, 280,
            618, 644, 670, 696,
            986, 1028, 1070, 1112,
            1354, 1412, 1470, 1528,
          ),
        );
        checkSimilarMat4s(
          new Mat4().setComponents(
            17, 18, 19, 20,
            21, 22, 23, 24,
            25, 26, 27, 28,
            29, 30, 31, 32,
          ).inplaceMultiplyLeft(
            new Mat4().setComponents(
              1, 2, 3, 4,
              5, 6, 7, 8,
              9, 10, 11, 12,
              13, 14, 15, 16,
            )
          ),
          new Mat4().setComponents(
            250, 260, 270, 280,
            618, 644, 670, 696,
            986, 1028, 1070, 1112,
            1354, 1412, 1470, 1528,
          ),
        );
      }
    },
  });
}

main();