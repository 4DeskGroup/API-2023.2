import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AlteracaoSenha from "./alteracaoSenha";
import { useNavigate } from "react-router-dom";
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

export default function Step3Estab() {
  const [razaoSocial, setRazaoSocial] = React.useState('' as any)
  const [nomeFantasia, setNomeFantasia] = React.useState('' as any)
  const [cnpj, setCnpj] = React.useState(''); // Estado para armazenar o CNPJ formatado
  const [dataInicio, setDataInicio] = React.useState('' as any)
  const [responsavelEmpresa, setResponsavelEmpresa] = React.useState('' as any)
  const [volumeOleo, setVolumeOleo] = React.useState('' as any)
  const [endereco, setEndereco] = React.useState('' as any)
  const [numero, setNumero] = React.useState('' as any)
  const [bairro, setBairro] = React.useState('' as any)
  const [cidade, setCidade] = React.useState('' as any)
  const [uf, setUf] = React.useState('' as any)
  const [princParceiros, setPrincParceiros] = React.useState('' as any)

  const [isAlterarSenhaClicked, setIsAlterarSenhaClicked] = React.useState(false);
  const [isInputsVisible, setInputsVisible] = React.useState(true);
  const navigate = useNavigate();

  // Função para formatar o CNPJ
  const formatCnpj = (value: string) => {
    // Remove todos os caracteres não numéricos do valor
    const cnpjValue = value.replace(/\D/g, '');

    // Formata o CNPJ com a máscara
    let formattedCnpj = cnpjValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    );

    setCnpj(formattedCnpj); // Atualiza o estado com o CNPJ formatado
  };

  const handleCnpjChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formatCnpj(event.target.value);
  };

  const handleClickAlteraSenha = () => {
    setIsAlterarSenhaClicked(true);
    setInputsVisible(false);
  }

  const handleClickAlterarInfo = () => {
    setIsAlterarSenhaClicked(false);
    setInputsVisible(true);
  }

  const recuperarInfo = async () => {
    const usuarioLogado = sessionStorage.getItem('UsuarioLogado')

    if (usuarioLogado) {
      const usuarioObj = JSON.parse(usuarioLogado)

      const response = await Axios.get(`${process.env.REACT_APP_BaseURL}/recupera-credito-estabelecimento/${usuarioObj.UsuarioID}`)

      if (response.data.Sucesso) {
        const estabelecimento = response.data.EstabInfo

        setRazaoSocial(estabelecimento.EstabelecimentoNomeCompleto)
        setNomeFantasia(estabelecimento.EstabelecimentoNomeFantasia)
        setCnpj(estabelecimento.EstabelecimentoCNPJ)
        setDataInicio(estabelecimento.EstabelecimentoDataCadastro)
        setResponsavelEmpresa(estabelecimento.EstabelecimentoResponsavel)
        setVolumeOleo(estabelecimento.EstabelecimentoVolumeOleoMensal)
        setEndereco(estabelecimento.EstabelecimentoEndereco)
        setNumero(estabelecimento.EstabelecimentoEnderecoNumero)
        setBairro(estabelecimento.EstabelecimentoBairro)
        setCidade(estabelecimento.EstabelecimentoCidade)
        setUf(estabelecimento.EstabelecimentoUF)
        setPrincParceiros(estabelecimento.EstabelecimentoPrincipaisParceiros)
      }

    }
  }

  React.useEffect(() => {
    recuperarInfo()
  }, [])

  const atualizarInfo = async (event: any) => {
    event.preventDefault()

    const usuarioLogado = sessionStorage.getItem('UsuarioLogado')

    if (usuarioLogado) {
      const usuarioObj = JSON.parse(usuarioLogado)

      const estabelecimento = {
        EstabelecimentoNomeFantasia: nomeFantasia,
        EstabelecimentoNomeCompleto: razaoSocial,
        EstabelecimentoResponsavel: responsavelEmpresa,
        EstabelecimentoDataCadastro: dataInicio,
        EstabelecimentoCNPJ: cnpj,
        EstabelecimentoVolumeOleoMensal: volumeOleo,
        EstabelecimentoEndereco: endereco,
        EstabelecimentoEnderecoNumero: numero,
        EstabelecimentoBairro: bairro,
        EstabelecimentoCidade: cidade,
        EstabelecimentoUF: uf,
        EstabelecimentoPrincipaisParceiros: princParceiros,
      }

      const result = await Axios.put(`${process.env.REACT_APP_BaseURL}/editarUsuarioEstabelecimento`, {
        estabelecimentoInfo: estabelecimento,
        usuarioID: usuarioObj.UsuarioID
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
    }

  }
  
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md">
          <Box sx={{
            bgcolor: "#ffffff",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: "100%",
            width: "100%",
            // padding: '5%',
            mt: 20,
            borderRadius: 3
          }} >
            <Grid container spacing={1}>

              <Grid item xs={9}>
                <Typography sx={{ ml: 5, mb: 1, fontSize: '20px' }}>
                  {isAlterarSenhaClicked ? 'Editar senha:' : 'Editar Informações:'}
                </Typography>
              </Grid>

              <Grid item xs={3}>
                {!isAlterarSenhaClicked ? (
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 20,
                      width: '80%', // Use 100% da largura da coluna
                      height: 40,
                      backgroundColor: "#136935",
                      color: 'white',
                      '&:hover': {
                        backgroundColor: "white", // Mantém a cor de fundo durante o hover
                        color: '#136935', // Define a cor do texto como branco durante o hover
                      },
                    }}
                    onClick={handleClickAlteraSenha}
                  >
                    Alterar senha
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: 20,
                      width: '80%', // Use 100% da largura da coluna
                      height: 40,
                      backgroundColor: "#136935",
                      color: 'white',
                      '&:hover': {
                        backgroundColor: "white", // Mantém a cor de fundo durante o hover
                        color: '#136935', // Define a cor do texto como branco durante o hover
                      },
                    }}
                    onClick={handleClickAlterarInfo}
                  >
                    Alterar informações
                  </Button>
                )}

              </Grid>

              {isInputsVisible && (
                <Box margin={1} display="flex" flexDirection="column" >
                  <Grid container direction="column" padding={4} spacing={2}>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} >
                        <TextField
                          fullWidth
                          name="RazaoSocial"
                          label="Razão social"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setRazaoSocial(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="NomeFantasia"
                          label="Nome fantasia"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setNomeFantasia(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="cnpj"
                          label="CNPJ"
                          size="small"
                          value={cnpj} // Exibe o CNPJ formatado
                          onChange={handleCnpjChange} // Manipula a formatação
                          inputProps={{ maxLength: 18 }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="DataInicioOp"
                          label="Data de inicio da operação"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setDataInicio(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="ResponsavelEmpresa"
                          label="Responsável pela empresa"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setResponsavelEmpresa(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="VolumeOleo"
                          label="Volume de venda de óleo por mês"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setVolumeOleo(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        <TextField
                          fullWidth
                          name="Endereco"
                          label="Logradouro"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setEndereco(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <TextField
                          fullWidth
                          name="Numero"
                          label="Nº"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setNumero(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                        <TextField
                          fullWidth
                          name="Bairro"
                          label="Bairro"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setBairro(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                        <TextField
                          fullWidth
                          name="Cidade"
                          label="Cidade"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setCidade(event.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                        <TextField
                          fullWidth
                          name="uf"
                          label="UF"
                          size="small"
                          inputProps={{ maxLength: 2 }} // Limita para dois caracteres
                          value={razaoSocial}
                          onChange={(event) => setUf(event.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Grid container item direction="row" spacing={2}>
                      {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={2}>
                        <TextField
                          fullWidth
                          name="CidadesAtendem"
                          label="Cidades que atendem"
                          size="small"
                          multiline
                        />
                      </Grid> */}
                      {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={2}>
                        <TextField
                          fullWidth
                          name="numeroContato"
                          label="Número de contato"
                          size="small"
                          
                        // multiline
                        />
                      </Grid> */}
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <TextField
                          fullWidth
                          name="Parceiros"
                          label="Principais parceiros"
                          size="small"
                          value={razaoSocial}
                          onChange={(event) => setPrincParceiros(event.target.value)}
                        // multiline
                        />
                      </Grid>
                    </Grid>

                    <Grid container item direction="row" spacing={2}>
                      <Grid item xs={6}> {/* Dividir o espaço da grid igualmente em 2 colunas */}
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 20,
                            width: '100%', // Use 100% da largura da coluna
                            height: 40,
                            mt: 5
                          }}
                          onClick={() => navigate('/estabelecimento-saldo')}
                        >
                          Retornar
                        </Button>
                      </Grid>

                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: 20,
                            width: '100%', // Use 100% da largura da coluna
                            height: 40,
                            ml: 1, // Adicione uma margem à esquerda para separar os botões
                            mt: 5
                          }}
                          onClick={atualizarInfo}
                        >
                          Confirmar
                        </Button>
                      </Grid>

                    </Grid>

                  </Grid>
                </Box>
              )}

              {isAlterarSenhaClicked && (<AlteracaoSenha />)}

            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}
