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
import { Autocomplete, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from 'react';
import Axios from 'axios';
import { PostAddTwoTone } from '@mui/icons-material';
import { MyToast } from '../Alerts/swal-mixin';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface Parceiro {
  parceiroNomefantasia: string;
}

export default function AdmTransfGreenneatsTransferir() {


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

  const [count1, setCount1] = React.useState(1);
  const [parceiros, setParceiros] = React.useState<Parceiro[]>([]);
  const [selectedParceiro, setSelectedParceiro] = React.useState<Parceiro | null>(null);

  const handleEstabelecimentoChange = (
    event: React.ChangeEvent<{}>,
    newValue: Parceiro | null
  ) => {
    setSelectedParceiro(newValue);
  };

  const listaParceiros = async () => {
    const response = await Axios.get("http://localhost:3001/GETListaParceiroNomes");

    if (response.data.ParceiroNomes) {
      const parceiroNomes = JSON.parse(response.data.ParceiroNomes);
      setParceiros(parceiroNomes);

      console.log(parceiroNomes);

    }
  };

  React.useEffect(() => {
    listaParceiros();
  }, []);

  const [IsPossible, setIsPossible] = useState(false);

  const usuarioLogadoJson: any = sessionStorage.getItem("UsuarioLogado");
  const usuarioJson = JSON.parse(usuarioLogadoJson);

  const POSTTransacaoEstabelecimentoEmpresa = async () => {
    if (!selectedParceiro) {
      MyToast.fire({
        title: 'Selecione um parceiro.',
        icon: 'warning',
      })
      return;
    }
    if (count1 === 0) {
      MyToast.fire({
        title: 'Quantidade não pode ser zero.',
        icon: 'warning',
      })
      return;
    }

    const HistoricoParceiroEmpresa = {
      CreditoQuantidade: count1,
      Descricao: 'Transação entre a empresa com o parceiro..',
      TipoTransacao: 'EmpresaEnviaMoeda',
      Data: new Date().toLocaleString()
    }
    
    await Axios.post(`${process.env.REACT_APP_BaseURL}/POSTEmpresaEnviarMoedaParceiro`, {
      usuarioID: usuarioJson.UsuarioID,
      parceironome: selectedParceiro,
      HistoricoParceiroEmpresa: HistoricoParceiroEmpresa,
    }).then((response) => {
      if (response.data.isSucesso === true) {
        setIsPossible(true)
        MyToast.fire({
          title: 'Transação efetuada com sucesso.',
          icon: 'success',
        }).then(() => {
          window.location.reload()
        })
      } else {
        setIsPossible(true)
        MyToast.fire({
          title: response.data.msg,
          icon: 'warning',
        }).then(() => {
          window.location.reload()
        })
      }
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        position: 'fixed',
        top: '40%',
        border: '1px solid #000',
        borderColor: 'grey',
        borderRadius: '10px',
        width: '65%',
        height: '50%',
        zIndex: 0,
        marginLeft: '0%'

      }}
      ></div>


      <div
        style={{
          position: 'fixed',
          top: '42%',
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
          top: '49%',
          width: '60%',
          marginLeft: '2%',
          zIndex: '100'
        }}
      >
        {/* <TextField
          size='small'
          sx={{
            width: '100%'
          }}
          id='nomeEst'
          label="Empresa que deseja transferir"
        /> */}

        {/* SELECIONAR A EMPRESA JÁ EXISTENTE*/}
        <Autocomplete
          id="combo-box-demo"
          options={parceiros} // Certifique-se de que as opções estão corretas
          getOptionLabel={(option) => option.parceiroNomefantasia} // Use a propriedade correta
          value={selectedParceiro}
          onChange={handleEstabelecimentoChange}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Parceiro que deseja transferir" />}
        />




      </div>



      <div
        style={{
          position: 'fixed',
          top: '59%',
          width: '65%',
          marginLeft: '2%'
        }}
      >
        <ListItemText inset primary="Defina a quantidade de greenneats que deseja tranferir:"
          sx={{ marginLeft: '-5%' }} />

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
        alignItems: 'center',
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
              onClick={POSTTransacaoEstabelecimentoEmpresa}
              disabled={IsPossible}
            >
              transferir
            </Button>
          </Stack>

        </ThemeProvider>

      </div>


    </ThemeProvider >
  );
}



