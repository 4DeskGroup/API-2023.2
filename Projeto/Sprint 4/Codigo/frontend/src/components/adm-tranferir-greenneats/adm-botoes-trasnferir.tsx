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

export default function AdmTransferirBotoes(props: ParCreditoBotoesProps) {
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
          width: isMobile ? "100%" : isTablet ? "100%" : "97%",
          height: isMobile ? "110px" : isTablet ? "100px" : "70px",
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
                mt: '0%'
              }}
            >
              <Button
                variant={
                  props.selectedButton === "Transferir Greenneats"
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  props.handleButtonClick("Transferir Greenneats")
                }
                sx={{ width: "280px" }}
              >
                Transferir Greenneats
              </Button>
            </Grid>

            <Grid
              item
              lg={4}
              md={6}
              sm={12}
              xs={12}
              sx={{ fontSize: "18px",fontFamily: "actor", mt: '0%'}}
            >
              <Button
                variant={
                  props.selectedButton === "Transferir Greenneats por óleo"
                    ? "contained"
                    : "outlined"
                }
                onClick={() =>
                  props.handleButtonClick("Transferir Greenneats por óleo")
                }
                sx={{ width: "290px" }}
              >
                Transferir Greenneats por óleo
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
                mt: '0%'
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
                sx={{ width: "280px" }}
              >
                Extrato de transferências
              </Button>
            </Grid>
          </Grid>
      </Box>
    </ThemeProvider>
  );
}
