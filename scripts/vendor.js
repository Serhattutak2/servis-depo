// Copies offline libraries, OCR language data and fonts into www/vendor.
// Everything the app needs ships inside the APK; nothing is loaded from the internet.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), nm = p => path.join(root, "node_modules", p), out = p => path.join(root, "www", "vendor", p);
function cp(src, dst) { fs.mkdirSync(path.dirname(out(dst)), { recursive: true }); fs.copyFileSync(nm(src), out(dst)); }
const esb = require("esbuild");
esb.buildSync({ entryPoints: [path.join(__dirname, "native-entry.js")], bundle: true, minify: true, format: "iife", target: ["chrome89"], outfile: out("native.js"), logLevel: "warning" });
esb.buildSync({ entryPoints: [path.join(__dirname, "fire-entry.js")], bundle: true, minify: true, format: "iife", target: ["chrome89"], outfile: out("fire.js"), logLevel: "warning" });
fs.writeFileSync(out("build.js"), `window.APP_BUILD=${JSON.stringify(process.env.GITHUB_RUN_NUMBER ? "1.0." + process.env.GITHUB_RUN_NUMBER : "geliştirme")};\n`);
cp("@zxing/library/umd/index.min.js", "zxing.min.js");
cp("jsqr/dist/jsQR.js", "jsQR.js");
cp("qrcode-generator/qrcode.js", "qrcode.js");
const fonts = [
  ["barlow-condensed", "Barlow Condensed", [600, 700]],
  ["barlow", "Barlow", [400, 500, 600, 700]],
  ["jetbrains-mono", "JetBrains Mono", [500, 700]],
];
let css = "";
for (const [pkg, fam, ws] of fonts) for (const w of ws) for (const sub of ["latin-ext", "latin"]) {
  const f = `${pkg}-${sub}-${w}-normal.woff2`;
  if (!fs.existsSync(nm(`@fontsource/${pkg}/files/${f}`))) continue;
  cp(`@fontsource/${pkg}/files/${f}`, "fonts/" + f);
  css += `@font-face{font-family:"${fam}";font-style:normal;font-weight:${w};font-display:swap;src:url(fonts/${f}) format("woff2")}\n`;
}
fs.writeFileSync(out("fonts.css"), css);
console.log("vendor ok");
