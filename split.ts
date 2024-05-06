import { project } from "./config.ts";

const filepath = "./data.json";
const distpath = `./${project}/pages/`;

// ディレクトリが存在しない場合は作成する
try {
  await Deno.stat(distpath);
} catch (error) {
  if (error instanceof Deno.errors.NotFound) {
    await Deno.mkdir(distpath, { recursive: true });
  } else {
    throw error;
  }
}

const text = Deno.readTextFileSync(filepath);
const content = JSON.parse(text);

for (const page of content["pages"]) {
  Deno.writeTextFile(
    distpath + page.id + ".json",
    JSON.stringify(page, null, 2),
  );
}
