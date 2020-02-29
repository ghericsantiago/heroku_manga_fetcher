const express = require("express");
const superagent = require("superagent");
const jsdom = require("jsdom");
const jquery = require("jquery");
const db = require("./database");
const firebase = require("firebase-admin");
const config = require("./config");

const app = express();

const mangaModel = db.refs("manga2");

app.get("/", (req, res, next) => {
  (async () => {
    // Fetch All Manga Links
    const mangaLinks = await fetchAllMangaLinks();

    let i = 1;
    let trottle = 0;

    await (() => {
      return new Promise(async (resolve, reject) => {
        for (let link of mangaLinks) {
          fetchMangaDetails(link).then(data => {
            if (!data) {
              i++;
              return;
            }

            mangaModel.child(`${data.id}`).update(data);

            console.log(data);

            if (i == mangaLinks.length) {
              resolve();
            }
            i++;
          });

          if (trottle == 10) {
            await sleep(1000);
            trottle = 0;
          }
          trottle++;
        }
      });
    })();

    // Fetch Fetch Manga Details by Manga ID

    // Fetch All Chapter Links
    // Fetch All Image Links

    // Close firebase
    firebase.app().delete();
  })();

  res.send("running something in background");
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.listen(port, host, () => {
  console.log(`Running on ${host}:${port}`);
});

const sleep = async ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

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

const fetchMangaDetails = async path => {
  const html = await fetchHTML(`${config.baseUrl}${path}`);

  if (!html) return false;

  const $ = await HTMLPlainToDOM(html);
  const name = $("#mangaproperties tr:first-child td:nth-child(2)").text();
  const alt_name = $("#mangaproperties tr:nth-child(2) td:nth-child(2)").text();
  const release_year = $(
    "#mangaproperties tr:nth-child(3) td:nth-child(2)"
  ).text();
  const status = $("#mangaproperties tr:nth-child(4) td:nth-child(2)").text();
  const author = $("#mangaproperties tr:nth-child(5) td:nth-child(2)").text();
  const artist = $("#mangaproperties tr:nth-child(6) td:nth-child(2)").text();
  const readingDirection = $(
    "#mangaproperties tr:nth-child(7) td:nth-child(2)"
  ).text();
  const genre = [];
  $("#mangaproperties tr:nth-child(8) td:nth-child(2) a").each((i, el) => {
    genre.push($(el).text());
  });
  return {
    id: path.substr(1),
    name,
    alt_name,
    release_year,
    status,
    author,
    artist,
    readingDirection,
    genre
  };
};

const HTMLPlainToDOM = async html => {
  const { JSDOM } = jsdom;
  const document = new JSDOM(html);
  return jquery(document.window);
};
