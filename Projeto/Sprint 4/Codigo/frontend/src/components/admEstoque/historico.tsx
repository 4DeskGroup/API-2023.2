import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Card, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
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
import axios from "axios";


interface HistoricoData {
  data_transacao: string;
  quantidade_creditos: number;
  nome_fantasia: string;
  produto_descricao: string;
  produto_quantidade: number;
}

export default function AdmHistorico() {
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
    name: number,
    calories: number,
    fat: number,
    carbs: number,
    est: string,
    cdd: string,
  ) {
    return { name, calories, fat, carbs, est, cdd };
  }

  // const rows = [
  //   createData(5, 159, 6.0, 24, 'ex', 'ex'),
  //   createData(6, 237, 9.0, 37, 'ex', 'ex'),
  //   createData(7, 262, 16.0, 24, 'ex', 'ex'),
  // ];

  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7; // Define o número de linhas por página
  const recuperarHistoricoOleo = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BaseURL}/GETParceiroEmpresaCompraOleo/${usuarioJson.UsuarioID}`
        );

        const parceiroEmpresaExtratoArray = JSON.parse(
          response.data.ParceiroEmpresaExtrato
        );

        if (Array.isArray(parceiroEmpresaExtratoArray)) {
          setHistData(parceiroEmpresaExtratoArray);

        } else {
          console.log("parceiroEmpresaExtratoArray não é um array ou está vazio.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    recuperarHistoricoOleo();
  }, []);

  return (
    <ThemeProvider theme={theme}>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>

        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            sx={{
              width: isMobile ? "100%" : isTablet ? "100%" : "100%",
              backgroundColor: "white",
              height: isMobile ? "380px" : isTablet ? "380px" : "330px",
              borderRadius: 5,
              borderColor: "gray",
              border: 1,
              // ml: 55,
              mt: 8,
              display: 'flex',
              //alignItems: 'center',
              //justifyContent: 'center', // Centraliza horizontalmente
              // width: "100%",

            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Data da Transação</TableCell>
                    <TableCell align="center">Óleo</TableCell>
                    <TableCell align="center">Quantidade de Óleo</TableCell>
                    <TableCell align="center">Nome do Parceiro</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {histData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historico, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {historico.data_transacao}
                      </TableCell>
                      <TableCell align="center">
                        {historico.produto_descricao}
                      </TableCell>
                      <TableCell align="center">
                        {historico.produto_quantidade}
                      </TableCell>
                      <TableCell align="center">
                        {historico.nome_fantasia}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
            </TableContainer>
          </Box>
          <Pagination
            size="small"
            sx={{ ml: "40%", mt: "-3%", zIndex:500 }}
            count={Math.ceil(histData.length / rowsPerPage)}
            page={page + 1} // Incrementado em 1 para mostrar página 1 em vez de 0
            onChange={(event, newPage) => {
              setPage(newPage - 1); // Decrementado em 1 para manter a consistência
            }}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
      <Grid />
    </ThemeProvider>
  );
}
