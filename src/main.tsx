import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { TodoProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>,
);
