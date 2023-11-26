import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  createTheme,
  useMediaQuery,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import limpo from "../images/limpo.png";
import usado from "../images/usado.png";
import Axios from "axios"
import { log } from "console";
import { Container } from "@mui/joy";

export default function AdmEstoqueQuantidade() {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#136935",
  //     },
  //     secondary: {
  //       main: "#FFFFFF",
  //     },
  //   },
  // });

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

  const [quantidadeUsado, setQuantidadeUsado] = React.useState(0)
  const [quantidadeLimpo, setQuantidadeLimpo] = React.useState(0)

  const usuarioLogado = sessionStorage.getItem("UsuarioLogado")

  const recuperaEmpresaCredito = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado);
  
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BaseURL}/GETListaEmpresaEstoque/${usuarioJson.UsuarioID}`
        );
        const EmpresaEstoqueArray = JSON.parse(response.data.EmpresaEstoque);
            
        
        if (Array.isArray(EmpresaEstoqueArray)) {
          EmpresaEstoqueArray.forEach((EmpresaEstoque) => {
            const tipoOleo = EmpresaEstoque.EmpresaEstoqueTipo;
            const EmpresaestoqueProdutoQuantidade = EmpresaEstoque.EmpresaEstoqueProdutoQuantidade;
          
            if (tipoOleo === 'limpo') {
              setQuantidadeLimpo(EmpresaestoqueProdutoQuantidade);
            }
          
            if (tipoOleo === 'usado') {
              setQuantidadeUsado(EmpresaestoqueProdutoQuantidade);
            }
          });
        } else {
          console.log('Empresa não é um array ou está vazio.');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  React.useEffect(() => {
    recuperaEmpresaCredito()
  }, []);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: isMobile ? "30%" : isTablet ? "30%" : "30%",
          height: "150px",
          display: isMobile ? "contents" : isTablet ? "contents" : "flex",
          flexDirection: isMobile ? "unset" : isTablet ? "unset" : "column", // Para alinhar os itens verticalmente
          alignItems: isMobile ? "normal" : isTablet ? "normal" : "flex-end",
          ml: isMobile ? "0%" : isTablet ? "0%" : "61%",
          mt: -15
        }}
      >
        <Grid
          lg={9}
          md={12}
          sm={12}
          xs={12}
          xl={9}
          container
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            borderColor: "gray",
            border: 1,
            width: "60%",
            height: "40%",
          }}
        >
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={3}
              xl={3}
              sx={{
                fontSize: "22px",
                mt: "9%",
                fontFamily: "actor",
                fontWeight: "500",
                ml: "40%",
              }}
            >
              LIMPO
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={3}
              xl={3}
              sx={{
                fontSize: "10px",
                mt: "-13%",
                mb: "5%",
                fontFamily: "actor",
                fontWeight: "500",
                ml: "70%",
              }}
            >
              Litros
            </Grid>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={3}
            xl={3}
            sx={{
              fontSize: "40px",
              mt: "-1%",
              fontFamily: "poppins",
              fontWeight: "300",
              ml: "22%",
              color: "#136935",
            }}
          >
             {quantidadeLimpo}
          </Grid>
          <Grid
            item
            lg={2}
            md={3}
            sm={3}
            xs={3}
            xl={2}
            sx={{
              fontSize: "30px",
              mt: "4%",
              fontFamily: "actor",
              fontWeight: "600",
              ml: isMobile ? "1%" : isTablet ? "1%" : "4%",
            }}
          >
            <img src={limpo} alt="png" width="60%" />
          </Grid>
        </Grid>
        <Grid
          lg={9}
          md={12}
          sm={12}
          xs={12}
          xl={9}
          container
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            borderColor: "gray",
            border: 1,
            width: "60%",
            height: "40%",
            mt: "5%",
          }}
        >
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={3}
              xl={3}
              sx={{
                fontSize: "22px",
                mt: "9%",
                fontFamily: "actor",
                fontWeight: "500",
                ml: "40%",
              }}
            >
              USADO
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={3}
              xl={3}
              sx={{
                fontSize: "10px",
                mt: "-13%",
                mb: "5%",
                fontFamily: "actor",
                fontWeight: "500",
                ml: "70%",
              }}
            >
              Litros
            </Grid>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={3}
            xl={3}
            sx={{
              fontSize: "40px",
              mt: "-1%",
              fontFamily: "poppins",
              fontWeight: "300",
              ml: "22%",
              color: "#136935",
            }}
          >
            {quantidadeUsado}
          </Grid>
          <Grid
            item
            lg={2}
            md={3}
            sm={3}
            xs={3}
            xl={2}
            sx={{
              fontSize: "30px",
              mt: "4%",
              fontFamily: "actor",
              fontWeight: "600",
              ml: isMobile ? "0%" : isTablet ? "0%" : "4%",
            }}
          >
            <img src={usado} alt="png" width="60%" />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
