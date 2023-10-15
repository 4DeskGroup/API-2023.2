import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Card, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import img1 from "../images/oleo-limpo-branco.png"
import img2 from "../images/oleo-usado-branco.png"
import img3 from "../images/oleo-usado-verde.png"
import img4 from "../images/oleo-limpo-verde.png"

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import  Axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";
export default function EstEstoqueCadastro() {
  const [count1, setCount1] = React.useState(1);
  const [count2, setCount2] = React.useState(1);
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
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC

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

  const LimpaCampos = ()=>{
    setIsSelected2(false)
    setIsSelected(false)
    setCount1(0)
  }

  const ValidaCampos = ()=>{
    if (count1 === 0 ){
      return {IsSucesso: false, msg:'Quantidade não pode ser zero.'}
    }
    if(!isSelected && !isSelected2){
      return {IsSucesso: false, msg:'Selecione um tipo de Óleo.'}
    }
    return {IsSucesso: true, msg:'Correto'}
  }

const usuarioLogadoJson: any = sessionStorage.getItem("UsuarioLogado")
const usuarioJson = JSON.parse(usuarioLogadoJson);

const CadastrarEstoque = async () => {

  const returnValidaCampos = ValidaCampos()
  if(returnValidaCampos.IsSucesso){
  // Cria um array para armazenar os objetos EstabelecimentoEstoque
  const estabelecimentoEstoqueArray = [];
console.log('estadoSelecionado:  '+estadoSelecionado);

  // Verifica se é óleo limpo e adiciona ao array
  if (estadoSelecionado === 'limpo') {
    const estabelecimentoEstoqueLimpo = {
      estabelecimentoestoqueprodutodescricao: 'Óleo Limpo',
      estabelecimentoestoqueprodutoquantidade: count1,
      estabelecimentoestoquetipo: 'limpo',
    };
    estabelecimentoEstoqueArray.push(estabelecimentoEstoqueLimpo);
  }else{
    const estabelecimentoEstoqueLimpo = {
      estabelecimentoestoqueprodutodescricao: 'Óleo Limpo',
      estabelecimentoestoquprodutoquantidade: 0,
      estabelecimentoestoquetipo: 'limpo',
    };
    estabelecimentoEstoqueArray.push(estabelecimentoEstoqueLimpo);
  }

  // Verifica se é óleo usado e adiciona ao array
  if (estadoSelecionado === 'usado') {
    const estabelecimentoEstoqueUsado = {
      estabelecimentoestoqueprodutodescricao: 'Óleo Usado',
      estabelecimentoestoqueprodutoquantidade: count1,
      estabelecimentoestoquetipo: 'usado',
    };
    estabelecimentoEstoqueArray.push(estabelecimentoEstoqueUsado);
  }else{
    const estabelecimentoEstoqueUsado = {
      estabelecimentoestoqueprodutodescricao: 'Óleo Usado',
      estabelecimentoestoqueprodutoquantidade: 0,
      estabelecimentoestoquetipo: 'usado',
    };
    estabelecimentoEstoqueArray.push(estabelecimentoEstoqueUsado);
  }

  // Envie o array para o servidor
  const response = await Axios.post("http://localhost:3001/POSTEstabelecimentoEstoque", {
    usuarioID: usuarioJson.UsuarioID,
    estabelecimentoEstoqueJson: sessionStorage.getItem('estabelecimentoEstoque'),
    EstabelecimentoEstoque: JSON.stringify(estabelecimentoEstoqueArray),
  }).then((response)=>{
    if(response.data.isSucesso = true){
      LimpaCampos()
      MyToast.fire({
        title:'Sucesso',
        icon: 'success',
        text:'Quantidade de óleo esta inserida com sucesso.'
      }).then(()=>{
        window.location.reload()
      })
    }
  })
}else{
  MyToast.fire({
    title:'Erro',
    icon: 'warning',
    text: returnValidaCampos.msg
  })
}
};

  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: isMobile ? "110%" : isTablet ? "95%" : "96%",
        backgroundColor: "white",
        height: isMobile ? "700px" : isTablet ? "700px" : "330px",
        borderRadius: 5,
        borderColor: "gray",
        border: 1,
      }}
    >
      <Grid container sx={{ fontFamily: "actor" }}>
        <Grid lg={5} md={6} sm={12} xs={12} sx={{ fontFamily: "actor", ml:'5%' }}>
          <Grid display="flex" sx={{ ml: "10%", mt: "7%" }}>
            <Grid sx={{ ml: "2%", mt: "0.5%" }}>
              <ArrowForwardIcon
                sx={{
                  color: "#136935",
                }}
              />
            </Grid>
            <Grid sx={{ ml: "2%", fontSize: "22px" }}>
              Adicionar óleo ao estoque:
            </Grid>
          </Grid>
          <Grid sx={{ fontSize: "62px", fontFamily: "poppins" }}>
            <Box
              display="flex"
              sx={{
                width: isMobile ? "200px" : isTablet ? "300px" : "300px",
                border: 1,
                borderColor: "gray",
                borderRadius: 5,
                height: "100px",
                mt: "10%",
                ml: "8%",
              }}
            >
              <Grid>
                <Button
                  sx={{ fontSize: "38px", fontFamily: "poppins", ml:isMobile ? "20%": isTablet ? "49%" : "49%" }} aria-label="reduce"
                  onClick={() => {
                    setCount1(Math.max(count1 - 1, 0));
                  }}
                >
                   <RemoveIcon fontSize="small" />
                </Button>
              </Grid>
              <Grid sx={{ ml: isMobile ? "5%": isTablet ? "20%" : "20%", fontWeight:'200' }}>{count1}</Grid>
              <Grid>
                <Button
                  sx={{ fontSize: "38px", fontFamily: "poppins", ml: isMobile ? "10%": isTablet ? "45%" : "45%" }}
                  aria-label="increase"
                  onClick={() => {
                    setCount1(count1 + 1);
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid lg={6} container sx={{ mt:'3%', ml:'1%' }} >
            <Grid lg={4} md={6} sm={12} xs={12} sx={{ml:'4%' }}  onClick={handleCardClick} >
                <img src={isSelected ? img4 : img1} width='150px' style={{cursor:'pointer'}}/>
            </Grid>
            <Grid lg={3} md={6} sm={12} xs={12} onClick={handleCardClick2}   >
                <img src={isSelected2 ? img3 : img2} width='150px' style={{cursor:'pointer'}}/>
            </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{height: isMobile ? "150px" : isTablet ? "220px" : '25%', mt:isMobile ? "3px" : isTablet ? "3px" :'2%'}}>
        <Grid item lg={5} md={5} sm={12} xs={12} sx={{fontSize: "18px", mt: '3%', fontFamily: 'actor', fontWeight:'100'}}>
          <Button variant="outlined" sx={{outlineColor: "#136935", color:'#136935',  width:isMobile ? "200px" : isTablet ? "300px" : '300px', height: '50px', ml:isMobile ? "0px" : isTablet ? "0px" :'20%', mt:'-5%'}}>limpar</Button>
        </Grid>
        <Grid item lg={5} md={5} sm={12} xs={12} sx={{fontSize: "18px", mt: '3%', fontFamily: 'actor'}}>
        <Button variant="contained" onClick={CadastrarEstoque} sx={{backgroundColor: "#136935", width: isMobile ? "200px" : isTablet ? "300px" : '300px', height: '50px', ml:isMobile ? "0px" : isTablet ? "0px" :'23%', mt:isMobile ? "-50px" : isTablet ? "-50px" :'-5%', color: 'white' }}>Cadastrar óleo</Button>
        </Grid>
      </Grid>
    </Box>
    </ThemeProvider>
  );
}
