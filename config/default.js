module.exports = {
  serverPort: 8080,
  router: `${__dirname}/../src/routers/web`,
  viewsFolder: `${__dirname}/../src/apps/views/`,
  viewEngine: "ejs",
  staticFolder: `${__dirname}/../src/public`,
  tmpUpload: `${__dirname}/../src/tmp`,
};
