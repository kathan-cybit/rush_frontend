import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import toast, { Toaster } from "react-hot-toast";
import { MantineProvider } from "@mantine/core";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/core/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </MantineProvider>,
);
