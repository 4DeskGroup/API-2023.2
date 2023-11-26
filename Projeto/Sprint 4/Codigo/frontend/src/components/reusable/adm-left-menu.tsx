import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import {Divider, List,ListItemButton,Menu,ThemeProvider,createTheme,} from "@mui/material";
import Logo from "../images/logo.png";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import money from "../images/money.png";
import boxes from "../images/boxes.png";
import papermoney from "../images/papermoney.png";
import extrato from "../images/extrato.png";
import cadastro from "../images/cadastro.png";
import { useNavigate } from "react-router-dom";
import logo4D from "../images/logo4D.png";
import Grafico from "../images/grafico-de-pizza.png";

const settings = ["Perfil", "Sair"];

function AdmLeftMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()

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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
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

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [open1, setOpen1] = React.useState(true);
  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const [open2, setOpen2] = React.useState(true);
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const [open3, setOpen3] = React.useState(true);
  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const [open4, setOpen4] = React.useState(true);
  const handleClick4 = () => {
    setOpen4(!open4);
  };

  const [open5, setOpen5] = React.useState(true);
  const handleClick5 = () => {
    setOpen5(!open5);
  };

  const [open6, setOpen6] = React.useState(true);
  const handleClick6 = () => {
    setOpen6(!open6);
  };

  const [open7, setOpen7] = React.useState(true);
  const handleClick7 = () => {
    setOpen7(!open7);
  };


  const drawer = (
    <Box sx={{ zIndex: 10 }}>
      <Toolbar />
      {/* Sua lista aqui */}
      <List>
        <ListItemButton color="primary" onClick={handleClick1}>
          <ListItemIcon>
            <img src={money} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Transferir Greenneat"  onClick={() => navigate('/adm-transferir-greenneats')} />
          {open1 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <img src={papermoney} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Transferir Greenneats"/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={papermoney} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Transferir Greenneats por óleo"/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Histórico de transferências"  />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

        <ListItemButton onClick={handleClick2}>
          <ListItemIcon>
            <img src={Grafico} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Dashboards" onClick={() => navigate('/dashboard-adm')} />
        </ListItemButton>

        <Divider />



        <ListItemButton color="primary" onClick={handleClick3}>
          <ListItemIcon>
            <img src={extrato} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Valor do óleo" onClick={() => navigate('/adm-valor-oleo')} />
          {open3 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Parceiro" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Estabelecimento" />
            </ListItemButton>
          </List>
        </Collapse>



        <Divider />



        

        <ListItemButton color="primary" onClick={handleClick4}>
          <ListItemIcon>
            <img src={extrato} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Transferências feitas por usuários" onClick={() => navigate('/transf-realiz-usuario')} />
          {open4 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open4} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Parceiro" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Estabelecimento" />
            </ListItemButton>
          </List>
        </Collapse>


<Divider />


        <ListItemButton color="primary" onClick={handleClick5}>
          <ListItemIcon>
            <img src={extrato} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Usuários cadastrados" onClick={() => navigate('/adm-usuarios-cadastrados')}/>
          {open5 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open5} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Parceiro" onClick={() => navigate('/adm-usuarios-cadastrados')}/>
            </ListItemButton>

            <ListItemButton sx={{ pl: 5 }}>
              <img src={extrato} alt="png" width="20px" />
              <ListItemText sx={{ pl: 3 }} primary="Estabelecimento" onClick={() => navigate('')}/>
            </ListItemButton>
          </List>
        </Collapse>

        <Divider />

        <ListItemButton onClick={handleClick6}>
          <ListItemIcon>
            <img src={papermoney} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Greenneats recebidas dos usuários" onClick={() => navigate('/adm-historico-rec-user')} />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={handleClick7}>
          <ListItemIcon>
            <img src={boxes} alt="png" width="25px" />
          </ListItemIcon>
          <ListItemText primary="Estoque de Óleo" onClick={() => navigate('/adm-estoque-oleo')} />
        </ListItemButton>

        

        




      </List>
    </Box>
  );

  const deslogar = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 1001 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              size="large"
              aria-label="menu"
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" }, // Ícone de hambúrguer visível apenas em telas menores
              }}
            >
              <MenuIcon />
            </IconButton>
            <Avatar
              alt="Meu Ícone"
              src={Logo}
              sx={{
                mr: 1,
                borderRadius: "0",
              }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GREENEAT
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'actor'}}>
              Acessado como: Administrador
            </Typography>
            <Typography
              variant="body1"
              sx={{
                display: { xs: "block", md: "block" },
                mr: "5vh",
                alignSelf: "center",
              }}
            >
              {userName ? `Olá, ${userName}` : null}
            </Typography>

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
                      handleCloseUserMenu();
                      if (setting === 'Sair') {
                        deslogar()
                      }
                    }}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav aria-label="menu">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileDrawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Melhora o desempenho em dispositivos móveis.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: 290,
              boxSizing: "border-box",
              zIndex: 100,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              width: 290,
              boxSizing: "border-box",
              height: "94vh", // Defina a altura desejada aqui
              marginTop: "0vh", // Espaçamento para o AppBar
              position: "fixed", // Mantém o Drawer fixo na posição
              zIndex: 100,
              boxShadow: 5,
              display: { xs: "none", md: "block" }, // Drawer visível apenas em telas maiores
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </ThemeProvider>
  );
}

export default AdmLeftMenu;
