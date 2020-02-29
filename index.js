const express = require("express");
const superagent = require("superagent");
const jsdom = require("jsdom");
const jquery = require("jquery");

const app = express();

app.get("/", async (req, res, next) => {
  const manga = await fetchAllMangaLinks();
  res.send(manga);
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Running on ${host}:${port}`);
});

const fetchAllMangaLinks = async () => {
  const html = await fetchHTML("http://www.mangareader.net/alphabetical");

  if (!html) return process.exit(22);

  const $ = await HTMLPlainToDOM(html);
  const mangas = [];
  $("ul.series_alpha a").each((i, el) => {
    const a = $(el);
    mangas.push(a.attr("href"));
  });
  return mangas;
};

const fetchHTML = async (url, retry = 5, tries = 1) => {
  try {
    if (tries == retry) {
      return false;
    }
    return (await superagent(url)).text;
  } catch (error) {
    if (error.status != 404) {
      await sleep(1000);
      tries++;
      return (await fetchHTML(url, retry, tries)).text;
    }
  }
};

const HTMLPlainToDOM = async html => {
  const { JSDOM } = jsdom;
  const document = new JSDOM(html);
  return jquery(document.window);
};
