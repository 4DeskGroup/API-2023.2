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

export default function AdmValorOleo(props: ParCreditoBotoesProps) {
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
  const [selectedButton, setSelectedButton] = React.useState("Definir valor do óleo");

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: isMobile ? "100%" : isTablet ? "95%" : "72%",
          height: isMobile ? "110px" : isTablet ? "100px" : "70px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={3} lg={4} xl={4}></Grid>
          <Grid
            item
            lg={3}
            md={5}
            sm={12}
            xs={12}
            sx={{
              fontSize: "18px",
              fontFamily: "actor",
              fontWeight: "100",
              mt: 12,
              ml: -70
            }}
          >
            <Button
              variant={
                props.selectedButton === "Definir valor do óleo"
                  ? "contained"
                  : "outlined"
                // "contained"
              }
              onClick={() =>
                props.handleButtonClick("Definir valor do óleo")
              }
              sx={{ width: "240px" }}
            >
              Definir valor do óleo
            </Button>
          </Grid>

          <Grid
            item
            lg={3}
            md={5}
            sm={12}
            xs={12}
            sx={{
              fontSize: "18px",
              fontFamily: "actor",
              fontWeight: "100",
              mt: 12,
              ml: 25
            }}
          >
            <Button
              variant={
                props.selectedButton === "Histórico"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                props.handleButtonClick("Histórico")
              }
              sx={{ width: "240px" }}
            >
              Histórico
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
