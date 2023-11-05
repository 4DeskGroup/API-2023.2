import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Button,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

interface ParCreditoBotoesProps {
  selectedButton: string;
  handleButtonClick: (buttonName: string) => void;
}

export default function ParCreditoBotoes(props: ParCreditoBotoesProps) {
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
          width: isMobile ? "100%" : isTablet ? "100%" : "95%",
          height: isMobile ? "110px" : isTablet ? "100px" : "70px",
          mt:"2%"
        }}
      >
          <Grid container>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              sx={{
                fontSize: "20px",
                fontFamily: "actor",
                fontWeight: "100",
              }}
            >
              <Button
                variant={
                  props.selectedButton === "Greenneats recebidas da empresa"
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  props.handleButtonClick("Greenneats recebidas da empresa")
                }
                sx={{ width: "90%" }}
              >
                Greenneats recebidas da empresa
              </Button>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              sx={{ fontSize: "18px",fontFamily: "actor" }}
            >
              <Button
                variant={
                  props.selectedButton === "Transferir Greenneats à empresa"
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  props.handleButtonClick("Transferir Greenneats à empresa")
                }
                sx={{ width: "90%" }}
              >
                Transferir Greenneats à empresa
              </Button>
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              sx={{
                fontSize: "18px",

                fontFamily: "actor",
                fontWeight: "100",
              }}
            >
              <Button
                variant={
                  props.selectedButton === "Extrato de transferências"
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  props.handleButtonClick("Extrato de transferências")
                }
                sx={{ width: "90%" }}
              >
                Extrato de transferências
              </Button>
            </Grid>
          </Grid>
      </Box>
    </ThemeProvider>
  );
}
