import {Vec3} from './vec3.js';
import {Rotor3} from './rotor3.js';
import {Mat4} from './mat4.js';
import {Temp} from './temp.js';

function checkSimilar(a, b) {
  if (Math.abs(a - b) >= 0.1) {
    debugger;
    throw `${a} != ${b}`;
  }
}

function checkEqualVec3s(va, vb) {
  checkSimilar(va.x, vb.x);
  checkSimilar(va.x, vb.x);
  checkSimilar(va.z, vb.z);
}

function checkEqualRotor3s(ra, rb) {
  checkSimilar(ra.rr, rb.rr);
  checkSimilar(ra.yz, rb.yz);
  checkSimilar(ra.zx, rb.zx);
  checkSimilar(ra.xy, rb.xy);
}

function checkEqualMat4s(ma, mb) {
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
    return 'Fail';
  }
  return 'Pass';
}

function main() {
  // TODO: Tests.
  runTests({
    Vec3: {
    },
    Rotor3: {
    },
    Mat4: {
    },
  });
}

main();