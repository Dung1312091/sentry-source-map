const fs = require("fs-extra");
const { init } = require("@sentry/electron");
const isMain = process.type === "browser";
const { app } = isMain ? require("electron") : require("electron").remote;
const defaultSentryConfig = require("./defaultConfig");

const CONFIG_NAME = "sentry-config.json";

function isEmpty(obj) {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }
  return true;
}

/**
 * @category Function
 * @param {string} filePath Path to file
 * @param {object} defaultConfig default value
 * @returns {object} Return content of file or default value
 */
function loadConfigFile(filePath, defaultConfig = {}) {
  try {
    const config = fs.readJsonSync(filePath);
    if (isEmpty(config)) {
      return defaultConfig;
    }
    return config;
  } catch (err) {
    console.log("catch", err);
    return defaultConfig;
  }
}

/**
 * @category Function
 * @param {object} [options={config:{},enable: true }] config sentry
 */
function initSentry(sentryConfig = {}) {
  const { enable, config } = sentryConfig;
  if (enable) {
    init(config);
  } else {
    console.log("Sentry is disable");
  }
}

function bootstrap() {
  const userData = app.getPath("userData");
  const path = `${userData}/${CONFIG_NAME}`;
  const config = loadConfigFile(path, defaultSentryConfig);
  console.log("config", config);

  initSentry(config);
}

bootstrap();

module.exports = {
  CONFIG_NAME
};
