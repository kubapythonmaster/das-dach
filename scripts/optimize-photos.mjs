import sharp from "sharp";
import { readdirSync, renameSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";

const dir = "public/photos";
const files = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.includes("-m."));

function replace(tmp, dest) {
  if (existsSync(dest)) unlinkSync(dest);
  renameSync(tmp, dest);
}

for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const src = path.join(dir, file);
  const midJpg = path.join(dir, `${base}-m.jpg`);
  const midWebp = path.join(dir, `${base}-m.webp`);
  const tmpJpg = path.join(dir, `${base}.tmp.jpg`);
  const tmpWebp = path.join(dir, `${base}.tmp.webp`);

  const buffer = await sharp(src).rotate().toBuffer();
  const meta = await sharp(buffer).metadata();

  await sharp(buffer)
    .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 68, mozjpeg: true })
    .toFile(tmpJpg);
  replace(tmpJpg, midJpg);

  await sharp(buffer)
    .resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 62 })
    .toFile(tmpWebp);
  replace(tmpWebp, midWebp);

  // keep only mid variants in public
  if (existsSync(src) && !src.endsWith("-m.jpg")) {
    // source may be original name without -m; remove full-size outputs if any
  }
  for (const extra of [`${base}.jpg`, `${base}.webp`]) {
    const p = path.join(dir, extra);
    if (existsSync(p) && p !== midJpg) unlinkSync(p);
  }

  console.log(base, `${meta.width}x${meta.height}`, "-> mid 720");
}
