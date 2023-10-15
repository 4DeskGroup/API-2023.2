import * as React from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Card,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import axios from "axios";

interface HistoricoData {
  data_transacao: string;
  estabelecimento_nome_fantasia: string;
  produto_descricao: string;
  quantidade_produto: string;
}

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
  const isMobile = useMediaQuery("(max-width: 600px");
  const isTablet = useMediaQuery("(max-width: 1024px");
  const isDesktop = useMediaQuery("(max-width: 10025px");

  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado");

  const recuperarHistoricoOleo = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado);

      try {
        const response = await axios.get(
          `http://localhost:3001/GETParceiroEstoqueHistorico/${usuarioJson.UsuarioID}`
        );

        const parceiroEstoqueHistArray = JSON.parse(
          response.data.ParceiroEstoque
        );
        

        if (Array.isArray(parceiroEstoqueHistArray)) {
          setHistData((prevData) => [...prevData, ...parceiroEstoqueHistArray]);
        } else {
          console.log("ParceiroEstoque não é um array ou está vazio.");
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
      <Box
        sx={{
          width: isMobile ? "95%" : isTablet ? "95%" : "96%",
          backgroundColor: "white",
          height: isMobile ? "380px" : isTablet ? "380px" : "330px",
          borderRadius: 5,
          borderColor: "gray",
          border: 1,
          mt:'2%'
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 5, height: "100%" }}
        >
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center">Data</TableCell>
                <TableCell align="center">Estabelecimento</TableCell>
                <TableCell align="center">Tipo de óleo</TableCell>
                <TableCell align="center">Quantidade (L)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histData.map((historico, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {historico.data_transacao}
                  </TableCell>
                  <TableCell align="center">
                    {historico.estabelecimento_nome_fantasia}
                  </TableCell>
                  <TableCell align="center">
                    {historico.produto_descricao}
                  </TableCell>
                  <TableCell align="center">
                    {historico.quantidade_produto}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Pagination
            size="small"
            sx={{ ml: "35%", mt: "15%" }}
            count={10}
            variant="outlined"
            color="primary"
          /> */}
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}
