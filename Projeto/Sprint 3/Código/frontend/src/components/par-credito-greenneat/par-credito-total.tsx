import * as React from "react";
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import moeda from "../images/moeda.png";
import { ListItem, useMediaQuery } from '@mui/material';
import Axios from "axios"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  color: theme.palette.text.secondary,
  border: '1px solid #4D524F',
  borderRadius: '15px',
  width: '70%',
  height: '80%'
}));

const CustomZero = styled('span')({
  fontSize: '400%',
  marginRight: '15%',
  color: '#136935'
});

export default function ParCreditoTotal() {
  const [creditosParceiro, setCreditosParceiro] = React.useState(0)
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado")

  const recuperaParceiroCredito = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado)

      try {
        const response = await Axios.get(`${process.env.REACT_APP_BaseURL}/recupera-credito-parceiro/${usuarioJson.UsuarioID}`)

        if (response.data.Sucesso) {
          setCreditosParceiro(response.data.ParceiroCredito)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  React.useEffect(() => {
    recuperaParceiroCredito()
  }, [])


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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: isMobile ? "100%" : isTablet ? "100%" : "100%",
          height: "90px",
          display: isMobile ? "contents" : isTablet ? "contents" : "flex",
          flexDirection: isMobile ? "unset" : isTablet ? "unset" : "column", // Para alinhar os itens verticalmente
          alignItems: isMobile ? "normal" : isTablet ? "normal" : "flex-end",
          ml: isMobile ? "0%" : isTablet ? "0%" : "100%",
        }}
      >
        <Grid
          lg={12} md={12} sm={12} xs={12} 
          container
          sx={{
            backgroundColor: "white",
            borderRadius: 5,
            borderColor: "gray",
            border: 1,
            width: "100%",
            height: "30px",
          }}
        >
          <Grid item lg={3} md={3} sm={3} xs={3}>
            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={3}
              sx={{
                fontSize: "22px",
                mt: "9%",
                fontFamily: "actor",
                fontWeight: "500",
                ml: "30%",
              }}
            >
              TOTAL
            </Grid>
           
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={3}
            sx={{
              fontSize: "40px",
              mt: "-1%",
              fontFamily: "poppins",
              fontWeight: "300",
              ml: "22%",
              color: "#136935",
            }}
          >
             <CustomZero>{creditosParceiro}</CustomZero>
          </Grid>
          <Grid
            item
            lg={2}
            md={3}
            sm={3}
            xs={3}
            sx={{
              fontSize: "30px",
              mt: "4%",
              fontFamily: "actor",
              fontWeight: "600",
              ml: isMobile ? "1%" : isTablet ? "1%" : "4%",
            }}
          >
            <img src={moeda} alt="png" width="60%" />
          </Grid>
        </Grid>
   
      </Box>
    </ThemeProvider>
  );}

  