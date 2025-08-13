const ConfigModel = require('../models/config');

async function loadConfig(req, res, next) {
  try {
    let config = await ConfigModel.findOne();
    if (!config) {
      config = await ConfigModel.create({});
    }
    res.locals.config = config; // biến config sẵn có trong mọi view
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loadConfig;