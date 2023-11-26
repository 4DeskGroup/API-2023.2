import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, useMediaQuery } from "@mui/material";
import Grafico from "../images/grafico-de-pizza.png"


export default function AdmTituloDashboard() {
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
      <Grid container>
        <Grid item lg={2} md={3} sm={3} xs={3} sx={{mt:"3%"}}>
        <img src={Grafico} alt="png" width="50px" />
        </Grid>
        <Grid item lg={10} md={9} sm={9} xs={9} sx={{fontSize: "30px", mt: '4%',ml:'-7%', fontFamily: 'actor', fontWeight:'600'}}>
          Dashboards
        </Grid>
      </Grid>
    </Box>
  );
}
