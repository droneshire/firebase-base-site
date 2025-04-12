import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";

import "./index.css";
import App from "components/App";
import { LinkBehavior } from "components/utils/links";

// Set default link components to ref forwarding react-router links
const mdTheme = createTheme({
  palette: {
    primary: blue,
    secondary: blueGrey,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior as React.ElementType,
      },
    },
    MuiListItemButton: {
      defaultProps: {
        component: LinkBehavior as React.ElementType,
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
