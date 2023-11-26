import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography, createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import money from "../images/money.png"
export default function ParCreditoTitulo() {
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
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC

  return (

    <Box sx={{ width:  isMobile ? "100%" : isTablet ? "100%" :'100%',height: "60px",mt:"-3%" }}>
    <Grid container sx={{alignItems: "center"}}>
      <Grid item lg={2} md={3} sm={3} xs={3} sx={{mt:"-1%"}}>
      <img src={money} alt="png" width="50%" />
      </Grid>
      <Grid item lg={10} md={9} sm={9} xs={9} sx={{fontSize: "30px", mt: '0%', fontFamily: 'actor', fontWeight:'600'}}>
        Crédito Greenneat
      </Grid>
    </Grid>
  </Box>

  );
}
