import * as React from 'react';
import { Grid, Button, Paper, InputBase, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TabelaEstabelecimento from './tabela-estabelecimento';
import Tabela from './tabela';

const TransBotao = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#136935',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
  });

  const [selectedButton, setSelectedButton] = React.useState('Parceiro');

  const handleButtonClick = (buttonName:React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={10}>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item justifyContent="left" alignItems="flex-start">
              <Button
                variant={selectedButton === 'Parceiro' ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick('Parceiro')}
              >
                Parceiro
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={selectedButton === 'Estabelecimento' ? 'contained' : 'outlined'}
                onClick={() => handleButtonClick('Estabelecimento')}
              >
                Estabelecimento
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Aqui, a tabela renderiza com base no botão selecionado */}
      {selectedButton === 'Parceiro' && (
        <Tabela />
      )}
      {selectedButton === 'Estabelecimento' && (
        <TabelaEstabelecimento />
      )}
    </ThemeProvider>
  );
};

export default TransBotao;