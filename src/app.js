import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Stories from "./components/Stories.jsx";

const App = () => (
  <Provider store={store}>
    <h1>{`Hackernews Top 10 Stories!`}</h1>
    <Stories />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
