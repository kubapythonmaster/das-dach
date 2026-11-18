import sharp from "sharp";
import { readdirSync, renameSync, unlinkSync, existsSync } from "node:fs";
import path from "node:path";

const dir = "public/photos";
const files = readdirSync(dir).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.includes("-m.") && !f.endsWith(".webp"),
);

function replace(tmp, dest) {
  if (existsSync(dest)) unlinkSync(dest);
  renameSync(tmp, dest);
}

for (const file of files) {
  const base = file.replace(/\.(jpe?g|png)$/i, "");
  const src = path.join(dir, file);
  const fullJpg = path.join(dir, `${base}.jpg`);
  const midJpg = path.join(dir, `${base}-m.jpg`);
  const fullWebp = path.join(dir, `${base}.webp`);
  const midWebp = path.join(dir, `${base}-m.webp`);
  const tmpFull = path.join(dir, `${base}.full.tmp.jpg`);
  const tmpMid = path.join(dir, `${base}.mid.tmp.jpg`);

  const meta = await sharp(src).rotate().metadata();
  const buffer = await sharp(src).rotate().toBuffer();

  await sharp(buffer)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(tmpFull);
  replace(tmpFull, fullJpg);

  await sharp(buffer)
    .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(tmpMid);
  replace(tmpMid, midJpg);

  await sharp(buffer)
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(fullWebp);

  await sharp(buffer)
    .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(midWebp);

  const out = await sharp(fullJpg).metadata();
  console.log(base, `${meta.width}x${meta.height}`, "->", `${out.width}x${out.height}`);
}
