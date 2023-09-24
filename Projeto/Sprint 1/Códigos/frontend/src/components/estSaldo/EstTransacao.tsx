import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import limpo from "../images/limpo.png";
import usado from "../images/usado.png";
import { Stack } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function EstTransacao() {

  const [selectedButton, setSelectedButton] = React.useState("Transação");

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  const [selectedGroup1, setSelectedGroup1] = useState(""); // Para o grupo "Usado" e "Limpo"

  const handleGroup1ButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedGroup1(buttonName);
  };

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

  const [count1, setCount1] = React.useState(1);
  const [count2, setCount2] = React.useState(1);

  return (
    <ThemeProvider theme={theme}>
      <div style={{
       position: 'fixed',
       top: '44%',
       border: '1px solid #000',
       borderColor: 'grey',
       borderRadius: '10px',
       width: '65%',
       height: '45%',
       zIndex: 0,
       marginLeft: '0%'

      }}
      ></div>

      
      <div
        style={{
          position: 'fixed',
          top: '46%',
          marginLeft: '2%',
        }}
      >
        <ListItem disablePadding>
          <ListItemIcon>
            <ArrowForwardIcon sx={{
              color: '#136935'
            }} />
          </ListItemIcon>
          <Typography variant="h5">Transferir Greenneats</Typography>
        </ListItem>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '52%',
          width: '58%',
          marginLeft: '2%',
        }}
      >
        <TextField
          size='small'
          sx={{
            width: '100%'
          }}
          id='nomeEst'
          label="Empresa que deseja transferir"
        />
      </div>



      <div
        style={{
          position: 'fixed',
          top: '58%',
          width: '65%',
        }}
      >
        <ListItemText inset primary="Defina a quantidade de greenneats que deseja tranferir:" 
        sx={{marginLeft: '-5%'}} />

      </div>

      <div style={{
        position: 'fixed',
        top: '66%',
        border: '1px solid #000',
        borderColor: 'grey',
        borderRadius: '10px',
        marginLeft: '27%'

      }}>
        <Button
          aria-label="reduce"
          onClick={() => {
            setCount1(Math.max(count1 - 1, 0));
          }}
        >
          <RemoveIcon fontSize="small" />
        </Button>

        {/* NÚMERO CONTAGEM */}
        <Badge color="secondary">
          <span style={{ fontSize: '24px' }}>{count1}</span>
        </Badge>

        {/* BOTÃO + */}
        <Button
          aria-label="increase"
          onClick={() => {
            setCount1(count1 + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </Button>

        {/* TEXTO */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '70%', marginLeft: '2%', marginTop: '5%' }}>greenneats</div>
        </div>
      </div>
      {/* </Grid> */}




      <div style={{
        position: 'fixed',
        alignItems:'center',
        top: '78%',
        marginLeft: '23%',

      }}>
      {/* BOTÕES DE BAIXO */}

        <ThemeProvider theme={theme}>
            <Stack spacing={3} direction="row">

              {/*BOTÃO CANCELAR*/}
              <Button
                variant={selectedButton === "Extrato" ? "contained" : "outlined"}
                onClick={() => handleButtonClick("Extrato")}
              >
                cancelar
              </Button>

              <Box sx={{ width: '15%' }} />

              {/*BOTÃO TRANSFERIR*/}
              <Button
                variant={selectedButton === "Transação" ? "contained" : "outlined"}
                onClick={() => handleButtonClick("Transação")}
              >
                transferir
              </Button>
            </Stack>

        </ThemeProvider>

</div>


    </ThemeProvider >
  );
}



