let io = null;

const setIO = instance => {
  io = instance;
};

const getIO = () => io;

const start = (key, end, start) => {
  io.emit(`progress_start`, key, end, start);
};
const update = (key, current) => {
  io.emit(`progress_update`, key, current);
};
const stop = key => {
  io.emit(`progress_stop`, key);
};

module.exports = {
  setIO,
  getIO,
  start,
  update,
  stop
};
