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
import Axios from "axios"
import { MyToast } from '../Alerts/swal-mixin';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function ParEmpTransacao() {
  // const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [selectedButton, setSelectedButton] = React.useState("Transação");
  const [estabelecimentos, setEstabelecimentos] = React.useState<{ EstabelecimentoNomeFantasia: string }[]>([]);
  const [selectedEstabelecimento, setSelectedEstabelecimento] = React.useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = React.useState(0)


  const [selectedGroup1, setSelectedGroup1] = React.useState("");

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
  const [selectedEmpresa, setSelectedEmpresa] = React.useState(null); // Estado para armazenar a empresa selecionada
  const [IsPossible, setIsPossible] = React.useState(false);
  const [isSelected, setIsSelected] = React.useState(false);
  const [isSelected2, setIsSelected2] = React.useState(false);
  const [estadoSelecionado, setEstadoSelecionado] = React.useState('');

  const handleCardClick = () => {
    setIsSelected(!isSelected);
    setIsSelected2(false);
    setEstadoSelecionado('limpo');  // Always set to 'limpo' for the first item
  };

  const handleCardClick2 = () => {
    setIsSelected2(!isSelected2);
    setIsSelected(false);
    setEstadoSelecionado('usado');  // Always set to 'usado' for the second item
  };

  const handleEmpresaChange = (event: any, newValue: any) => {
    setSelectedEmpresa(newValue); // Atualiza a empresa selecionada
  };

  const POSTParceiroEmpresa = async () => {
    // Verifica se uma empresa foi selecionada
    const usuarioLogadoJson: any = sessionStorage.getItem("UsuarioLogado");
    const usuarioJson = JSON.parse(usuarioLogadoJson);

    if (!selectedEmpresa) {
      MyToast.fire({
        title: 'Selecione uma empresa.',
        icon: 'warning',
      })
      return;
    }

    if (count1===0) {
      MyToast.fire({
        title: 'Quantidade não pode ser zero.',
        icon: 'warning',
      })
      return;
    }

    if (!estadoSelecionado) {
      MyToast.fire({
        title: 'Selecione um tipo de óleo.',
        icon: 'warning',
      })
      return;
    }

    const HistoricoParceiroEmpresa = {
      ProdutoQuantidade: count1,
      CreditoQuantidade: count1,
      ProdutoDescricao: 'Óleo ' + estadoSelecionado,
      Descricao:'Transação entre a empresa Grenneat.',
      Data: new Date().toLocaleString()
    }

    const response = await Axios.post("http://localhost:3001/POSTParceiroEmpresa", {
      usuarioID: usuarioJson.UsuarioID,
      empresanome: selectedEmpresa,
      ParceiroEstoqueTipo: estadoSelecionado,
      HistoricoParceiroEmpresa: HistoricoParceiroEmpresa,
    }).then((response) => {
      console.log(response.data.isSucesso);

      if (response.data.isSucesso === true) {
        // LimpaCampos()
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

  const empresas = [
    { label: "Greenneat" }
  ]

  return (

    <ThemeProvider theme={theme}>
      <div style={{
        position: 'fixed',
        top: '44%',
        border: '1px solid #000',
        borderColor: 'grey',
        borderRadius: '10px',
        width: '65%',
        height: '48%',
        zIndex: 0,
        marginLeft: '0%'
      }}>

      </div>


      <div
        style={{
          position: 'fixed',
          top: '46%',
          // width: '100%',
          // zIndex: 1000,
          marginLeft: "2%"
        }}
      >

        {/* TEXTO */}
        <Box sx={{ flexGrow: 1, marginLeft: '0%', marginTop: '0%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={10}>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <ArrowForwardIcon sx={{
                      color: '#136935'
                    }} />
                  </ListItemIcon>
                  <Typography variant="h5">Transferir Óleo</Typography>
                </ListItem>
              </List>

              {/* SELECIONAR O ESTABELECIMENTO JÁ EXISTENTE*/}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={empresas}
                value={selectedEmpresa}
                onChange={handleEmpresaChange} // Associa a função de atualização
                sx={{ width: 900 }}
                renderInput={(params) => <TextField {...params} label="Empresa que deseja transferir" />}
              />
            </Grid>
            {/* DEFINIÇÃO DE LITROS */}
            <Grid item xs={6} md={5}>
              {/* TEXTO */}
              <List
                sx={{
                  marginLeft: '-12%'
                }}
              >
                <ListItem disablePadding>
                  <ListItemText inset primary="Selecione o tipo de óleo e quantidade:" />
                </ListItem>
              </List>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Contêiner para os botões 'usado' e 'limpo' */}
                <div id='containerBotoes' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '45%' }}>
                  {/* BOTÃO ÓLEO LIMPO */}
                  <div
                    style={{
                      marginLeft: '10%',
                      width: '30%'
                    }}>
                    <Button
                      sx={{
                        height: '100px',
                        borderRadius: '20px',
                        backgroundColor: selectedGroup1 === 'limpo' ? '#YourSelectedColor' : 'transparent'
                      }}
                      variant="contained"
                      onClick={() => {
                        handleCardClick()
                        handleGroup1ButtonClick("limpo")
                      }}
                    >
                      <img src={limpo} alt="png" style={{ marginRight: 'auto', marginLeft: 'auto', width: '100%' }} />
                    </Button>
                    {/* TEXTO */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ fontSize: '70%', marginLeft: '2%', marginTop: '5%' }}>limpo</div>
                    </div>
                  </div>

                  {/* BOTÃO ÓLEO USADO */}
                  <div
                    style={{
                      marginRight: '15%',
                      width: '30%'
                    }}>
                    <Button
                      sx={{
                        height: '100px',
                        borderRadius: '20px',
                        backgroundColor: selectedGroup1 === 'usado' ? '#YourSelectedColor' : 'transparent'
                      }}
                      variant="contained"
                      onClick={() => {
                        handleCardClick2()
                        handleGroup1ButtonClick("usado")
                      }}
                    >
                      <img src={usado} alt="png" style={{ marginRight: 'auto', marginLeft: 'auto', width: '100%' }} />
                    </Button>
                    {/* TEXTO */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <div style={{ fontSize: '70%', marginLeft: '2%', marginTop: '5%' }}>usado</div>
                    </div>
                  </div>
                </div>
                <div style={{ border: '1px solid #000', borderColor: 'grey', padding: '1px', borderRadius: '10px', width: '33%', height: '80px', marginLeft: '12%', marginTop: '3%' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '6%' }}>
                    {/* BOTÃO - */}
                    <Button id='button1'
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
                    <Button id='button2'
                      aria-label="increase"
                      onClick={() => {
                        setCount1(count1 + 1);
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </Button>
                  </div>
                  {/* TEXTO */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ fontSize: '70%', marginLeft: '2%', marginTop: '2%' }}>litros</div>
                  </div>
                </div>
              </div>
            </Grid>
            {/* DEFINIÇÃO DE QUANTIDADE */}
            <Grid item xs={6} md={5}>
              <List
                sx={{
                  marginLeft: '12%'
                }}>
                <ListItem disablePadding>
                  <ListItemText inset primary="Quantidade de greenneats:" />
                </ListItem>
              </List>

              {/* Div 'maisemenos' */}
              <div id='maisemenos' style={{ marginLeft: '35%', border: '1px solid #000', borderColor: 'grey', padding: '1px', borderRadius: '10px', width: '33%', height: '80px', marginTop: '5%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '7%' }}>


                  {/* NÚMERO CONTAGEM */}
                  <Badge color="secondary">
                    <span style={{ fontSize: '24px' }}>{count1}</span>
                  </Badge>


                </div>

                {/* TEXTO */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ fontSize: '70%', marginLeft: '2%' }}>greenneats</div>
                </div>
              </div>
            </Grid>




            {/* BOTÕES DE BAIXO */}
            <Grid item xs={6} md={10}>
              <ThemeProvider theme={theme}>
                <Box sx={{ width: 'auto', marginTop: '1.5%' }}>
                  <Stack spacing={3} direction="row">

                    {/*BOTÃO CANCELAR*/}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginLeft: '35%'
                      }}>
                      <Button
                        variant={selectedButton === "cancelar" ? "contained" : "outlined"}
                      // onClick={() => handleButtonClick("cancelar")}
                      >
                        cancelar
                      </Button>

                      <Box sx={{ width: '15%' }} />

                      {/*BOTÃO TRANSFERIR*/}
                      <Button
                        onClick={POSTParceiroEmpresa}
                        disabled={IsPossible}
                        variant={selectedButton === "transferir" ? "contained" : "outlined"}
                      // onClick={() => handleButtonClick("transferir")}
                      >
                        transferir
                      </Button>
                    </div>
                  </Stack>
                </Box>
              </ThemeProvider>
            </Grid>

          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
