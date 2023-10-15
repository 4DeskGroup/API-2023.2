import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ParTransacao from './ParTransacao';
import ParExtrato from './ParExtrato';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ParSaldoBotao() {

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

    <div
    style={{
      position: 'fixed',
      top: '33%',
      width: '100%',
    }}
    >
    <ThemeProvider theme={theme}>
    <Box sx={{ width: 'auto', marginLeft: '26%', marginTop: '-2%' }}>
      <Stack spacing={2} direction="row">

        {/*BOTÃO TRANSAÇÃO*/}
        <Button
          variant={selectedButton === "Transação" ? "contained" : "outlined"}
          onClick={() => handleButtonClick("Transação")}
        >
          Transação
        </Button>
        
        {/*BOTÃO EXTRATO*/}
        <Button
          variant={selectedButton === "Extrato" ? "contained" : "outlined"}
          onClick={() => handleButtonClick("Extrato")}
        >
          Extrato
        </Button>
        {selectedButton === "Transação" ? <ParTransacao /> : null}
        {selectedButton === "Extrato" ? <ParExtrato /> : null}
      </Stack>
    </Box>
    </ThemeProvider>
    </div>
  );
}
