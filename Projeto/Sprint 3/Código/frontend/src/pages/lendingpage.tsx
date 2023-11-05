import React from "react";
import { ThemeProvider, Typography, createTheme } from "@mui/material";
import Footer from "../components/reusable/Footer";
import logofolhas from "../components/images/logofolhas.png";
import lendingpageoleo from "../components/images/lendingpageoleo.png";
import TopMenu from "../components/reusable/TopMenu";

function LendingPage() {
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopMenu />
        <Footer />
        {/* BODY */}
        <div
          style={{
            marginLeft: "25%",
            width: "60%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "static",
              paddingTop: "15vh",
              width: "100%",
            }}
          >
            <Typography
              color="black"
              sx={{
                fontFamily: "actor",
                variant: "filledTonal",
                fontSize: 30,
                fontStyle: "bold",
                width: "50%",
              }}
            >
              Conheça a Greenneat
              <Typography
                color="black"
                sx={{
                  fontFamily: "poppin",
                  variant: "filledTonal",
                  fontSize: 14,
                  fontStyle: "bold",
                }}
              >
                GREENNEAT limpeza sustentável, uma linha preparada com os
                melhores compostos derivados de fontes naturais e renováveis,
                garantindo uma excelente limpeza para sua casa uma linha
                preparada com os melhores.
              </Typography>
            </Typography>

            <img
              src={logofolhas}
              loading="lazy"
              alt=""
              style={{
                position: "static",
                paddingLeft: "3vh",
                width: "30%",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "static",
              width: "100%",
            }}
          >
            <img
              src={lendingpageoleo}
              loading="lazy"
              alt=""
              style={{
                position: "static",
                marginLeft: "2%",
                width: "40%",
              }}
            />

            <Typography
              color="black"
              sx={{
                fontFamily: "actor",
                variant: "filledTonal",
                fontSize: 30,
                fontStyle: "bold",
                paddingLeft: "5vh",
                width: "40%",
              }}
            >
              Coleta de Óleo
              <Typography
                color="black"
                sx={{
                  fontFamily: "poppins",
                  variant: "filledTonal",
                  fontSize: 14,
                  fontStyle: "bold",
                }}
              >
                renováveis, garantindo uma excelente limpeza para sua casa.
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LendingPage;
