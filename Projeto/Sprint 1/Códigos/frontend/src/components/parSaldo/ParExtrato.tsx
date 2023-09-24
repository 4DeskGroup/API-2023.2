import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    textAlign: 'center', // Alinha horizontalmente ao centro
    verticalAlign: 'middle', // Alinha verticalmente ao centro
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center', // Alinha horizontalmente ao centro
    verticalAlign: 'middle', // Alinha verticalmente ao centro
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  ação: string,
  data: string,
  quantidade: string,
  valor: string,
  detalhes: string,
) {
  return { ação, data, quantidade, valor, detalhes };
}

const rows = [
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
  createData('', '', '', '', ''),
];

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

export default function ParExtrato() {
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
          width: '70%',
          height: '50%'
        }}
      >

        <TableContainer component={Paper} sx={{ width: '90%' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ação</StyledTableCell>
                <StyledTableCell align="center">Data</StyledTableCell>
                <StyledTableCell align="center">Quantidade</StyledTableCell>
                <StyledTableCell align="center">Valor ($)</StyledTableCell>
                <StyledTableCell align="center">Detalhes</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.ação}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.data}</StyledTableCell>
                  <StyledTableCell align="center">{row.quantidade}</StyledTableCell>
                  <StyledTableCell align="center">{row.valor}</StyledTableCell>
                  <StyledTableCell align="center">{row.detalhes}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </ThemeProvider>
  );
}