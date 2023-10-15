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
import { Avatar, InputAdornment, Popover, TextField } from "@mui/material";
import Logo from "../images/logo.png";
import axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function TopMenu2() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null); // Defina o tipo como HTMLElement | null

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
      .post("http://localhost:3001/login", {
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

          sessionStorage.setItem(
            "UsuarioLogado",
            JSON.stringify(response.data.usuario)
          );
        }
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 , zIndex: 10}}>
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontFamily: "actor",}}>
            GREENNEAT
          </Typography>
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
    </Box>
  );
}
