import React from "react";
import ReactDOM from "react-dom";
import ExampleBoundary from "./ExampleBoundary";
const electron = window.require("electron");
const { ipcRenderer } = electron;
import User from "./components/users";
import Raven from "raven-js";
const App = () => {
  const handleClick = () => {
    let a;
    a.forEach(element => {
      console.log(element);
    });
  };
  const handleError = () => {
    console.lo("A");
  };
  const hanleCrashMainApp = () => {
    ipcRenderer.send("crash-app");
  };

  const handleErrorByLogicMain = () => {
    ipcRenderer.send("error-by-logic");
  };

  // const handeleDisableSentry = () => {
  //   console.log("disable");
  //   Sentry.getCurrentHub()
  //     .getClient()
  //     .getOptions().enabled = false;
  // };

  // const handeleEnableSentry = () => {
  //   console.log("enable");
  //   Sentry.getCurrentHub()
  //     .getClient()
  //     .getOptions().enabled = true;
  // };

  // const handeleChangeDSN = () => {
  //   console.log("change DSN");
  //   // Sentry.init({
  //   //   dsn: "https://02330e4d14b844468099c4134080fe16@sentry.io/4543967",
  //   //   debug: true,
  //   //   release: "v10.3"
  //   // });
  //   Raven.uninstall()
  //     .config("https://02330e4d14b844468099c4134080fe16@sentry.io/4543967", {
  //       release: "v10.5"
  //     })
  //     .install();
  // };

  const handleIpcOne = () => {
    ipcRenderer.send("ipc-once", "once");
  };

  const handleIpcHandle = async () => {
    const res = await ipcRenderer.invoke("my-invokable-ipc", 1, 2);
    console.log("res from ipc handle", res);
  };

  const handleIpcHandleOnce = async () => {
    const res = await ipcRenderer.invoke("my-invokable-ipc-once", 1, 2);
    console.log("res from ipc handle once", res);
  };

  const handleIpcSentSync = async () => {
    let rs = ipcRenderer.sendSync("synchronous-message", "ping");
    console.log("rs===>", rs);
    console.log("run....");
  };
  return (
    <ExampleBoundary>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleError}>Error</button>
      <button onClick={hanleCrashMainApp}>Crash main app</button>
      <button onClick={handleErrorByLogicMain}>
        Error By Logic On Main Process
      </button>
      {/* <button onClick={handeleDisableSentry}>Disable Sentry</button>
      <button onClick={handeleEnableSentry}>Enable Sentry</button>
      <button onClick={handeleChangeDSN}>Change DSN</button> */}
      <User data={[{ name: 1 }]} />
      <hr />
      <h1>IPC</h1>
      <hr />
      <button onClick={handleIpcSentSync}>IPC Sent Sync</button>
      <button onClick={handleIpcOne}>IPC Once</button>
      <button onClick={handleIpcHandle}>IPC Handle</button>
      <button onClick={handleIpcHandleOnce}>IPC Handle Once</button>
      <button onClick={() => {console.lo("vao ne")}}>Click Bugs 1</button>
      <button onClick={() => {null.forEach((item)=>{console.log(item)})}}>Click Bugs 2</button>
    </ExampleBoundary>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
