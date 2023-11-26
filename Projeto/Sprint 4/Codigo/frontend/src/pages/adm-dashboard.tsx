import React from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import GraficoBarra from "../components/adm-dashboard/barChart";
import GraficoLinha from "../components/adm-dashboard/lineChart";
import GraficoLinha2 from "../components/adm-dashboard/lineChart2";
import GraficoPizza from "../components/adm-dashboard/pieChart";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import AdmLeftMenu from "../components/reusable/adm-left-menu";
import Footer from "../components/reusable/Footer";
import AdmTituloDashboard from "../components/adm-dashboard/tittulo-dashboard";

function Dashboard() {
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
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AdmLeftMenu />
        <Footer />

        <Box
          sx={{
            ml: isMobile ? "30%" : isTablet ? "27%" : "25%",
            mt: isMobile ? "100px" : isTablet ? "100px" : "120px",
            mr: "3%",
            width: isMobile ? "60%" : isTablet ? "70%" : "72%",
            height: isMobile ? "800px" : isTablet ? "840px" : "100%",
          }}
        >
          <Grid container spacing={2}>
            <Grid container sx={{ display: "flex" }}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <AdmTituloDashboard />
              </Grid>
              <Grid item lg={5} md={12} sm={12} xs={12} sx={{mt:'4%'}}>
                <GraficoPizza />
              </Grid>
              <Grid item lg={7} md={12} sm={12} xs={12} sx={{mt:'4%'}}>
                <GraficoBarra />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} sx={{mt:'4%'}}>
                <GraficoLinha />
              </Grid>
              <Grid item lg={12} md={6} sm={12} xs={12} sx={{mt:'4%'}}>
                <GraficoLinha2 />
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            ml: isMobile ? "30%" : isTablet ? "27%" : "25%",
            mt: isMobile ? "100px" : isTablet ? "100px" : "120px",
            mr: "3%",
            width: isMobile ? "60%" : isTablet ? "70%" : "72%",
            height: isMobile ? "800px" : isTablet ? "840px" : "100%",
          }}
        ></Box>
      </ThemeProvider>
    </div>
  );
}

export default Dashboard;
