import React from "react";
import ReactDOM from "react-dom";
// import { init } from "@sentry/browser";
// init({
//   dsn: "https://70cd0cb5f0c04de18bbd9a15203ff3c8@sentry.io/4160835",
//   debug: true
// });
const { ipcRenderer } = require("electron");
const { crash } = global.process || {};
import "../public/sentry";
import User from "./components/users";

window.crashRenderer = crash;

window.versions = {
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node
};
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
  const renderContent = () => {
    const data = null;
    return data.map(item => {
      return <div>AAA</div>;
    });
  };
  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleError}>Error</button>
      {/* {renderContent()} */}
      <User data={[{ name: 1 }]} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
