const {
  getTitlesCount,
  getTitles,
  getMangaDetails,
  fetchMangaChapters
} = require("../../services");
const TitleModel = require("../models/title");
const MangaModel = require("../models/manga");
const { start, update, stop } = require("../socket");

exports.index = async (req, res, next) => {
  const titleCount = await getTitlesCount();
  const count = await TitleModel.countDocuments();

  // Update Database if not yet sync
  if (count != titleCount) {
    const titles = await getTitles();
    await TitleModel.insertMany(titles);
    return res.send(titles);
  }

  const titles = await TitleModel.find();

  return res.send(titles);
};

exports.getChapters = async (req, res, next) => {
  const mangaList = req.body.manga || [];

  // Wait for async loop to be finish
  const chapters = await (() => {
    return new Promise((resolve, reject) => {
      let processed = 0;
      let chapters = [];
      start("chapter", mangaList.length, 1);
      for (let i = 0; i < mangaList.length; i++) {
        getMangaDetails(mangaList[i]).then(async data => {
          chapters.push(data);
          await MangaModel.insertMany([data]);

          update("chapter", i + 1);

          processed++;
          if (processed == mangaList.length) {
            resolve(chapters);
            stop("chapter");
          }
        });
      }
    });
  })();

  res.send(chapters);
};
