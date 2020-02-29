const { getTitles } = require("../../services");

exports.index = async (req, res, next) => {
  const titles = await getTitles();
  res.send(titles);
};
