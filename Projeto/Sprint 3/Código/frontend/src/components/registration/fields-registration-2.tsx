import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

export default function FormRegistration2({ parametros, dados, senhasCompativeis }: any) {
  const [mostrarErroSenha, setMostrarErroSenha] = React.useState(false);

  const capturaCampos = (event: any) => {
    const { name, value } = event.target
    parametros({ [name]: value })

    if (name === "confirmSenha") {
      const senhasSaoDiferentes = value !== dados.Senha;
      senhasCompativeis(senhasSaoDiferentes);
      setMostrarErroSenha(senhasSaoDiferentes)
    }
  }

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

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#ffffff", ml: -12, height: "50vh", width: '110vh', mt: 5, borderRadius: 3 }}>
            <Grid container spacing={1}>
              <Typography sx={{ ml: 37, mb: 4, mt: 3 }}>
                Preencha os campos abaixo:
              </Typography>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": {
                    ml: 10,
                    width: "35ch",
                    flexGrow: 2,
                    color: "primary",
                  },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                  <Grid container spacing={4}>
                    <Grid item xs={4}  >
                      <TextField
                        required
                        id="outlined-required"
                        name="NomeUsuario"
                        label="Nome de usuário"
                        onChange={capturaCampos}
                        value={dados.NomeUsuario}
                      />
                    </Grid>
                    <Grid item sx={{ ml: 8 }}>
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name="Email"
                        onChange={capturaCampos}
                        value={dados.Email}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl sx={{ m: 1, width: '35ch', ml: 10 }} variant="outlined">
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
                          onChange={capturaCampos}
                          value={dados.Senha}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item sx={{ ml: 17 }}>
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
                          value={dados.confirmSenha}
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
                </div>
              </Box>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
