const { fetchHTML, HTMLPlainToDOM } = require("./fuck");

const getTitles = async () => {
  const html = await fetchHTML("http://www.mangareader.net/alphabetical");
  if (!html) return process.exit(22);
  const $ = await HTMLPlainToDOM(html);
  const mangas = [];
  $("ul.series_alpha a").each((i, el) => {
    const a = $(el);
    mangas.push({
      href: a.attr("href"),
      title: a
        .parent()
        .text()
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
    });
  });
  return mangas;
};

const getTitlesCount = async () => {
  const html = await fetchHTML("http://www.mangareader.net/alphabetical");
  if (!html) return process.exit(22);
  const $ = await HTMLPlainToDOM(html);
  return $("ul.series_alpha a").length;
};

const fetchMangaChapters = async html => {
  const $ = await HTMLPlainToDOM(html);
  const chapters = [];
  $("#chapterlist a").each((i, el) => {
    chapters.push({
      href: $(el).attr("href"),
      title: $(el)
        .parent()
        .text()
        .replace(/(\r\n|\n|\r)/gm, "") // Remove newlines
    });
  });
  return chapters;
};

const fetchMangaDetails = async path => {
  const html = await fetchHTML(`http://www.mangareader.net${path}`);

  if (!html) return false;

  const $ = await HTMLPlainToDOM(html);
  const name = $("#mangaproperties tr:first-child td:nth-child(2)")
    .text()
    .replace(/(\r\n|\n|\r)/gm, ""); // Remove newlines;
  const alt_name = $("#mangaproperties tr:nth-child(2) td:nth-child(2)")
    .text()
    .replace(/(\r\n|\n|\r)/gm, ""); // Remove newlines;
  const release_year = $(
    "#mangaproperties tr:nth-child(3) td:nth-child(2)"
  ).text();
  const status = $("#mangaproperties tr:nth-child(4) td:nth-child(2)")
    .text()
    .replace(/(\r\n|\n|\r)/gm, ""); // Remove newlines;
  const author = $("#mangaproperties tr:nth-child(5) td:nth-child(2)")
    .text()
    .replace(/(\r\n|\n|\r)/gm, ""); // Remove newlines;
  const artist = $("#mangaproperties tr:nth-child(6) td:nth-child(2)")
    .text()
    .replace(/(\r\n|\n|\r)/gm, ""); // Remove newlines;
  const readingDirection = $(
    "#mangaproperties tr:nth-child(7) td:nth-child(2)"
  ).text();
  const genre = [];
  $("#mangaproperties tr:nth-child(8) td:nth-child(2) a").each((i, el) => {
    genre.push(
      $(el)
        .text()
        .replace(/(\r\n|\n|\r)/gm, "")
    );
  });

  const chapters = await fetchMangaChapters(html);

  return {
    id: path.substr(1),
    name,
    alt_name,
    release_year,
    status,
    author,
    artist,
    readingDirection,
    genre,
    chapters_count: chapters.length,
    chapters
  };
};

module.exports = {
  fetchMangaChapters,
  fetchMangaDetails,
  getTitlesCount,
  getTitles
};
