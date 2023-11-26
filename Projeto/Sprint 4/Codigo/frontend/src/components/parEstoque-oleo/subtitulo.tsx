import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import boximg from "../images/boxes.png"
export default function ParEstoqueSubTitulo() {
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
    <Box sx={{ width:  isMobile ? "100%" : isTablet ? "100%" :'100%', height: "40px" }}>
      <Grid container >
        <Grid item lg={9} md={9} sm={9} xs={9} sx={{fontSize: "18px", mt: '10%', fontFamily: 'actor', fontWeight:'100'}}>
          Histórico de óleo coletado:
        </Grid>
      </Grid>
    </Box>
  );
}
