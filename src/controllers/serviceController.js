const { getTitles, getMangaDetails } = require("../../services");

exports.index = async (req, res, next) => {
  const titles = await getTitles();
  res.send(titles);
};

exports.getChapters = async (req, res, next) => {
  const mangaList = req.body.manga || [];

  // Wait for async loop to be finish
  const chapters = await (() => {
    return new Promise((resolve, reject) => {
      let processed = 0;
      let chapters = [];
      for (let i = 0; i < mangaList.length; i++) {
        getMangaDetails(mangaList[i]).then(data => {
          chapters.push(data);
          processed++;
          if (processed == mangaList.length) {
            resolve(chapters);
          }
        });
      }
    });
  })();

  res.send(chapters);
};
