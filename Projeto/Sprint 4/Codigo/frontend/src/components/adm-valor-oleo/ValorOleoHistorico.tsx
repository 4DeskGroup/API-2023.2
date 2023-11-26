import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Axios from 'axios';
import { Pagination, useMediaQuery } from '@mui/material';


interface HistoricoData {
  HistoricoParametrizacaoID: string,
  ParametroID: string,
  HistoricoParametroData: string,
  HistoricoParametroDescricao: string,
  HistoricoParametroProduto: string,
  HistoricoParametroValor: string
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#136935',
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export default function ValorOleoHistorico() {
  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7;


  const recuperarHistoricoParametro = async () => {
    try {
      const result = await Axios.get(`${process.env.REACT_APP_BaseURL}/GETHistoricoParametro`)

      if (result.data.Sucesso) {
        setHistData(result.data.HistoricoParametroObj)
      }

    } catch (erro) {
      console.log(erro)
    }
  }

  React.useEffect(() => {
    recuperarHistoricoParametro()
  }, [])

  return (

    <ThemeProvider theme={theme}>
      <div style={{
        position: 'fixed',
        top: '44%',
        border: '1px solid #000',
        borderColor: 'grey',
        borderRadius: '10px',
        width: '65%',
        height: '46%',
        zIndex: 0,
        marginLeft: '0%'

      }}
      ></div>
      <div
        style={{
          position: 'fixed',
          top: '45%',
          marginLeft: '1%',
          width: '63%',
          height: '50%'
        }}
      >

        <TableContainer sx={{ height: '87%' }}>
          <Table sx={{ minWidth: 650, height: '100px' }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((historico, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {historico.HistoricoParametroData}
                  </TableCell>
                  <TableCell align="center">
                    {historico.HistoricoParametroProduto}
                  </TableCell>
                  <TableCell align="center">
                    {historico.HistoricoParametroValor}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          size="small"
          sx={{ ml: "40%", mt: "0%", zIndex: 500 }}
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
      </div>
    </ThemeProvider>
  );
}



