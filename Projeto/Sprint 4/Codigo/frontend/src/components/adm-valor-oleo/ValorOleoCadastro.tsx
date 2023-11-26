import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import limpo from "../images/limpo.png";
import usado from "../images/usado.png";
import { Autocomplete, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ValorOleoCadastro() {
  const [selectedButton, setSelectedButton] = React.useState("Transação");
  const [selectedGroup1, setSelectedGroup1] = React.useState("");

  const handleGroup1ButtonClick = (
    buttonName: React.SetStateAction<string>
  ) => {
    setSelectedGroup1(buttonName);
  };

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

  const [count1, setCount1] = React.useState(1);
  const [count2, setCount2] = React.useState(1);
  const [IsPossible, setIsPossible] = React.useState(false);

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  };

  const ValidaCampos = () => {
    const tipoOleo = sessionStorage.getItem("tipoOleo")

    if (!tipoOleo) {
      return {
        IsSucesso: false,
        msg: "É necessário selecionar um tipo de óleo.",
      };
    }

    return { IsSucesso: true, msg: "Correto"};
  };

  const limparSessao = () => {
    sessionStorage.removeItem("tipoOleo");
  };

  const cadastrarValor = async () => {
    const retornoValidaCampos = await ValidaCampos();

    if (retornoValidaCampos.IsSucesso) {
      const data = new Date().toLocaleString();
      const tipoOleoSessao = sessionStorage.getItem("tipoOleo")
      
      if (tipoOleoSessao) {
        const parametroObj = {
          ParametroIdentificador: "ValorOleo",
          ParametroNome: tipoOleoSessao,
          ParametroValor: String(count1),
          ParametroValorNumerico: count1
        }

        const result = await Axios.post(`${process.env.REACT_APP_BaseURL}/POSTParametro`, {
          parametro: parametroObj,
          data: data
        })

        if (result.data.Sucesso) {
          setIsPossible(true)
          MyToast.fire({
            icon: "success",
            text: result.data.msg
          }).then(() => {
            window.location.reload()
            limparSessao()
          })
        } else {
          setIsPossible(true)
          MyToast.fire({
            icon: "error",
            text: result.data.msg
          }).then(() => setIsPossible(false))
        }
      }
    } else if (!retornoValidaCampos.IsSucesso && retornoValidaCampos.msg === "É necessário selecionar um tipo de óleo.") {
      MyToast.fire({
        icon: "warning",
        text: retornoValidaCampos.msg
      })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "fixed",
          top: "40%",
          border: "1px solid #000",
          borderColor: "grey",
          borderRadius: "10px",
          width: "65%",
          height: "52%",
          zIndex: 0,
          marginLeft: "0%",
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          top: "46%",
          // width: '100%',
          // zIndex: 1000,
          marginLeft: "2%",
        }}
      >
        {/* TEXTO */}
        <Box sx={{ flexGrow: 1, marginLeft: "0%", marginTop: "-6%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={10}>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <ArrowForwardIcon
                      sx={{
                        color: "#136935",
                      }}
                    />
                  </ListItemIcon>
                  <Typography variant="h5">Definir valor do óleo</Typography>
                </ListItem>
              </List>




            </Grid>

            {/* DEFINIÇÃO DE QUANTIDADE */}
            <Grid item xs={6} md={5}>
              <List
                sx={{
                  marginLeft: "-12%",
                  mt: "-7%",
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    inset
                    primary="Defina a quantidade de greenneats:"
                  />
                </ListItem>
              </List>

              <div
                style={{
                  border: "1px solid #000",
                  borderColor: "grey",
                  padding: "1px",
                  borderRadius: "10px",
                  width: "33%",
                  height: "80px",
                  marginLeft: "12%",
                  marginTop: "3%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "6%",
                  }}
                >
                  {/* BOTÃO - */}
                  <Button
                    id="button1"
                    aria-label="reduce"
                    onClick={() => {
                      setCount1(Math.max(count1 - 1, 0));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>

                  {/* NÚMERO CONTAGEM */}
                  <Badge color="secondary">
                    <span style={{ fontSize: "24px" }}>{count1}</span>
                  </Badge>

                  {/* BOTÃO + */}
                  <Button
                    id="button2"
                    aria-label="increase"
                    onClick={() => {
                      setCount1(count1 + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </div>

                {/* TEXTO */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "70%", marginLeft: "2%" }}>
                    greenneats
                  </div>
                </div>
              </div>
            </Grid>

            {/* DEFINIÇÃO DE LITROS */}
            <Grid item xs={6} md={5}>
              {/* TEXTO */}
              <List
                sx={{
                  marginLeft: "-30%",
                  mt: "-8%",
                  width: "200%"
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    inset
                    primary="Defina o tipo de óleo:"
                    sx={{ mt: "1%" }}
                  />

                </ListItem>
              </List>

              <div style={{ display: "flex", alignItems: "center", marginLeft: "-10%", marginTop: "2%" }}>
                {/* Contêiner para os botões 'usado' e 'limpo' */}
                <div
                  id="containerBotoes"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "45%",
                  }}
                >
                  {/* BOTÃO ÓLEO LIMPO */}
                  <div
                    style={{
                      marginLeft: "5%",
                      width: "30%",
                    }}
                  >
                    <Button
                      sx={{
                        height: "100px",
                        borderRadius: "20px",
                        backgroundColor:
                          selectedGroup1 === "limpo"
                            ? "#YourSelectedColor"
                            : "transparent",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleGroup1ButtonClick("limpo");
                        sessionStorage.setItem("tipoOleo", "Óleo limpo");
                      }}
                    >
                      <img
                        src={limpo}
                        alt="png"
                        style={{
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "100%",
                        }}
                      />
                    </Button>
                    {/* TEXTO */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "70%",
                          marginLeft: "20%",
                          marginTop: "5%",
                        }}
                      >
                        limpo
                      </div>
                    </div>
                  </div>

                  {/* BOTÃO ÓLEO USADO */}
                  <div
                    style={{
                      marginRight: "15%",
                      width: "30%",
                    }}
                  >
                    <Button
                      sx={{
                        height: "100px",
                        borderRadius: "20px",
                        backgroundColor:
                          selectedGroup1 === "usado"
                            ? "#YourSelectedColor"
                            : "transparent",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleGroup1ButtonClick("usado");
                        sessionStorage.setItem("tipoOleo", "Óleo usado");
                      }}
                    >
                      <img
                        src={usado}
                        alt="png"
                        style={{
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "100%",
                        }}
                      />
                    </Button>
                    {/* TEXTO */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "70%",
                          marginLeft: "10%",
                          marginTop: "10%",
                        }}
                      >
                        usado
                      </div>
                    </div>
                  </div>
                </div>

                {/* Div 'maisemenos' */}
                <div
                  id="maisemenos"
                  style={{
                    marginLeft: "0%",
                    border: "1px solid #000",
                    borderColor: "grey",
                    padding: "1px",
                    borderRadius: "10px",
                    width: "20%",
                    height: "70px",
                    marginTop: "-3%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "7%",
                    }}
                  >
                    {/* BOTÃO - */}
                    <Button
                      id="button3"
                      aria-label="reduce"
                      onClick={() => {
                        // setCount2(Math.max(count2 - 1, 0));
                      }}
                    >
                      {/* <RemoveIcon fontSize="small" /> */}
                    </Button>

                    {/* NÚMERO CONTAGEM */}
                    <Badge color="secondary">
                      <span style={{ fontSize: "24px" }}>{count2}</span>
                    </Badge>

                    {/* BOTÃO + */}
                    <Button
                      id="button4"
                      aria-label="increase"
                      onClick={() => {
                        // setCount2(count1 + 1);
                      }}
                    >
                      {/* <AddIcon fontSize="small" /> */}
                    </Button>
                  </div>

                  {/* TEXTO */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "70%",
                        marginLeft: "2%",
                        marginTop: "2%",
                      }}
                    >
                      litros
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            {/* BOTÕES DE BAIXO */}
            <Grid item xs={6} md={10}>
              <ThemeProvider theme={theme}>
                <Box sx={{ width: "auto", marginTop: "4%" }}>
                  <Stack spacing={3} direction="row">
                    {/*BOTÃO CANCELAR*/}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "35%",
                      }}
                    >
                      {/* <Button
                        variant={
                          selectedButton === "cancelar"
                            ? "contained"
                            : "outlined"
                        }
                      >
                        cancelar
                      </Button> */}

                      <Box sx={{ width: "15%" }} />

                      {/*BOTÃO TRANSFERIR*/}
                      <Button
                        variant={
                          selectedButton === "Transação"
                            ? "contained"
                            : "outlined"
                        }
                        disabled={IsPossible}
                        onClick={cadastrarValor}
                      >
                        cadastrar
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
