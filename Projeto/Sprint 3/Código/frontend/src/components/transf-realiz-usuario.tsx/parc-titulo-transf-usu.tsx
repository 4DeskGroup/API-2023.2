import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, useMediaQuery } from "@mui/material";
import boximg from "../images/extrato.png"


export default function AdmTituloTransferirGreenneats() {
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
    
    <Box sx={{ width:  isMobile ? "130%" : isTablet ? "130%" :'130%',height: "60px",mt:2 }}>
      <Grid container >
        <Grid item lg={2} md={2} sm={2} xs={2}>
        <img src={boximg} alt="png" width="50%" />
        </Grid>
        <Grid item lg={9} md={9} sm={9} xs={9} sx={{fontSize: "30px", mt: 2, fontFamily: 'actor', fontWeight:'600'}}>
          Transferência realizada pelo usuário
        </Grid>
      </Grid>
    </Box>
  );
}
