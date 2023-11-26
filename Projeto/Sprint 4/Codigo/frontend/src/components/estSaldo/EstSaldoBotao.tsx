import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EstTransacao from './EstTransacao';
import EstExtrato from './EstExtrato';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EstSaldoBotao() {

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

  const [selectedButton, setSelectedButton] = React.useState("Transação");

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>

<div
    style={{
      position: 'fixed',
      top: '40%',
      width: '100%',
    }}
  >
    <Box sx={{ width: 'auto', marginLeft: '26%', marginTop: '-2%' }}>
      <Stack spacing={2} direction="row">

        {/*BOTÃO TRANSAÇÃO*/}
        <Button
          // color="primary" // Cor do botão selecionado
          variant={selectedButton === "Transação" ? "contained" : "outlined"}
          onClick={() => handleButtonClick("Transação")}
        >
          Comprar
        </Button>

        {/*BOTÃO EXTRATO*/}
        <Button
          variant={selectedButton === "Extrato" ? "contained" : "outlined"}
          // color="secondary" // Cor do botão selecionado
          onClick={() => handleButtonClick("Extrato")}
        >
          Histórico de Compra
        </Button>
        {selectedButton === "Transação" ? <EstTransacao /> : null}
        {selectedButton === "Extrato" ? <EstExtrato /> : null}
      </Stack>
    </Box>
    </div>
    </ThemeProvider>
  );
}

