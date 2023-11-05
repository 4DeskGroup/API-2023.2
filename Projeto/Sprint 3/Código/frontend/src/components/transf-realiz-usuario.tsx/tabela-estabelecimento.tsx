import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface HistoricoData {
  Data_Transacao: string;
  Empresa_Que_Recebeu: string;
  Estabelecimento_Que_Transferiu: string;
  Total_Moedas_Transferidas: number;
}

type SortKey = keyof HistoricoData;

export default function TabelaEstabelecimento() {
  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const [searchInput, setSearchInput] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: SortKey | "";
    direction: string;
  }>({
    key: "",
    direction: "asc",
  });
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7;

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
  const isDesktop = useMediaQuery("(max-width: 10025px)");

  const recuperarHistoricoOleo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BaseURL}/GETListaEstabelecimentosTransacoes`
      );
      const estabelecimentoTransacoes = response.data.EstabelecimentoTransacoes;

      if (Array.isArray(estabelecimentoTransacoes)) {
        setHistData(estabelecimentoTransacoes);
      } else {
        console.log("estabelecimentoTransacoes não é um array ou está vazio.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    recuperarHistoricoOleo();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearchInput(event.target.value);
  };

  const filteredData = histData.filter(
    (historico) =>
      historico.Data_Transacao.toLowerCase().includes(
        searchInput.toLowerCase()
      ) ||
      historico.Estabelecimento_Que_Transferiu.toLowerCase().includes(
        searchInput.toLowerCase()
      ) ||
      historico.Empresa_Que_Recebeu.toLowerCase().includes(
        searchInput.toLowerCase()
      )
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
      <Grid container spacing={10}>
        <Grid item xs={12} sm={7} md={7} lg={7} xl={7}></Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Paper
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              mt: -5,
              width: isMobile ? "100%" : isTablet ? "100%" : "100%",
              border: "1px solid #ccc",
              borderRadius: 10,
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

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={12} md={3} lg={3} xl={12}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={12}>
          <Box
            sx={{
              width: isMobile ? "92%" : isTablet ? "92%" : "92%",
              backgroundColor: "white",
              borderRadius: 5,
              borderColor: "gray",
              border: 1,
              mt: 2,
              display: "flex",
              //alignItems: 'center',
              //justifyContent: 'center',
              height: "310px",
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
                    <TableCell
                      align="center"
                      onClick={() => handleSort("Data_Transacao")}
                    >
                      Data da Transação
                      {sortConfig.key === "Data_Transacao" &&
                        (sortConfig.direction === "asc" ? (
                          <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                        ) : (
                          <KeyboardArrowUpIcon  style={{ verticalAlign: "bottom" }}/>
                        ))}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleSort("Estabelecimento_Que_Transferiu")}
                    >
                      Estabelecimento
                      {sortConfig.key === "Estabelecimento_Que_Transferiu" &&
                        (sortConfig.direction === "asc" ? (
                          <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                        ) : (
                          <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }}/>
                        ))}
                    </TableCell>
                    <TableCell
                      align="center"
                      onClick={() => handleSort("Empresa_Que_Recebeu")}
                    >
                      Destinatário
                      {sortConfig.key === "Empresa_Que_Recebeu" &&
                        (sortConfig.direction === "asc" ? (
                          <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }} />
                        ) : (
                          <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }}/>
                        ))}
                    </TableCell>
                    
                    <TableCell
                      align="center"
                      onClick={() => handleSort("Total_Moedas_Transferidas")}
                    >
                      Greenneats
                      {sortConfig.key === "Total_Moedas_Transferidas" &&
                        (sortConfig.direction === "asc" ? (
                          <KeyboardArrowDownIcon style={{ verticalAlign: "bottom" }}/>
                        ) : (
                          <KeyboardArrowUpIcon style={{ verticalAlign: "bottom" }}/>
                        ))}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedData.map((historico, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {historico.Data_Transacao}
                      </TableCell>
                      <TableCell align="center">
                        {historico.Estabelecimento_Que_Transferiu}
                      </TableCell>
                      <TableCell align="center">
                        {historico.Empresa_Que_Recebeu}
                      </TableCell>
                      <TableCell align="center">
                        {historico.Total_Moedas_Transferidas}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Pagination
          size="small"
          sx={{ ml: "2%", mt: "-3%", zIndex: 500 }}
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
    </ThemeProvider>
  );
}
