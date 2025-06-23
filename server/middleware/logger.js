import fs from 'fs';

const logger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  fs.appendFileSync('server.log', log);
  next();
};

export default logger;
