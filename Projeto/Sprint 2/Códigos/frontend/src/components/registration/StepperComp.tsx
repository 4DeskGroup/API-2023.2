import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormRegistration1 from "./fields-registration-1";
import FormRegistration2 from "./fields-registration-2";
import FormRegistration3Parc from "./fields-registration-3-parc";
import FormRegistration3Estab from "./fields-registration-3-estab";
import Axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
const steps = ["Tipo de usuário", "Dados da Conta", "Complete as informações"];

export default function StepperComp() {
  //Controle dos campos
  const [dadosStep2, setDadosStep2] = React.useState({
    NomeUsuario: "",
    Email: "",
    Senha: "",
    confirmSenha: "",
  });
  const [dadosStep3Parc, setDadosStep3Parc] = React.useState({
    RazaoSocial: "",
    NomeFantasia: "",
    cnpj: "",
    DataInicioOp: "",
    ResponsavelEmpresa: "",
    VolumeOleo: "",
    Endereco: "",
    Numero: "",
    Bairro: "",
    Cidade: "",
    uf: "",
    CidadesAtendem: "",
    Parceiros: "",
  });
  const [dadosStep3Estab, setDadosStep3Estab] = React.useState({
    RazaoSocial: "",
    NomeFantasia: "",
    cnpj: "",
    DataInicioOp: "",
    ResponsavelEmpresa: "",
    VolumeOleo: "",
    Endereco: "",
    Numero: "",
    Bairro: "",
    Cidade: "",
    uf: "",
    Parceiros: "",
  });
  const [senhasSaoDiferentes, setSenhasSaoDiferentes] = React.useState(false);

  const tipoUsuario = sessionStorage.getItem("dados_step_1");
  const navigate = useNavigate();

  const handleFieldChange_Step2 = (fieldData: any) => {
    setDadosStep2((prevData) => ({ ...prevData, ...fieldData }));
  };

  const handleFieldChange_Step3Parc = (fieldData: any) => {
    setDadosStep3Parc((prevData) => ({ ...prevData, ...fieldData }));
  };

  const handleFieldChange_Step3Estab = (fieldData: any) => {
    setDadosStep3Estab((prevData) => ({ ...prevData, ...fieldData }));
  };

  const salvarSessao = (step: number) => {
    if (step === 1) {
      sessionStorage.setItem("dados_step_2", JSON.stringify(dadosStep2));
    }
  };

  const populaObjetos = () => {
    const itemJson_Step2 = sessionStorage.getItem("dados_step_2");
    const itemJson_Step3 = sessionStorage.getItem("dados_step_3");
    const dataCadastro = new Date().toLocaleString();

    if (itemJson_Step2 && itemJson_Step3) {
      const itensStep2 = JSON.parse(itemJson_Step2);
      const itensStep3 = JSON.parse(itemJson_Step3);
      const tipoUsuario = sessionStorage.getItem("dados_step_1");

      const usuario = {
        UsuarioNome: itensStep2.NomeUsuario,
        UsuarioSenha: itensStep2.Senha,
        UsuarioEmail: itensStep2.Email,
        UsuarioTipo: tipoUsuario,
        UsuarioDataCadastro: dataCadastro,
      };

      const estabelecimento = {
        EstabelecimentoNomeFantasia: itensStep3.NomeFantasia,
        EstabelecimentoNomeCompleto: itensStep3.RazaoSocial,
        EstabelecimentoResponsavel: itensStep3.ResponsavelEmpresa,
        EstabelecimentoCNPJ: itensStep3.cnpj,
        EstabelecimentoDataCadastro: itensStep3.DataInicioOp,
        EstabelecimentoVolumeOleoMensal: itensStep3.VolumeOleo,
        EstabelecimentoEndereco: itensStep3.Endereco,
        EstabelecimentoEnderecoNumero: itensStep3.Numero,
        EstabelecimentoBairro: itensStep3.Bairro,
        EstabelecimentoCidade: itensStep3.Cidade,
        EstabelecimentoUF: itensStep3.uf,
        EstabelecimentoPrincipaisParceiros: itensStep3.Parceiros,
      };

      const parceiro = {
        ParceiroNomeFantasia: itensStep3.NomeFantasia,
        ParceiroNomeCompleto: itensStep3.RazaoSocial,
        ParceiroResponsavel: itensStep3.ResponsavelEmpresa,
        ParceiroCNPJ: itensStep3.cnpj,
        ParceiroDataCadastro: itensStep3.DataInicioOp,
        ParceiroVolumeOleoMensal: itensStep3.VolumeOleo,
        ParceiroEndereco: itensStep3.Endereco,
        ParceiroEnderecoNumero: itensStep3.Numero,
        ParceiroBairro: itensStep3.Bairro,
        ParceiroCidade: itensStep3.Cidade,
        ParceiroUF: itensStep3.uf,
        ParceiroCidadesAtendimento: itensStep3.CidadesAtendem,
        ParceiroPrincipaisParceiros: itensStep3.Parceiros,
      };

      return { usuario, parceiro, estabelecimento };
    }
  };

  const validaEmail = async () => {
    try {
      const retorno = populaObjetos();
      const resultVerificaUsuario = await Axios.post(
        "http://localhost:3001/verifica-usuario",
        {
          email: retorno?.usuario.UsuarioEmail,
        }
      );

      if (resultVerificaUsuario.data.msg === "Email já existente") {
        MyToast.fire({
          icon: "warning",
          title: "Já existe um usuário com este email.",
          // background: '#FF5733'
        });
      }

      if (resultVerificaUsuario.data.msg === "Email válido para cadastro") {
        const response = await Axios.post("http://localhost:3001/sendEmail", {
          email: retorno?.usuario?.UsuarioEmail,
        });
        if (response.data.isSucesso) {
          const tokenFromServer = response.data.token;
          sessionStorage.setItem("TokenValidaEmail", tokenFromServer);

          const result = await Swal.fire({
            icon: "success",
            title: "Um token foi enviado ao seu email, insira-o abaixo",
            html: `<input type="text" id="token" class="swal2-input" placeholder="Token">`,
            confirmButtonColor: green[900],
            preConfirm: () => {
              const tokenInput: HTMLInputElement | null =
                Swal.getPopup()?.querySelector("#token") || null;

              if (tokenInput) {
                const tokenEscrito = tokenInput.value;
                console.log("Token escrito:", tokenEscrito);
                return { tokenEscrito };
              } else {
                console.error("Elemento #token não encontrado.");
                return { tokenEscrito: null };
              }
            },
          });

          if (
            result.isConfirmed &&
            result.value.tokenEscrito === tokenFromServer
          ) {
            return true;
          } else {
            MyToast.fire({
              icon: "error",
              title: "Validação deu errado.",
            });
            return false;
          }
        }
      }
    } catch (error) {
      console.error("Erro na função validaEmail:", error);
      return false;
    }
  };

  const cadastrar = async () => {
    const retorno = populaObjetos();

    try {
      if (retorno?.usuario.UsuarioTipo === "Parceiro") {
        const resultValidaEmail = await validaEmail();
        if (resultValidaEmail) {
          await Axios.post("http://localhost:3001/cadastro-parceiro", {
            usuario: retorno.usuario,
            parceiro: retorno.parceiro,
          }).then((response) => {
            if (response.data.Sucesso) {
              sessionStorage.setItem(
                "UsuarioLogado",
                JSON.stringify(response.data.Usuario)
              );
              // navigate("/par-saldo")

              MyToast.fire({
                icon: "success",
                title: response.data.msg,
              }).then(() => navigate("/parceiro-saldo"));
            } else if (!response.data.Sucesso) {
              MyToast.fire({
                icon: "error",
                title: response.data.msg,
              });
            }
          });
        }
      }

      if (retorno?.usuario.UsuarioTipo === "Estabelecimento") {
        const resultValidaEmail = await validaEmail();
        if (resultValidaEmail) {
          await Axios.post("http://localhost:3001/cadastro-estabelecimento", {
            usuario: retorno.usuario,
            estabelecimento: retorno.estabelecimento,
          }).then((response) => {
            if (response.data.Sucesso) {
              sessionStorage.setItem(
                "UsuarioLogado",
                JSON.stringify(response.data.Usuario)
              );
              // navigate("/estabelecimento")

              MyToast.fire({
                icon: "success",
                title: response.data.msg,
              }).then(() => navigate("/estabelecimento-saldo"));
            } else if (!response.data.Sucesso) {
              MyToast.fire({
                icon: "error",
                title: response.data.msg,
              });
            }
          });
        }
      }
    } catch (erro) {
      console.log(erro);
    }
  };

  //Controle dos STEPS
  const [activeStep, setActiveStep] = React.useState(0);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = React.useState(false);
  const [isPrevButtonDisabled, setIsPrevButtonDisabled] = React.useState(true);
  const [btnContent, setBtnContent] = React.useState("Próximo passo");

  const lastStep = 2;

  const handleNext = () => {
    if (activeStep >= 0 && activeStep < lastStep) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setIsPrevButtonDisabled(false);
    }

    if (activeStep === 1) {
      setIsPrevButtonDisabled(false);
      setBtnContent("Finalizar");
    }

    if (activeStep === lastStep) {
      if (tipoUsuario === "Parceiro") {
        sessionStorage.setItem("dados_step_3", JSON.stringify(dadosStep3Parc));
      } else if (tipoUsuario === "Estabelecimento") {
        sessionStorage.setItem("dados_step_3", JSON.stringify(dadosStep3Estab));
      }

      cadastrar();
    }

    salvarSessao(activeStep);
  };

  const handlePreview = () => {
    if (activeStep <= 1) {
      setIsPrevButtonDisabled(true);
      setIsNextButtonDisabled(false);
    }
    if (activeStep >= 1) {
      setActiveStep(() => activeStep - 1);
      setIsNextButtonDisabled(false);
      setBtnContent("Próximo Passo");
    }

    const itemJson = sessionStorage.getItem("dados_step_2");
    const itemJson2 = sessionStorage.getItem("dados_step_3");

    if (itemJson && activeStep === 2) {
      const step2 = JSON.parse(itemJson);
      setDadosStep2({
        NomeUsuario: step2.NomeUsuario,
        Email: step2.Email,
        Senha: step2.Senha,
        confirmSenha: step2.confirmSenha,
      });
    }

    if (itemJson2 && activeStep === 1) {
      const step3 = JSON.parse(itemJson2);

      if (tipoUsuario === "Parceiro") {
        setDadosStep3Parc({
          RazaoSocial: step3.RazaoSocial,
          NomeFantasia: step3.NomeFantasia,
          cnpj: step3.cnpj,
          DataInicioOp: step3.DataInicioOp,
          ResponsavelEmpresa: step3.ResponsavelEmpresa,
          VolumeOleo: step3.VolumeOleo,
          Endereco: step3.Endereco,
          Numero: step3.Numero,
          Bairro: step3.Bairro,
          Cidade: step3.Cidade,
          uf: step3.uf,
          CidadesAtendem: step3.CidadesAtendem,
          Parceiros: step3.Parceiros,
        });
      }

      if (tipoUsuario === "Estabelecimento") {
        setDadosStep3Estab({
          RazaoSocial: step3.RazaoSocial,
          NomeFantasia: step3.NomeFantasia,
          cnpj: step3.cnpj,
          DataInicioOp: step3.DataInicioOp,
          ResponsavelEmpresa: step3.ResponsavelEmpresa,
          VolumeOleo: step3.VolumeOleo,
          Endereco: step3.Endereco,
          Numero: step3.Numero,
          Bairro: step3.Bairro,
          Cidade: step3.Cidade,
          uf: step3.uf,
          Parceiros: step3.Parceiros,
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <Box sx={{ width: "100%", mt: 20, ml: 0, color: "primary" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Container>
        {activeStep === 0 ? <FormRegistration1 /> : null}
        {activeStep === 1 ? (
          <FormRegistration2
            parametros={handleFieldChange_Step2}
            dados={dadosStep2}
            senhasCompativeis={setSenhasSaoDiferentes}
          />
        ) : null}
        {activeStep === 2 ? (
          tipoUsuario === "Parceiro" ? (
            <FormRegistration3Parc
              parametros={handleFieldChange_Step3Parc}
              dados={dadosStep3Parc}
            />
          ) : tipoUsuario === "Estabelecimento" ? (
            <FormRegistration3Estab
              parametros={handleFieldChange_Step3Estab}
              dados={dadosStep3Estab}
            />
          ) : null
        ) : null}

<Container maxWidth="sm">
  <Grid container spacing={1}>
    <Grid item xs={6}> {/* Dividir o espaço da grid igualmente em 2 colunas */}
      <Button
        variant="outlined"
        sx={{
          borderRadius: 20,
          width: '100%', // Use 100% da largura da coluna
          height: 40,
          mt: -3
        }}
        className="btn-prev-step"
        onClick={handlePreview}
        disabled={isPrevButtonDisabled}
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
          mt: -3
        }}
        className="btn-next-step"
        onClick={handleNext}
        disabled={isNextButtonDisabled || senhasSaoDiferentes}
      >
        {btnContent}
      </Button>
    </Grid>
  </Grid>
</Container>

        {/* <Container maxWidth="sm">
          <Grid container spacing={1}>
              <Button
                variant="outlined"
                sx={{
                  ml: 0,
                  mt: 0,
                  borderRadius: 20,
                  width: 250,
                  height: 40,
                }}
                className="btn-prev-step"
                onClick={handlePreview}
                disabled={isPrevButtonDisabled}
              >
                Retornar
              </Button>
          </Grid>

          <Grid container spacing={1}>
            <Button
              variant="outlined"
              sx={{
                ml: 35,
                mt: 0,
                borderRadius: 20,
                width: 250,
                height: 40,
              }}
              className="btn-next-step"
              onClick={handleNext}
              disabled={isNextButtonDisabled || senhasSaoDiferentes}
            >
              {btnContent}
            </Button>
          </Grid>
        </Container> */}
      </React.Fragment>
    </ThemeProvider>
  );
}
