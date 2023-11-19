// Matrix shape:
// aa ab ac ad
// ba bb bc bd
// ca cb cc cd
// da db dc dd
export class Mat4 {
  constructor() {
    this.setIdentity();
  }

  setIdentity() {
    this.aa = 1; this.ab = 0; this.ac = 0; this.ad = 0;
    this.ba = 0; this.bb = 1; this.bc = 0; this.bd = 0;
    this.ca = 0; this.cb = 0; this.cc = 1; this.cd = 0;
    this.da = 0; this.db = 0; this.dc = 0; this.dd = 1;
    return this;
  }

  setComponents(aa, ab, ac, ad, ba, bb, bc, bd, ca, cb, cc, cd, da, db, dc, dd) {
    this.aa = aa; this.ab = ab; this.ac = ac; this.ad = ad;
    this.ba = ba; this.bb = bb; this.bc = bc; this.bd = bd;
    this.ca = ca; this.cb = cb; this.cc = cc; this.cd = cd;
    this.da = da; this.db = db; this.dc = dc; this.dd = dd;
    return this;
  }

  set(m) {
    this.aa = m.aa; this.ab = m.ab; this.ac = m.ac; this.ad = m.ad;
    this.ba = m.ba; this.bb = m.bb; this.bc = m.bc; this.bd = m.bd;
    this.ca = m.ca; this.cb = m.cb; this.cc = m.cc; this.cd = m.cd;
    this.da = m.da; this.db = m.db; this.dd = m.dd; this.dd = m.dd;
    return this;
  }

  setMultiply(ma, mb) {
    return this.setComponents(
      /*aa*/ ma.aa * mb.aa + ma.ab * mb.ba + ma.ac * mb.ca + ma.ad * mb.da,
      /*ab*/ ma.aa * mb.ab + ma.ab * mb.bb + ma.ac * mb.cb + ma.ad * mb.db,
      /*ac*/ ma.aa * mb.ac + ma.ab * mb.bc + ma.ac * mb.cc + ma.ad * mb.dc,
      /*ad*/ ma.aa * mb.ad + ma.ab * mb.bd + ma.ac * mb.cd + ma.ad * mb.dd,

      /*ba*/ ma.ba * mb.aa + ma.bb * mb.ba + ma.bc * mb.ca + ma.bd * mb.da,
      /*bb*/ ma.ba * mb.ab + ma.bb * mb.bb + ma.bc * mb.cb + ma.bd * mb.db,
      /*bc*/ ma.ba * mb.ac + ma.bb * mb.bc + ma.bc * mb.cc + ma.bd * mb.dc,
      /*bd*/ ma.ba * mb.ad + ma.bb * mb.bd + ma.bc * mb.cd + ma.bd * mb.dd,

      /*ca*/ ma.ca * mb.aa + ma.cb * mb.ba + ma.cc * mb.ca + ma.cd * mb.da,
      /*cb*/ ma.ca * mb.ab + ma.cb * mb.bb + ma.cc * mb.cb + ma.cd * mb.db,
      /*cc*/ ma.ca * mb.ac + ma.cb * mb.bc + ma.cc * mb.cc + ma.cd * mb.dc,
      /*cd*/ ma.ca * mb.ad + ma.cb * mb.bd + ma.cc * mb.cd + ma.cd * mb.dd,

      /*da*/ ma.da * mb.aa + ma.db * mb.ba + ma.dc * mb.ca + ma.dd * mb.da,
      /*db*/ ma.da * mb.ab + ma.db * mb.bb + ma.dc * mb.cb + ma.dd * mb.db,
      /*dc*/ ma.da * mb.ac + ma.db * mb.bc + ma.dc * mb.cc + ma.dd * mb.dc,
      /*dd*/ ma.da * mb.ad + ma.db * mb.bd + ma.dc * mb.cd + ma.dd * mb.dd,
    );
  }

  setTranslateXyz(x, y, z) {
    return this.setComponents(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1,
    );
  }

  setTranslateVec3(v) {
    return this.setTranslateXyz(v.x, v.y, v.z);
  }

  setScale(k) {
    return this.setComponents(
      k, 0, 0, 0,
      0, k, 0, 0,
      0, 0, k, 0,
      0, 0, 0, 1,
    );
  }

