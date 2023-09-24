import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import money from "../images/money.png"
import boxes from "../images/boxes.png"
import papermoney from "../images/papermoney.png"
import extrato from "../images/extrato.png"
import { AppBar, Button, Typography } from "@mui/material";
import logout from "../images/logout.png";
import { useNavigate } from "react-router-dom";

export default function ParNestedList() {
    const navigate = useNavigate()
    
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

    const [open1, setOpen1] = React.useState(true);
    const handleClick1 = () => {
        setOpen1(!open1);
    };

    const [open2, setOpen2] = React.useState(true);
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    const [open3] = React.useState(true);
    const handleClick3 = () => {
        setOpen2(!open3);
    };

    const deslogar = () => {
        sessionStorage.removeItem("dados_step_1")
        sessionStorage.removeItem("dados_step_2")
        sessionStorage.removeItem("dados_step_3")
        sessionStorage.removeItem("UsuarioLogado")
        sessionStorage.removeItem("TokenValidaEmail")

        navigate('/')
    }

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    height: "100%",
                    marginRight: "80%",
                    paddingTop: '15vh'
                }}
            >
                <AppBar
                    color="secondary"
                    sx={{
                        height: "100%",
                        Width: '100%',
                        boxShadow: 5,
                        marginRight: "80%",
                        zIndex: -1
                    }}
                >
                </AppBar>


                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        zIndex: 0
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" color="primary">
                            CONSULTE
                        </ListSubheader>
                    }
                >

                    {/*SALDO*/}
                    <ListItemButton color="primary" onClick={handleClick1} >
                        <ListItemIcon>
                            <img src={money} alt="png" width="25px" />
                        </ListItemIcon>
                        <ListItemText primary="Saldo" />
                        {open1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 5 }}>
                                <img src={papermoney} alt="png" width="20px" />
                                <ListItemText sx={{ pl: 3 }} primary="Transação" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 5 }}>
                                <img src={extrato} alt="png" width="20px" />
                                <ListItemText sx={{ pl: 3 }} primary="Extrato" />
                            </ListItemButton>

                        </List>

                    </Collapse>

                    {/*ESTOQUE DE ÓLEO*/}
                    <ListItemButton onClick={handleClick3}>
                        <ListItemIcon>
                            <img src={boxes} alt="png" width="25px" />
                        </ListItemIcon>
                        <ListItemText primary="Estoque de Óleo" />
                    </ListItemButton>

                    {/*CRÉDITO GREENNEAT*/}
                    <ListItemButton onClick={handleClick2}>
                        <ListItemIcon>
                            <img src={money} alt="png" width="25px" />
                        </ListItemIcon>
                        <ListItemText primary="Crédito Greenneat" />
                        {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>

                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItemButton sx={{ pl: 5 }}>
                                <img src={extrato} alt="png" width="20px" />
                                <ListItemText sx={{ pl: 3 }} primary="Histórico crédito Greenneat" />
                            </ListItemButton>

                            <ListItemButton sx={{ pl: 5 }}>
                                <img src={extrato} alt="png" width="20px" />
                                <ListItemText sx={{ pl: 3 }} primary="Histórico de compra de produtos Greenneat" />
                            </ListItemButton>

                        </List>

                    </Collapse>

                </List>

                <Button
                    sx={{
                        color: '#000000',
                        height: "6%",
                        maxWidth: "20%",
                        position: 'fixed',
                        top: 'auto',
                        bottom: '10%',
                    }}
                    onClick={deslogar}>

                    <Typography
                        sx={{
                            paddingLeft: '50%',
                        }}>
                        Sair
                    </Typography>

                    <img
                        src={logout}
                        alt="png"
                        style={{
                            paddingLeft: '2vh',
                            width: "15%"
                        }} />


                </Button>

            </div>


        </ThemeProvider>
    );
}