import * as React from "react";
import { useState } from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Axios from 'axios'
import { MyToast } from "../Alerts/swal-mixin";

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

export default function AlteracaoSenha() {
  const [senha, setSenha] = React.useState('');
  const [confirmSenha, setConfirmSenha] = React.useState('');
  const [mostrarErroSenha, setMostrarErroSenha] = React.useState(false);
  const [senhasDiferentes, setSenhasDiferentes] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const capturaCampos = (event: any) => {
    const { name, value } = event.target

    if (name === "Senha") {
      setSenha(value)
    }

    if (name === "confirmSenha") {
      setConfirmSenha(value)
      const senhasSaoDiferentes = value !== senha;
      setMostrarErroSenha(senhasSaoDiferentes)
      setSenhasDiferentes(senhasSaoDiferentes)
    }
  }

  const validaCampos = () => {
    let isVazio = false

    if (senha === '' || confirmSenha === '') {
      isVazio = true
      return isVazio
    }
  }

  const atualizarSenha = async (event: any) => {
    event.preventDefault()

    const usuarioLogado = sessionStorage.getItem('UsuarioLogado')

    if (usuarioLogado) {
      const usuarioObj = JSON.parse(usuarioLogado)

      if (!validaCampos()) {
        const result = await Axios.put(`${process.env.REACT_APP_BaseURL}/alterarSenha`, {
          usuarioID: usuarioObj.UsuarioID,
          novaSenha: confirmSenha
        })

        if (result.data.Sucesso) {
          MyToast.fire({
            title: result.data.msg,
            icon: 'success'
          }).then(() => window.location.reload())
        } else {
          MyToast.fire({
            title: result.data.msg,
            icon: 'error'
          })
        }
      } else {
        MyToast.fire({
          title: "Preencha todos os campos.",
          icon: 'warning'
        })
      }

    }


    // console.log(senha)
    // console.log(confirmSenha)
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{
            bgcolor: "#ffffff",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%",
            width: "100%",
            //   padding: '5%',
            mt: 5,
            borderRadius: 3
          }} >
            <Grid container spacing={1}>

              {/* <Grid item xs={9}>
                <Typography sx={{ ml: 5, mb: 1, fontSize: '20px' }}>
                  Editar Senha:
                </Typography>
              </Grid> */}

              <Box margin={1} display="flex" flexDirection="column" >
                <Grid container direction="column" padding={4} spacing={2}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                      <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Senha *"
                          name="Senha"
                          // onChange={(event) => setSenha(event.target.value)}
                          onChange={capturaCampos}
                          value={senha}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined" error={mostrarErroSenha} >
                        <InputLabel htmlFor="outlined-adornment-password">Confirmar Senha *</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Confirmar Senha *"
                          name="confirmSenha"
                          onChange={capturaCampos}
                          value={confirmSenha}
                        />
                        {mostrarErroSenha && (
                          // Exiba uma mensagem de erro se as senhas não forem compatíveis
                          <Typography variant="caption" color="error">
                            As senhas não correspondem.
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={6} sm={6} md={6} lg={4} xl={4}> {/* Dividir o espaço da grid igualmente em 2 colunas */}
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 20,
                          width: '100%', // Use 100% da largura da coluna
                          height: 40,
                          mt: 5
                        }}
                      >
                        Retornar
                      </Button>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderRadius: 20,
                          width: '100%', // Use 100% da largura da coluna
                          height: 40,
                          ml: 1, // Adicione uma margem à esquerda para separar os botões
                          mt: 5
                        }}
                        onClick={atualizarSenha}
                        disabled={senhasDiferentes}
                      >
                        Confirmar
                      </Button>
                    </Grid>

                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
