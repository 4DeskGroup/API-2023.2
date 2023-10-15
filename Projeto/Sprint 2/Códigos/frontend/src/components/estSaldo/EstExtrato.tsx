import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useMediaQuery } from '@mui/material';


interface HistoricoData {
  data_transacao: string;
  quantidade_creditos: number;
  nome_fantasia: string;
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

export default function EstExtrato() {
  const [histData, setHistData] = React.useState<HistoricoData[]>([]);
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado");

  const recuperarHistoricoOleo = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado);

      try {
        const response = await axios.get(
          `http://localhost:3001/GETEstabelecimentoEmpresaExtrato/${usuarioJson.UsuarioID}`
        );

        const estabelecimentoEmpresaExtratoArray = JSON.parse(
          response.data.EstabelecimentoEmpresaExtrato
        );

        if (Array.isArray(estabelecimentoEmpresaExtratoArray)) {
          setHistData(estabelecimentoEmpresaExtratoArray);
        } else {
          console.log("estabelecimentoEmpresaExtratoArray não é um array ou está vazio.");
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
       
     <TableContainer sx={{height:'87%'}}>
          <Table sx={{ minWidth: 650, height:'100px' }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Data da Transação</TableCell>
                <TableCell align="center">Quantidade de Créditos</TableCell>
                <TableCell align="center">Nome da Empresa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histData.map((historico, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {historico.data_transacao}
                  </TableCell>
                  <TableCell align="center">
                    {historico.quantidade_creditos}
                  </TableCell>
                  <TableCell align="center">
                    {historico.nome_fantasia}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
      </div>
    </ThemeProvider>
  );
}



