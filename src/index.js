import React from "react";
import ReactDOM from "react-dom";
// import { init } from "@sentry/browser";
// init({
//   dsn: "https://70cd0cb5f0c04de18bbd9a15203ff3c8@sentry.io/4160835",
//   debug: true
// });
import "../public/sentry";
const electron = window.require("electron");
const { ipcRenderer } = electron;
import "../public/sentry";
import User from "./components/users";
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
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleError}>Error</button>
      <button onClick={hanleCrashMainApp}>Crash main app</button>
      <button onClick={handleErrorByLogicMain}>
        Error By Logic On Main Process
      </button>
      {/* {renderContent()} */}
      <User data={[{ name: 1 }]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
