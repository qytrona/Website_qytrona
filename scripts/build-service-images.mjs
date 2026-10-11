// Renders the "Our Services" illustrations (scripts/service-art/*.html) to 1200x1200 JPGs in
// public/Images/services/<name>-sq.jpg using headless Chrome, at the panel's exact square size.
// (New file names when the artwork changes shape/content avoid stale image caches.)
// Usage: node scripts/build-service-images.mjs [name ...]
//   CHROME_PATH can point to Chrome/Edge if it isn't at the default Windows location.
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ART = resolve("scripts/service-art");
const OUT = resolve("public/Images/services");
const ALL = ["website-development", "digital-marketing", "seo", "mobile-applications", "custom-software"];
const names = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

mkdirSync(OUT, { recursive: true });

for (const name of names) {
  const png = resolve(OUT, `${name}.tmp.png`);
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      "--window-size=1200,1200",
      "--virtual-time-budget=3000",
      `--screenshot=${png}`,
      pathToFileURL(resolve(ART, `${name}.html`)).href,
    ],
    { stdio: "ignore" }
  );

  await sharp(png).resize(1200, 1200).jpeg({ quality: 88, mozjpeg: true }).toFile(resolve(OUT, `${name}-sq.jpg`));
  rmSync(png);
  console.log(`public/Images/services/${name}-sq.jpg`);
}
