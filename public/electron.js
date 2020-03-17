const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const isDev = require("electron-is-dev");
const debug = require("electron-debug");
const fs = require("fs-extra");
const { CONFIG_NAME } = require("../sentry/index.js");
debug();
let mainWindow;

function logError(error) {
  if (typeof error === "object") {
    if (error.message) {
      console.log("\nMessage: " + error.message);
    }
    if (error.stack) {
      console.log("\nStacktrace:");
      console.log("====================");
      console.log(error.stack);
      console.log(error.code);
    }
  } else {
    console.log("Argument is not an object", error);
  }
}
//set up crash report
electron.crashReporter.start({
  companyName: "Demo",
  productName: "my-electron-crasher",
  submitURL: "",
  ignoreSystemCrashHandler: true,
  uploadToServer: true,
  autoSubmit: true
  // extra: {
  //   'key': 'en-US',
  //   'email': 'quangdung100194@gmail.com',
  //   'comments': 'Crash app!'
  // }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "../sentry/index.js")
    }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
  mainWindow.on("closed", () => (mainWindow = null));
  mainWindow.webContents.openDevTools();
  // mainWindow.webContents.on('crashed', e => {
  //   console.log("crashed===>", e);
  //   app.relaunch();
  //   // app.quit()
  // });
  // const appData = app.getPath("appData");
  // fs.writeJsonSync(`${appData}/sentry-with-source-map/sentry-config.json`, {
  //   dsn: "https://70cd0cb5f0c04de18bbd9a15203ff3c8@sentry.io/4160835",
  //   enable: true
  // });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
//crash app
ipcMain.on("crash-app", () => {
  let a = [];
  for (;;) {
    a.push("crash");
  }
});

//error by logic
ipcMain.on("error-by-logic", () => {
  let a;
  a.map(element => {
    return {};
  });
});

//error by logic
ipcMain.on("error-by-logic", () => {
  let a;
  a.map(element => {
    return {};
  });
});
//error by not responding
ipcMain.on("error-by-not-responding", () => {
  for (let i = 0; i < 1000000000; i++) {
    console.log(i);
  }
});
// Catch Exception
// process.on("uncaughtException", function (error, origin) {
//   console.error("uncaughtException");
//   logError(error);
//   console.log("origin====>", origin);
// });
// process.on("unhandledRejection", (error, origin) => {
//   console.error("unhandledRejection");
//   logError(error);
//   console.log("origin====>", origin);
// });
ipcMain.on("demo.error", () => {
  console.log("Error triggered in main processes");
  throw new Error("Error triggered in main processes");
});

ipcMain.on("demo.crash", () => {
  console.log("process.crash()");
  process.crash();
});
//IPC
ipcMain.once("synchronous-message", (event, arg) => {
  console.log("event", event);
  setTimeout(() => {
    event.returnValue = "pong";
  }, 1000);
});

ipcMain.once("ipc-once", (event, arg) => {
  console.log("ipc-once", arg);
});

ipcMain.handle("my-invokable-ipc", (event, ...args) => {
  return args[0] + args[1];
});

ipcMain.handleOnce("my-invokable-ipc-once", (event, ...args) => {
  return args[0] + args[1];
});
