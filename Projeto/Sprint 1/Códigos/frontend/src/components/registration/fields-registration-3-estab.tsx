import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
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

export default function FormRegistration3Estab({ parametros }: any) {
  
  const capturaCampos = (event: any) => {
    const { name, value } = event.target
    parametros({ [name]: value})
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box
            sx={{
              bgcolor: "#ffffff",
              ml: -30,
              height: "50vh",
              width: "130vh",
              mt: 5,
              borderRadius: 3,
            }}
          >
            <Grid container spacing={1}>
              <Typography sx={{ ml: 45, mb: 1, mt: 0 }}>
                Preencha os campos abaixo:
              </Typography>
              <Box margin={1} display="flex" flexDirection="column" >
                <Grid container direction="column" padding={2} spacing={2}>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        name="RazaoSocial"
                        label="Razão social"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        name="NomeFantasia"
                        label="Nome fantasia"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                      <TextField
                        fullWidth
                        name="cnpj"
                        label="CNPJ"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={4}>
                      <TextField
                        fullWidth
                        name="DataInicioOp"
                        label="Data de inicio da operação"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={4}>
                      <TextField
                        fullWidth
                        name="ResponsavelEmpresa"
                        label="Responsável pela empresa"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={4}>
                      <TextField
                        fullWidth
                        name="VolumeOleo"
                        label="Volume de venda de óleo por mês"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item direction="row" spacing={2}>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={4}>
                      <TextField
                        fullWidth
                        name="Endereco"
                        label="Endereço"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={1}>
                      <TextField
                        fullWidth
                        name="Numero"
                        label="Número"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={3}>
                      <TextField
                        fullWidth
                        name="Bairro"
                        label="Bairro"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={3}>
                      <TextField
                        fullWidth
                        name="Cidade"
                        label="Cidade"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={1}>
                      <TextField
                        fullWidth
                        name="uf"
                        label="UF"
                        size="small"
                        onChange={capturaCampos}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item direction="row" spacing={2}>
                    {/* <Grid item xs={2} sm={2} md={6} lg={6} xl={6}>
                      <TextField
                        fullWidth
                        name="CidadesAtendem"
                        label="Cidades que atendem"
                        size="small"
                        onChange={capturaCampos}
                        multiline
                      />
                    </Grid> */}
                    <Grid item xs={2} sm={2} md={6} lg={6} xl={12}>
                      <TextField
                        fullWidth
                        name="Parceiros"
                        label="Principais parceiros"
                        size="small"
                        onChange={capturaCampos}
                        multiline
                      />
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
