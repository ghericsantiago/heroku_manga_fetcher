const { fetchHTML, HTMLPlainToDOM } = require("./fuck");

exports.getTitles = async () => {
  const html = await fetchHTML("http://www.mangareader.net/alphabetical");
  if (!html) return process.exit(22);
  const $ = await HTMLPlainToDOM(html);
  const mangas = [];
  $("ul.series_alpha a").each((i, el) => {
    const a = $(el);
    mangas.push({
      href: a.attr("href"),
      title: a.parent().text()
    });
  });
  return mangas;
};

exports.fetchMangaDetails = async path => {
  const html = await fetchHTML(`http://www.mangareader.net${path}`);

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
