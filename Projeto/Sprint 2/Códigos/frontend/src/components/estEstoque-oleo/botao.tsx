import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import boximg from "../images/boxes.png";
import EstEstoqueCadastro from "./cadastro";
import EstEstoqueHistorico from "./historico";
interface EstEstoqueBotaoProps {
  selectedButton: string;
  handleButtonClick: (buttonName: string) => void;
}

export default function EstEstoqueBotao(props: EstEstoqueBotaoProps){
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
  const [selectedButton, setSelectedButton] = React.useState("Transação");

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: isMobile ? "100%" : isTablet ? "100%" : "100%",
          height: isMobile ? "110px" : isTablet ? "100px" : "70px",
        }}
      >
        <Grid container>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              fontSize: "18px",
              mt: "3%",
              fontFamily: "actor",
              fontWeight: "100",
            }}
          >
            <Button
              variant={props.selectedButton === "Transação" ? "contained" : "outlined"}
              onClick={() => props.handleButtonClick("Transação")}
              sx={{ width: "200px" }}
            >
              cadastrar óleo
            </Button>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{ fontSize: "18px", mt: "3%", fontFamily: "actor" }}
          >
            <Button
              variant={props.selectedButton === "Extrato" ? "contained" : "outlined"}
              onClick={() => props.handleButtonClick("Extrato")}
              sx={{ width: "200px" }}
            >
              histórico de óleo
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}