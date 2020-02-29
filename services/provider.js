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
