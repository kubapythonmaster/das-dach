import sharp from "sharp";
import { readdirSync } from "node:fs";
import path from "node:path";

const assets = "C:\\Users\\admin\\.cursor\\projects\\c-Users-admin-Desktop-boxpvp\\assets";
const out = "public/photos";

const entries = {
  "dom-gotowy": "image-d9ebfe1b-66e5-4ba1-a3cc-ae37f519c149.jpg",
  "dach-blachodachowka": "image-e0b49b67-9578-43ed-9e2b-65d868adb17e.jpg",
  "komin-rabek": "image-40fab587-23d9-42d3-a16c-1f4e7892ea15.png",
  "rabek-panel": "image-de1a8124-34b5-42f8-bf10-45f7a1b90b86.jpg",
  "dach-kominy": "image-45b56ba6-022b-4288-81f6-61c519ff1325.png",
  "taras-drewno": "image-57fe0822-120e-421a-b939-1fb799c305a0.jpg",
  "komin-cegla": "image-4288dfb9-969a-4b7a-b31f-0823943995cd.jpg",
  "dach-narzedzia": "image-44f3be7a-9b9e-454c-b8a8-9273d762b140.jpg",
  "rabek-pole": "image-7c175f46-7235-4829-87aa-d9f98e273699.jpg",
};

function find(srcName) {
  const hit = readdirSync(assets).find((n) => n.includes(srcName));
  return hit ? path.join(assets, hit) : null;
}

for (const [base, srcName] of Object.entries(entries)) {
  const src = find(srcName);
  if (!src) {
    console.log("MISS", base, srcName);
    continue;
  }
  const meta = await sharp(src).rotate().metadata();
  const full = path.join(out, `${base}.jpg`);
  const mid = path.join(out, `${base}-m.jpg`);
  await sharp(src)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 95, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(full);
  await sharp(src)
    .rotate()
    .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(mid);
  const m2 = await sharp(full).metadata();
  console.log(base, `${meta.width}x${meta.height}`, "->", `${m2.width}x${m2.height}`);
}
