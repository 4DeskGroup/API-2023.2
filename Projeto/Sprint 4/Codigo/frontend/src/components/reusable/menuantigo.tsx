import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import logo from "../images/logo.png"
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";
import axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


export default function TopMenu() {
  const [userName, setUserName] = useState("");
  // const [values, setValues] = useState();

  const validaUserLogado = async () => {
    const userLogadoJSON = sessionStorage.getItem('UsuarioLogado');
    let userLogado = null;  // Move a declaração para este escopo

    if (userLogadoJSON) {
      userLogado = JSON.parse(userLogadoJSON);

      if (userLogado && userLogado.UsuarioID) {
        const botaoRegistro = document.getElementById('BotaoRegistro');
        const botaoLogin = document.getElementById('BotaoLogin');

        if (botaoRegistro && botaoLogin) {
          botaoRegistro.style.display = 'none';
          botaoLogin.style.display = 'none';
        }
      }
    }

    return userLogado;
  };

  React.useEffect(() => {
    const fetchUserName = async () => {
      const user = await validaUserLogado();  // Aguarde a função assíncrona

      if (user) {
        setUserName(user.UsuarioNome);  // Atualize o nome do usuário no estado
      }
    };

    fetchUserName();  // Chame a função para buscar o nome do usuário
  }, []);


  const [email, setEmail] = useState("" as any);
  const [password, setPassword] = useState("" as any);

  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClickButton = () => {
    axios.post("http://localhost:3001/login", {
      email: email,
      password: password
    }).then(async (response) => {
      if (response.data.msg === 'Senha inválida. Autenticação falhou.' && !response.data.isSucesso) {
        MyToast.fire({
          icon: 'error',
          title: response.data.msg
        })
      }
      if (response.data.msg === 'Usuário não encontrado.' && !response.data.isSucesso) {
        MyToast.fire({
          icon: 'warning',
          title: response.data.msg
        })
      }
      if (response.data.msg === 'Senha válida. Usuário autenticado.' && response.data.isSucesso) {
        // MyToast.fire({
        //   icon: 'success',
        //   title: 'Login realizado com sucesso!',
        //   // background: "#90ee90"
        // })

        
        if (response.data.usuario.UsuarioTipo === 'Parceiro') {
          navigate('/par-saldo')
          await window.location.reload()
        }
        if (response.data.usuario.UsuarioTipo === 'Estabelecimento') {
          navigate('/estabelecimento')
          await window.location.reload()
        }

        sessionStorage.setItem('UsuarioLogado', JSON.stringify(response.data.usuario))
      }
    })
  }

  const limparSessao = () => {
    sessionStorage.removeItem("dados_step_1")
    sessionStorage.removeItem("dados_step_2")
    sessionStorage.removeItem("dados_step_3")
    sessionStorage.removeItem("UsuarioLogado")
    sessionStorage.removeItem("TokenValidaEmail")
  }

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

  return (
    <ThemeProvider theme={theme}>


      <React.Fragment>
        <CssBaseline />

        <AppBar sx={{ height: "1%", boxShadow: 0 }}></AppBar>
        <div
          style={{
            paddingTop: '0vh'
          }}
        >
          <AppBar
            color="secondary"
            sx={{
              position: 'flex',
              height: "13%",
              boxShadow: 5,
              zIndex: 0
            }}
          >
            <CssBaseline />

            <CardMedia sx={{ mt: "1%", ml: "10%", position: 'absolute' }}>
              <img src={logo} alt="img" width="5%" />
            </CardMedia>
            <Container maxWidth="sm">

              <Toolbar
                sx={{
                  alignContent: "center",
                  justifyContent: "center",
                  mt: "2%",
                  ml: "50%",
                }}>

                <Link
                  href="/"
                  underline="hover"
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    fontSize: 14,
                  }}
                  onClick={limparSessao}
                >
                  inicio
                </Link>
                <Typography
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 3,
                    fontSize: 14,
                  }}
                >
                  |
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 5,
                    fontSize: 14,
                  }}
                >
                  produtos
                </Link>
                <Typography
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 3,
                    fontSize: 14,
                  }}
                >
                  |
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 5,
                    fontSize: 14,
                  }}
                >
                  contato
                </Link>
                <Typography
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 3,
                    fontSize: 14,
                  }}
                >
                  |
                </Typography>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 5,
                    fontSize: 14,
                  }}
                >
                  loja
                </Link>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <Button
                        id='BotaoLogin'
                        variant="outlined"
                        {...bindTrigger(popupState)}
                        sx={{
                          fontFamily: "poppins",
                          variant: "filledTonal",
                          ml: 8,
                          borderRadius: 10,
                          border: 1,
                          fontSize: 12,
                          width: "20vh",
                        }}
                      >
                        Login
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: 400,
                            height: 250,
                            fontFamily: "poppins",
                          }}
                        >
                          <Typography
                            sx={{ mt: 4, ml: 17, fontFamily: "poppins", fontSize: '14px' }}
                          >
                            Acesse sua conta
                          </Typography>
                          <TextField
                            id="outlined-basic"
                            label="E-mail"
                            variant="standard"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            sx={{
                              width: 300,
                              mt: 2,
                              ml: 6,
                              fontFamily: "poppins",
                            }}
                          />
                          <TextField
                            id="outlined-basic"
                            label="Senha"
                            variant="standard"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            sx={{
                              width: 300,
                              mt: 2,
                              ml: 6,
                              fontFamily: "poppins",
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Button
                            color="primary"
                            onClick={() => [handleClickButton()]}
                            sx={{
                              fontFamily: "poppins",
                              variant: "filledTonal",
                              mt: 4,
                              ml: 17,
                              borderRadius: 10,
                              border: 1,
                              width: "20vh",
                              fontSize: 12,
                            }}
                          >
                            Acessar
                          </Button>
                        </Box>
                      </Popover>
                    </div>
                  )}
                </PopupState>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <Button
                        id='BotaoRegistro'
                        variant="outlined"
                        sx={{
                          fontFamily: "poppins",
                          ml: 1,
                          borderRadius: 10,
                          border: 1,
                          width: '20vh',
                          fontSize: 12,
                        }}
                        href="/registration"
                      >
                        Registre-se
                      </Button>
                    </div>
                  )}
                </PopupState>
                <Typography
                  color="primary"
                  sx={{
                    fontFamily: "poppins",
                    variant: "filledTonal",
                    ml: 5,
                    fontSize: 14,
                    whiteSpace: 'nowrap'  // Evita quebra de linha
                  }}
                >
                  {userName
                    ? `Seja bem vindo, ${userName}`
                    : null}
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
      </React.Fragment>

    </ThemeProvider>
  );
}
