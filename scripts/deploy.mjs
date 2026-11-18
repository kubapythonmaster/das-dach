import { rmSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

process.env.BASE_PATH = "/das-dach/";
const build = spawnSync("npm", ["run", "build"], { stdio: "inherit", shell: true, env: process.env });
if (build.status !== 0) process.exit(build.status ?? 1);

if (existsSync("dist/server")) rmSync("dist/server", { recursive: true, force: true });

const publish = spawnSync("npx", ["--yes", "gh-pages", "-d", "dist", "-f"], {
  stdio: "inherit",
  shell: true,
});
process.exit(publish.status ?? 1);
