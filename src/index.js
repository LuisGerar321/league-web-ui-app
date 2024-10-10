import React from "react";
import ReactDOM from "react-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "Open Sans, sans-serif",
      fontSize: "24px",
      color: " #182C62",
      fontWeight: "bold",
    },
    h2: {
      fontFamily: "sans-serif",
      fontSize: "12px",
    },

    h3: {
      fontFamily: "sans-serif",
      fontSize: "14px",
      fontWeight: "bold",
    },

    body1: {
      fontFamily: "sans-serif",
    },
    body2: {
      fontFamily: "sans-serif",
      color: "glay",
    },
  },
});
ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById("root"),
);
reportWebVitals();
