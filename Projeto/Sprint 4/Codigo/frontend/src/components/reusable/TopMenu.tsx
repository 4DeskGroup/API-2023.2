import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, InputAdornment, Popover, TextField, Tooltip } from "@mui/material";
import Logo from "../images/logo.png";
import axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import logo4D from "../images/logo4D.png";

const settings = ["Voltar", "Sair"];

export default function TopMenu2() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null); // Defina o tipo como HTMLElement | null
  const [aparecerOpcoes, setAparecerOpcoes] = React.useState(false)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // Verificar o tamanho da tela para determinar se é uma tela móvel
  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função para abrir o menu em telas responsivas
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [email, setEmail] = React.useState("" as any);
  const [password, setPassword] = React.useState("" as any);

  const [showPassword, setShowPassword] = React.useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickButton = () => {
    axios
      .post(`${process.env.REACT_APP_BaseURL}/login`, {
        email: email,
        password: password,
      })
      .then(async (response) => {
        if (
          response.data.msg === "Senha inválida. Autenticação falhou." &&
          !response.data.isSucesso
        ) {
          MyToast.fire({
            icon: "error",
            title: response.data.msg,
          });
        }
        if (
          response.data.msg === "Usuário não encontrado." &&
          !response.data.isSucesso
        ) {
          MyToast.fire({
            icon: "warning",
            title: response.data.msg,
          });
        }
        if (
          response.data.msg === "Senha válida. Usuário autenticado." &&
          response.data.isSucesso
        ) {
          // MyToast.fire({
          //   icon: 'success',
          //   title: 'Login realizado com sucesso!',
          //   // background: "#90ee90"
          // })

          if (response.data.usuario.UsuarioTipo === "Parceiro") {
            navigate("/parceiro-saldo");
            await window.location.reload();
          }
          if (response.data.usuario.UsuarioTipo === "Estabelecimento") {
            navigate("/estabelecimento-saldo");
            await window.location.reload();
          }
          if (response.data.usuario.UsuarioTipo === "Empresa") {
            navigate("/adm-transferir-greenneats");
            await window.location.reload();
          }

          sessionStorage.setItem(
            "UsuarioLogado",
            JSON.stringify(response.data.usuario)
          );
        }
      });
  };

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
          setAparecerOpcoes(true)
        }
      }
    }

    // return userLogado;
  };

  React.useEffect(() => {
    const fetchUserName = async () => {
      // const user = await validaUserLogado();  // Aguarde a função assíncrona
      await validaUserLogado();
      // if (user) {
      //   setUserName(user.UsuarioNome);  // Atualize o nome do usuário no estado
      // }
    };

    fetchUserName();  // Chame a função para buscar o nome do usuário
  }, []);

  const deslogar = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, zIndex: 10 }}>
        <Toolbar>
          <Avatar
            alt="Meu Ícone"
            src={Logo}
            sx={{
              mr: 1,
              borderRadius: "0",
              width: "7vh",
            }}
          />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "actor", }}>
            GREENNEAT
          </Typography>

          {aparecerOpcoes && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="4desk" src={logo4D} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleMenuClose();
                      if (setting === 'Sair') {
                        deslogar()
                      } else if (setting === 'Perfil') {
                        navigate('/edicao-usuario-parceiro')
                      }
                    }}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}


          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <Button
                      id="BotaoLogin"
                      variant="outlined"
                      {...bindTrigger(popupState)}
                      color="inherit"
                      sx={{
                        fontFamily: "poppins",
                        variant: "filledTonal",
                        ml: 8,
                        borderRadius: 10,
                        border: 1,
                        fontSize: 14,
                        borderColor: "inherit",
                        padding: "5px 9px",
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
                          sx={{
                            mt: 4,
                            ml: 17,
                            fontFamily: "poppins",
                            fontSize: "14px",
                          }}
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
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
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
                            zIndex: 10,
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
                      id="BotaoRegistro"
                      color="inherit"
                      sx={{
                        fontFamily: "poppins",
                        variant: "filledTonal",
                        ml: 4,
                        borderRadius: 10,
                        border: 1,
                        fontSize: 14,
                        borderColor: "inherit",
                        padding: "5px 9px",

                      }}
                      href="/registration"
                    >
                      CADASTRE-SE
                    </Button>
                  </div>
                )}
              </PopupState>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }}>{/* Seu conteúdo vai aqui */}</Box>

      {/* Menu em telas responsivas */}
      {!aparecerOpcoes && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >



          <MenuItem>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button
                    id="BotaoLogin"
                    variant="outlined"
                    {...bindTrigger(popupState)}
                    color="inherit"
                    sx={{
                      fontFamily: "poppins",
                      variant: "filledTonal",
                      borderRadius: 10,
                      border: 1,
                      fontSize: 12,
                      borderColor: "inherit",
                      width: "100%",
                      padding: "5px 9px",
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
                        sx={{
                          mt: 4,
                          ml: 17,
                          fontFamily: "poppins",
                          fontSize: "14px",
                        }}
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
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
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
          </MenuItem>
          <MenuItem>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button
                    id="BotaoRegistro"
                    color="inherit"
                    sx={{
                      fontFamily: "poppins",
                      variant: "filledTonal",
                      borderRadius: 10,
                      border: 1,
                      fontSize: 12,
                      borderColor: "inherit",
                      padding: "5px 9px",

                    }}
                    href="/registration"
                  >
                    CADASTRE-SE
                  </Button>
                </div>
              )}
            </PopupState>
          </MenuItem>
        </Menu>
      )}
    </Box>
  );
}
