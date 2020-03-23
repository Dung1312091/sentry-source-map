const fs = require("fs-extra");
const {
  init
} = require("@sentry/electron");
const Integrations = require("@sentry/integrations");
const isMain = process.type === "browser";
const {
  app
} = isMain ? require("electron") : require("electron").remote;
const defaultSentryConfig = require("./defaultConfig");

const CONFIG_FILE_NAME = "sentry-config.json";

function logger(msg) {
  console.log(msg);
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
    if (config) {
      logger(`Load config from file ${CONFIG_FILE_NAME}`);
      return config;
    } else {
      logger("Load config from default config");
      return defaultConfig;
    }
  } catch (error) {
    logger(
      `Load config file error. \n${error} \nLoad config from default config`
    );
    return defaultConfig;
  }
}

function getFramesFromEvent(event) {
  const {
    exception,
    stacktrace
  } = event;
  if (exception) {
    try {
      return exception.values[0].stacktrace.frames;
    } catch (_) {
      return undefined;
    }
  } else if (stacktrace) {
    return stacktrace.frames;
  }
  return undefined;
}

function getErrorMessageFromEvent(event) {
  const {
    exception
  } = event;
  if (exception) {
    try {
      const type = exception.values[0].type;
      const msg = exception.values[0].value;
      return `${type} ${msg}`
    } catch (_) {
      return "no message";
    }
  }
  return "no message";
}

function ganerateMessageKeyFromError(event) {
  const genUnitId = (frame) => {
    return `${frame.function} ${frame.colno} ${frame.lineno}`
  }
  const message = getErrorMessageFromEvent(event);
  const frames = getFramesFromEvent(event);
  const len = frames && frames.length;
  if (len && len > 0) {
    const fistFrame = frames[0];
    const lastFrame = frames[len - 1];
    return `${message} ${genUnitId(fistFrame)} ${genUnitId(lastFrame)}`;
  }
  return message;
  // console.log("message===>", msg);
}
/**
 * @category Function
 * @param {object} [options={config:{},enable: true }] config sentry
 */
function initSentry(sentryConfig = {}) {
  let errorMessages = new Map();
  const {
    enable,
    config
  } = sentryConfig;
  if (enable && config && config.dsn) {
    try {
      init({
        ...config,
        beforeSend(event, hint) {
          let msg = ganerateMessageKeyFromError(event, hint);
          console.log("Message key error:", msg);
          for (let [key, value] of errorMessages) {
            console.log(key + ' === ' + value);
          }
          if (errorMessages.has(msg)) {
            return null;
          } else {
            errorMessages.set(msg, true);
          console.log("Sent to server");

            return event;
          }
        }
      });
    } catch (error) {
      logger("sentry init error", error);
    }
  } else {
    logger("Sentry is disable");
  }
}

function bootstrap() {
  const userData = app.getPath("userData");
  const path = `${userData}/${CONFIG_FILE_NAME}`;
  const config = loadConfigFile(path, defaultSentryConfig);
  initSentry(config);
}

bootstrap();

module.exports = {
  CONFIG_FILE_NAME
};