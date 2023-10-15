import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material";
import erro404 from "../components/images/erro404.png"

const theme = createTheme({
    palette: {
      primary: {
        main: "#136935",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });

function Erro404() {
  return (
    <ThemeProvider theme={theme}>
    <img
      src={erro404}
      loading="lazy"
      alt=""
      style={{
        position: "static",
        maxWidth: "100%",
        minWidth: "100vh",
      }}
    />
  </ThemeProvider>
  );
}

export default Erro404;