  setRotateRotor(r) {
    const {rr: a, yz: b, zx: c, xy: d} = r;
    // (arr - byz - czx - dxy) * (ex + fy + gz) * (arr + byz + czx + dxy)
    //
    // = (arr - byz - czx - dxy) * (
    //     eaxrr + ebxyz + ecxzx + edxxy +
    //     fayrr + fbyyz + fcyzx + fdyxy +
    //     gazrr + gbzyz + gczzx + gdzxy +
    //   )
    //
    // = (arr - byz - czx - dxy) * (
    //     eax + ebxyz + -ecz + edy +
    //     fay + fbz + fcxyz + -fdx +
    //     gaz + -gby + gcx + gdxyz +
    //   )
    //
    // = (arr - byz - czx - dxy) * (
    //     (ea + -fd + gc)x +
    //     (ed + fa + -gb)y +
    //     (-ec + fb + ga)z +
    //     (eb + fc + gd)xyz +
    //   )
    //
    // = a(ea + -fd + gc)x +
    //   a(ed + fa + -gb)y +
    //   a(-ec + fb + ga)z +
    //   a(eb + fc + gd)xyz +
    //   -b(ea + -fd + gc)yzx +
    //   -b(ed + fa + -gb)yzy +
    //   -b(-ec + fb + ga)yzz +
    //   -b(eb + fc + gd)yzxyz +
    //   -c(ea + -fd + gc)zxx +
    //   -c(ed + fa + -gb)zxy +
    //   -c(-ec + fb + ga)zxz +
    //   -c(eb + fc + gd)zxxyz +
    //   -d(ea + -fd + gc)xyx +
    //   -d(ed + fa + -gb)xyy +
    //   -d(-ec + fb + ga)xyz +
    //   -d(eb + fc + gd)xyxyz +
    //
    // = a(ea + -fd + gc)x +
    //   a(ed + fa + -gb)y +
    //   a(-ec + fb + ga)z +
    //   a(eb + fc + gd)xyz +
    //   -b(ea + -fd + gc)xyz +
    //   b(ed + fa + -gb)z +
    //   -b(-ec + fb + ga)y +
    //   b(eb + fc + gd)x +
    //   -c(ea + -fd + gc)z +
    //   -c(ed + fa + -gb)xyz +
    //   c(-ec + fb + ga)x +
    //   c(eb + fc + gd)y +
    //   d(ea + -fd + gc)y +
    //   -d(ed + fa + -gb)x +
    //   -d(-ec + fb + ga)xyz +
    //   d(eb + fc + gd)z +
    //
    // = (
    //     a(ea + -fd + gc) +
    //     b(eb + fc + gd) +
    //     c(-ec + fb + ga) +
    //     -d(ed + fa + -gb) +
    //   )x +
    //   (
    //     a(ed + fa + -gb) +
    //     -b(-ec + fb + ga) +
    //     c(eb + fc + gd) +
    //     d(ea + -fd + gc) +
    //   )y +
    //   (
    //     a(-ec + fb + ga) +
    //     b(ed + fa + -gb) +
    //     -c(ea + -fd + gc) +
    //     d(eb + fc + gd) +
    //   )z +
    //   (
    //     a(eb + fc + gd) +
    //     -b(ea + -fd + gc) +
    //     -c(ed + fa + -gb) +
    //     -d(-ec + fb + ga) +
    //   )xyz +
    //
    // = (
    //     aea + -afd + agc +
    //     beb + bfc + bgd +
    //     -cec + cfb + cga +
    //     -ded + -dfa + dgb +
    //   )x +
    //   (
    //     aed + afa + -agb +
    //     bec + -bfb + -bga +
    //     ceb + cfc + cgd +
    //     dea + -dfd + dgc +
    //   )y +
    //   (
    //     -aec + afb + aga +
    //     bed + bfa + -bgb +
    //     -cea + cfd + -cgc +
    //     deb + dfc + dgd +
    //   )z +
    //   (
    //     aeb + afc + agd +
    //     -bea + bfd + -bgc +
    //     -ced + -cfa + cgb +
    //     dec + -dfb + -dga +
    //   )xyz +
    //
    // = (
    //     (-cc + -dd + aa + bb)e +
    //     (-ad + -da + bc + cb)f +
    //     (ac + bd + ca + db)g +
    //   )x +
    //   (
    //     (ad + bc + cb + da)e +
    //     (-bb + -dd + aa + cc)f +
    //     (-ab + -ba + cd + dc)g +
    //   )y +
    //   (
    //     (-ac + -ca + bd + db)e +
    //     (ab + ba + cd + dc)f +
    //     (-bb + -cc + aa + dd)g +
    //   )z +
    //   (
    //     (-ba + -cd + ab + dc)e +
    //     (-ca + -db + ac + bd)f +
    //     (-bc + -da + ad + cb)g +
    //   )xyz +
    return this.setComponents(
      -c * c + -d * d + a * a + b * b,
      -a * d + -d * a + b * c + c * b,
      a * c + b * d + c * a + d * b,
      0,

      a * d + b * c + c * b + d * a,
      -b * b + -d * d + a * a + c * c,
      -a * b + -b * a + c * d + d * c,
      0,

      -a * c + -c * a + b * d + d * b,
      a * b + b * a + c * d + d * c,
      -b * b + -c * c + a * a + d * d,
      0,

      0, 0, 0, 1,
    );
  }

  inplaceMultiplyLeft(m) { return this.setMultiply(m, this); }
  inplaceMultiplyRight(m) { return this.setMultiply(this, m); }

  exportToArrayBuffer(float32ArrayBuffer) {
    float32ArrayBuffer[0] = this.aa;
    float32ArrayBuffer[1] = this.ba;
    float32ArrayBuffer[2] = this.ca;
    float32ArrayBuffer[3] = this.da;

    float32ArrayBuffer[4] = this.ab;
    float32ArrayBuffer[5] = this.bb;
    float32ArrayBuffer[6] = this.cb;
    float32ArrayBuffer[7] = this.db;

    float32ArrayBuffer[8] = this.ac;
    float32ArrayBuffer[9] = this.bc;
    float32ArrayBuffer[10] = this.cc;
    float32ArrayBuffer[11] = this.dc;

    float32ArrayBuffer[12] = this.ad;
    float32ArrayBuffer[13] = this.bd;
    float32ArrayBuffer[14] = this.cd;
    float32ArrayBuffer[15] = this.dd;
  }
}
