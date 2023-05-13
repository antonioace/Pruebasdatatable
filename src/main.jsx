import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import MyTable from "./components/TablaEditable.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyTable />
  </React.StrictMode>
);
