import test from "ava";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { EPub, EpubOptions } from "../src/index.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function runTestOn(input: string): Promise<boolean> {
  const params = JSON.parse(readFileSync(resolve(__dirname, `./${input}.json`), { encoding: "utf8" })) as EpubOptions;
  const output = resolve(__dirname, `./${input}.epub`);

  const epub = new EPub(params, output);
  const op = await epub.render();
  return op.result === "ok";
}

test.serial("Ebook > generate v2", async (t) => {
  t.is(await runTestOn("book-v2"), true);
});

test.serial("Ebook > generate v3", async (t) => {
  t.is(await runTestOn("book-v3"), true);
});

test.serial("Ebook > generate v3 with concurrency", async (t) => {
  t.is(await runTestOn("book-v3-concurrency"), true);
});

test.serial("Ebook > generate v3 with skipImageNotFound on cover", async (t) => {
  t.is(await runTestOn("book-v3-cover-not-found"), true);
});

test.serial("Ebook > generate v3 with skipImageNotFound on an image src", async (t) => {
  t.is(await runTestOn("book-v3-image-not-found"), true);
});

test.serial("Ebook > generate v3 with local file as cover", async (t) => {
  const params = JSON.parse(readFileSync(resolve(__dirname, `./book-v3.json`), { encoding: "utf8" })) as EpubOptions;
  const coverPath = resolve(__dirname, "cover.jpg");
  const output = resolve(__dirname, `./book-v3-with-local-cover.epub`);

  const epub = new EPub({ ...params, cover: coverPath }, output);
  const op = await epub.render();
  t.is(op.result === "ok", true);
});

test.serial("HTML Page > generate v2", async (t) => {
  t.is(await runTestOn("article-v2"), true);
});

test.serial("HTML Page > generate v3", async (t) => {
  t.is(await runTestOn("article-v3"), true);
});
