import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import {ThemeProvider, createTheme, useMediaQuery, Grid } from "@mui/material";
 
export default function AdmBarraPesquisa() {
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
    <ThemeProvider theme={theme}>
    <Grid container spacing={10}>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}></Grid>
 
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
    <Paper
      component="form"
      sx={{  display: 'flex', alignItems: 'center', mt: -7,
      width: isMobile ? "80%" : isTablet ? "80%" : "100%",
      border: '1px solid #ccc',
      borderRadius: 10,  }}
    >
      <IconButton  aria-label="menu">
       
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisa"
        inputProps={{ 'aria-label': 'Pesquisar' }}
      />
      <IconButton type="button"  aria-label="search">
        <SearchIcon />
      </IconButton>          
    </Paper>
    </Grid>
    </Grid>
    </ThemeProvider>
  );
}
 