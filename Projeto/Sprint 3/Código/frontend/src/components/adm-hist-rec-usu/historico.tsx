
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  Card,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface HistoricoData {
  data_transacao: string;
  quantidade_creditos: number;
  nome_fantasia: string;
}
type SortKey = keyof HistoricoData;

export default function Historico() {
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

  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado");
  const [searchInput, setSearchInput] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey | "";
    direction: string;
  }>({
    key: "",
    direction: "asc",
  });
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7; // Define o número de linhas por página

  // Função para recuperar o histórico
  const recuperarHistoricoOleo = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BaseURL}/GETHistoricosRecebimentosMoedas/${usuarioJson.UsuarioID}`
        );

        const parceiroEmpresaExtratoArray = JSON.parse(
          response.data.ParceiroEmpresaExtrato
        );

        if (Array.isArray(parceiroEmpresaExtratoArray)) {
          setHistData(parceiroEmpresaExtratoArray);
        } else {
          console.log(
            "parceiroEmpresaExtratoArray não é um array ou está vazio."
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    recuperarHistoricoOleo();
  }, []);

  // Atualiza o valor da pesquisa
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0); // Reinicia a página para a primeira página ao alterar a pesquisa
    setSearchInput(event.target.value);
  };

  const filteredData = histData.filter(
    (historico) =>
      historico.data_transacao
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      historico.nome_fantasia.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSort = (key: SortKey) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key !== "") {
      if (sortConfig.direction === "asc") {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return -1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return 1;
        }
      } else {
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return -1;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return 1;
        }
      }
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 5,
              width: isMobile ? "100%" : isTablet ? "100%" : "100%",
              border: "1px solid #ccc",
              borderRadius: 4,
            }}
          >
            <IconButton aria-label="menu"></IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Pesquisa"
              inputProps={{ "aria-label": "Pesquisar" }}
              value={searchInput}
              onChange={handleSearchChange}
            />
            <IconButton type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
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
              mt: 2,
              display: 'flex',
            }}
          >
            <TableContainer>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <span onClick={() => handleSort("data_transacao")}>
                        Data da Transação
                        {sortConfig.key === "data_transacao" ? (
                          sortConfig.direction === "asc" ? (
                            <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }} />
                          ) : (
                            <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                          )
                        ) : null}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span onClick={() => handleSort("nome_fantasia")}>
                        Usuários
                        {sortConfig.key === "nome_fantasia" ? (
                          sortConfig.direction === "asc" ? (
                            <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }} />
                          ) : (
                            <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                          )
                        ) : null}
                      </span>
                    </TableCell>
                    <TableCell align="center">
                      <span onClick={() => handleSort("quantidade_creditos")}>
                        Moedas recebidas
                        {sortConfig.key === "quantidade_creditos" ? (
                          sortConfig.direction === "asc" ? (
                            <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }} />
                          ) : (
                            <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                          )
                        ) : null}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((historico, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{historico.data_transacao}</TableCell>
                      <TableCell align="center">{historico.nome_fantasia}</TableCell>
                      <TableCell align="center">{historico.quantidade_creditos}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Pagination
            size="small"
            sx={{ ml: "40%", mt: "-4%", zIndex: 500 }}
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, newPage) => {
              setPage(newPage - 1);
            }}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
