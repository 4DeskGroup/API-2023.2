import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Card, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import img1 from "../images/oleo-limpo-branco.png"
import img2 from "../images/oleo-usado-branco.png"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function EstEstoqueHistorico() {
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
  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];
  
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: isMobile ? "95%" : isTablet ? "95%" : "96%",
        backgroundColor: "white",
        height: isMobile ? "380px" : isTablet ? "380px" : "330px",
        borderRadius: 5,
        borderColor: "gray",
        border: 1,
      }}
    >
        <TableContainer component={Paper} sx={{borderRadius:5, height:'100%'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Tipo de óleo</TableCell>
            <TableCell align="right">Quantidade (L)</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination size='small' sx={{ml:'35%', mt:'15%'}} count={10} variant="outlined" color="primary" />
    </TableContainer>
    </Box>
    </ThemeProvider>
  );
}
