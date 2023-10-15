import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import boximg from "../images/boxes.png"
export default function ParEstoqueTitulo() {
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
    <Box sx={{ width:  isMobile ? "100%" : isTablet ? "100%" :'100%',height: "60px" }}>
      <Grid container>
        <Grid item lg={3} md={3} sm={3} xs={3}>
        <img src={boximg} alt="png" width="50%" />
        </Grid>
        <Grid item lg={9} md={9} sm={9} xs={9} sx={{fontSize: "30px", mt: '1%', fontFamily: 'actor', fontWeight:'600'}}>
          Estoque de Óleo
        </Grid>
      </Grid>
    </Box>
  );
}
