import React from "react";
import StepperComp from "../components/registration/StepperComp";
import Footer from "../components/reusable/Footer";
import TopMenu from "../components/reusable/TopMenu";
import { ThemeProvider, createTheme } from "@mui/material";

function Registration() {
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
    <div className="App">
      <ThemeProvider theme={theme}>
        <TopMenu />
        <StepperComp />
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default Registration;
