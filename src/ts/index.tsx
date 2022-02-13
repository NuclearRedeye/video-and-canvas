import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./app.js";

ReactDOM.render(
  <App message="Hello World!"/>,
  document.getElementById('root') as HTMLElement
);