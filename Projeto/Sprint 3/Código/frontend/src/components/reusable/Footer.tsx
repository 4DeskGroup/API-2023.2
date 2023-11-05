import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function Footer() {
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

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        color="primary"
        sx={{
          height: "6vh",
          maxWidth: "100%",
          boxShadow: 5,
          position: "fixed",
          top: "auto",
          bottom: 0,
          zIndex: 2000,
        }}
      ></AppBar>

      <Typography
        color="secondary"
        sx={{
          fontFamily: "actor",
          variant: "filledTonal",
          fontSize: 14,
          position: "fixed",
          top: "auto",
          bottom: 7,
          zIndex: 2001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        Greenneat | 2023
      </Typography>
      <Typography
        color="secondary"
        sx={{
          fontFamily: "actor",
          variant: "filledTonal",
          fontSize: 14,
          position: "fixed",
          top: "auto",
          bottom: 7,
          zIndex: 2001,
          display: "flex",
        //   alignItems: "center",
        //   justifyContent: "center",
          width: "100%",
        }}
      >
        entre em contato: greenneat@conato.com
      </Typography>
    </ThemeProvider>
  );
}
