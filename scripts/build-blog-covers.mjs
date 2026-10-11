// Renders the blog cover illustrations (scripts/blog-art/<post-slug>.html) to 1600x1000 JPGs in
// public/Images/blog/<post-slug>.jpg using headless Chrome. Set a post's cover in the admin panel
// to /Images/blog/<post-slug>.jpg.
// Usage: node scripts/build-blog-covers.mjs [slug ...]
//   CHROME_PATH can point to Chrome/Edge if it isn't at the default Windows location.
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ART = resolve("scripts/blog-art");
const OUT = resolve("public/Images/blog");
const ALL = readdirSync(ART).filter((f) => f.endsWith(".html")).map((f) => f.replace(/\.html$/, ""));
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

mkdirSync(OUT, { recursive: true });

for (const slug of slugs) {
  const png = resolve(OUT, `${slug}.tmp.png`);
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--force-device-scale-factor=1",
      "--window-size=1600,1000",
      "--virtual-time-budget=3000",
      `--screenshot=${png}`,
      pathToFileURL(resolve(ART, `${slug}.html`)).href,
    ],
    { stdio: "ignore" }
  );
  await sharp(png).resize(1600, 1000).jpeg({ quality: 86, mozjpeg: true }).toFile(resolve(OUT, `${slug}.jpg`));
  rmSync(png);
  console.log(`public/Images/blog/${slug}.jpg`);
}
