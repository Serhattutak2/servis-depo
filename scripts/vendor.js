// Copies offline libraries, OCR language data and fonts into www/vendor.
// Everything the app needs ships inside the APK; nothing is loaded from the internet.
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, ".."), nm = p => path.join(root, "node_modules", p), out = p => path.join(root, "www", "vendor", p);
function cp(src, dst) { fs.mkdirSync(path.dirname(out(dst)), { recursive: true }); fs.copyFileSync(nm(src), out(dst)); }
require("esbuild").buildSync({ entryPoints: [path.join(__dirname, "native-entry.js")], bundle: true, minify: true, format: "iife", target: ["chrome89"], outfile: out("native.js"), logLevel: "warning" });
fs.writeFileSync(out("build.js"), `window.APP_BUILD=${JSON.stringify(process.env.GITHUB_RUN_NUMBER ? "1.0." + process.env.GITHUB_RUN_NUMBER : "geliştirme")};\n`);
cp("@zxing/library/umd/index.min.js", "zxing.min.js");
cp("jsqr/dist/jsQR.js", "jsQR.js");
cp("qrcode-generator/qrcode.js", "qrcode.js");
cp("tesseract.js/dist/tesseract.min.js", "tesseract/tesseract.min.js");
cp("tesseract.js/dist/worker.min.js", "tesseract/worker.min.js");
for (const f of ["tesseract-core-lstm.wasm.js", "tesseract-core-simd-lstm.wasm.js", "tesseract-core-relaxedsimd-lstm.wasm.js"])
  if (fs.existsSync(nm("tesseract.js-core/" + f))) cp("tesseract.js-core/" + f, "tesseract/" + f);
// Android packaging unzips .gz assets and drops the suffix, so ship the plain file and load it with gzip:false.
fs.mkdirSync(out("tesseract/lang"), { recursive: true });
fs.writeFileSync(out("tesseract/lang/tur.traineddata"), require("zlib").gunzipSync(fs.readFileSync(nm("@tesseract.js-data/tur/4.0.0_best_int/tur.traineddata.gz"))));
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
