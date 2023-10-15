import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import limpo from "../images/limpo.png";
import usado from "../images/usado.png";
import { Autocomplete, Stack } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { MyToast } from "../Alerts/swal-mixin";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ParTransacao() {
  // const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [selectedButton, setSelectedButton] = React.useState("Transação");
  const [estabelecimentos, setEstabelecimentos] = React.useState<
    { EstabelecimentoNomeFantasia: string }[]
  >([]);
  const [selectedEstabelecimento, setSelectedEstabelecimento] =
    React.useState("");
  const [quantidadeEstoque, setQuantidadeEstoque] = React.useState(0);
  const [selectedGroup1, setSelectedGroup1] = React.useState("");

  const handleGroup1ButtonClick = (
    buttonName: React.SetStateAction<string>
  ) => {
    setSelectedGroup1(buttonName);
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

  const [count1, setCount1] = React.useState(1);
  const [count2, setCount2] = React.useState(1);
  const [IsPossible, setIsPossible] = React.useState(false);

  const listaEstabelecimentos = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3001/recupera-estabelecimentos"
      );

      if (response.data.Estabelecimentos) {
        setEstabelecimentos(response.data.Estabelecimentos);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    listaEstabelecimentos();
  }, []);

  const montaObjEstabelecimento = async (nomeFantasia: any) => {
    const resultado = await Axios.get(
      `http://localhost:3001/GETEstabelecimentoByNomeFantasia/${nomeFantasia}`
    );
    if (resultado.data.Estabelecimento) {
      const estabelecimento = resultado.data.Estabelecimento;
      sessionStorage.setItem(
        "EstabelecimentoID",
        estabelecimento.EstabelecimentoID
      );
    }
  };

  const handleEstabelecimentoChange = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    if (newValue) {
      // Verifique se o novo valor está na lista de estabelecimentos
      if (
        estabelecimentos.some(
          (estabelecimento) =>
            estabelecimento.EstabelecimentoNomeFantasia === newValue
        )
      ) {
        setSelectedEstabelecimento(newValue);
        montaObjEstabelecimento(newValue);
      }
    }
  };

  const recuperaEstabelecimentoEstoque = async () => {
    const tipoOleo = sessionStorage.getItem("tipoOleo");
    const estabelecimentoID = sessionStorage.getItem("EstabelecimentoID");

    if (estabelecimentoID) {
      const result = await Axios.get(
        `http://localhost:3001/GETEstabelecimentoEstoquePorTipo/${estabelecimentoID}/${tipoOleo}`
      );

      if (result.data.EstabelecimentoEstoque) {
        const estabEstoque = result.data.EstabelecimentoEstoque;
        sessionStorage.setItem("estabEstoque", JSON.stringify(estabEstoque));
        setQuantidadeEstoque(
          estabEstoque.EstabelecimentoEstoqueProdutoQuantidade
        );
      }
    } else {
      MyToast.fire({
        icon: "warning",
        title: "Selecione um estabelecimento.",
      });
      setSelectedGroup1("");
    }
  };

  const ValidaCampos = () => {
    const creditoParceiro = sessionStorage.getItem("ParceiroCredito");

    if (creditoParceiro) {
      const creditoParceiroNumerico = parseInt(creditoParceiro, 10);

      if (count1 > creditoParceiroNumerico) {
        return { IsSucesso: false, msg: "Saldo insuficiente." };
      }
    }

    if (sessionStorage.getItem("EstabelecimentoID") === null) {
      return {
        IsSucesso: false,
        msg: "É necessário selecionar um estabelecimento e um tipo de óleo.",
      };
    }

    if (count1 === 0) {
      return { IsSucesso: false, msg: "Quantidade não pode ser zero." };
    }
    if (count1 > quantidadeEstoque) {
      return {
        IsSucesso: false,
        msg: "Quantidade insuficiente no estoque do estabelecimento.",
      };
    }

    return { IsSucesso: true, msg: "Correto" };
  };

  const limparSessao = () => {
    sessionStorage.removeItem("EstabelecimentoID");
    sessionStorage.removeItem("tipoOleo");
    sessionStorage.removeItem("estabEstoque");
  };

  const tranferirOleo = async () => {
    const retornoValidaCampos = await ValidaCampos();

    if (retornoValidaCampos.IsSucesso) {
      const usuarioJson = sessionStorage.getItem("UsuarioLogado");
      const estabEstoqueJSON = sessionStorage.getItem("estabEstoque");
      const estabelecimentoID = sessionStorage.getItem("EstabelecimentoID");
      const dataAtual = new Date().toLocaleString();

      if (usuarioJson && estabEstoqueJSON && estabelecimentoID) {
        const usuarioObj = JSON.parse(usuarioJson);
        const estabEstoqueObj = JSON.parse(estabEstoqueJSON);

        const transacaoEstabelecimentoParceiro = {
          TransacaoEstabelecimentoParceiroData: dataAtual,
          EstabelecimentoEstoqueProdutoDescricao:
            estabEstoqueObj.EstabelecimentoEstoqueProdutoDescricao,
          EstabelecimentoEstoqueTipo:
            estabEstoqueObj.EstabelecimentoEstoqueTipo,
          EstabelecimentoEstoqueProdutoQuantidade: count1,
          ParceiroCreditoQuantidade: count1,
        };

        const resultado = await Axios.post(
          "http://localhost:3001/POSTTransacaoParceiroEstabelecimento",
          {
            EstabelecimentoID: estabelecimentoID,
            EstabelecimentoEstoqueID: estabEstoqueObj.EstabelecimentoEstoqueID,
            UsuarioID: usuarioObj.UsuarioID,
            transacaoEstabelecimentoParceiro: transacaoEstabelecimentoParceiro,
          }
        );

        if (resultado.data.Sucesso) {
          setIsPossible(true);
          MyToast.fire({
            icon: "success",
            title: resultado.data.msg,
            // background: "#90ee90"
          }).then(() => {
            window.location.reload();
            limparSessao();
          });
        }

        if (!resultado.data.Sucesso) {
          MyToast.fire({
            icon: "error",
            title: resultado.data.msg,
            // background: "#90ee90"
          });
        }
      }
    } else {
      setIsPossible(true);
      MyToast.fire({
        icon: "warning",
        title: retornoValidaCampos.msg,
        // background: "#90ee90"
      }).then(() => setIsPossible(false));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          position: "fixed",
          top: "38%",
          border: "1px solid #000",
          borderColor: "grey",
          borderRadius: "10px",
          width: "65%",
          height: "52%",
          zIndex: 0,
          marginLeft: "0%",
        }}
      ></div>

      <div
        style={{
          position: "fixed",
          top: "46%",
          // width: '100%',
          // zIndex: 1000,
          marginLeft: "2%",
        }}
      >
        {/* TEXTO */}
        <Box sx={{ flexGrow: 1, marginLeft: "0%", marginTop: "-6%" }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={10}>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <ArrowForwardIcon
                      sx={{
                        color: "#136935",
                      }}
                    />
                  </ListItemIcon>
                  <Typography variant="h5">Transferir Greenneats</Typography>
                </ListItem>
              </List>

              {/* SELECIONAR O ESTABELECIMENTO JÁ EXISTENTE*/}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={estabelecimentos.map(
                  (estabelecimento) =>
                    estabelecimento.EstabelecimentoNomeFantasia
                )}
                value={selectedEstabelecimento}
                onChange={handleEstabelecimentoChange}
                sx={{ width: 900 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Estabelecimento que deseja transferir"
                  />
                )}
              />
            </Grid>

            {/* DEFINIÇÃO DE QUANTIDADE */}
            <Grid item xs={6} md={5}>
              <List
                sx={{
                  marginLeft: "-12%",
                  mt: "-2%",
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    inset
                    primary="Defina a quantidade de greenneats:"
                  />
                </ListItem>
              </List>

              <div
                style={{
                  border: "1px solid #000",
                  borderColor: "grey",
                  padding: "1px",
                  borderRadius: "10px",
                  width: "33%",
                  height: "80px",
                  marginLeft: "12%",
                  marginTop: "3%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "6%",
                  }}
                >
                  {/* BOTÃO - */}
                  <Button
                    id="button1"
                    aria-label="reduce"
                    onClick={() => {
                      setCount1(Math.max(count1 - 1, 0));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>

                  {/* NÚMERO CONTAGEM */}
                  <Badge color="secondary">
                    <span style={{ fontSize: "24px" }}>{count1}</span>
                  </Badge>

                  {/* BOTÃO + */}
                  <Button
                    id="button2"
                    aria-label="increase"
                    onClick={() => {
                      setCount1(count1 + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </div>

                {/* TEXTO */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ fontSize: "70%", marginLeft: "2%" }}>
                    greenneats
                  </div>
                </div>
              </div>
            </Grid>

            {/* DEFINIÇÃO DE LITROS */}
            <Grid item xs={6} md={5}>
              {/* TEXTO */}
              <List
                sx={{
                  marginLeft: "-40%",
                  mt: "-8%",
                  width:"200%"
                }}
              >
                <ListItem disablePadding>
                  <ListItemText
                    inset
                    primary="Selecione o tipo de óleo e quantidade:"
                    sx={{mt:"-2%"}}
                  />
                  <div style={{ width:"400px", marginLeft:"-15%", marginTop:"4%"}}>
                  <ListItemText
                    inset
                    primary="Quantidade em estoque:"
                    sx={{ml:"-25%", mt:"0%"}}
                  />
                    <div
                style={{
                  border: "1px solid #000",
                  borderColor: "grey",
                  padding: "1px",
                  borderRadius: "10px",
                  width: "30%",
                  height: "40px",
                  marginLeft: "0%",
                  marginTop: "3%",
                }}
              >
                    <Box sx={{ml:"27%", mt:"9%"}}>{quantidadeEstoque} Litros</Box>
                    </div>
                  </div>
                </ListItem>
              </List>

              <div style={{ display: "flex", alignItems: "center", marginLeft:"-40%", marginTop:"-5%" }}>
                {/* Contêiner para os botões 'usado' e 'limpo' */}
                <div
                  id="containerBotoes"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "45%",
                  }}
                >
                  {/* BOTÃO ÓLEO LIMPO */}
                  <div
                    style={{
                      marginLeft: "10%",
                      width: "30%",
                    }}
                  >
                    <Button
                      sx={{
                        height: "100px",
                        borderRadius: "20px",
                        backgroundColor:
                          selectedGroup1 === "limpo"
                            ? "#YourSelectedColor"
                            : "transparent",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleGroup1ButtonClick("limpo");
                        sessionStorage.setItem("tipoOleo", "limpo");
                        recuperaEstabelecimentoEstoque();
                      }}
                    >
                      <img
                        src={limpo}
                        alt="png"
                        style={{
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "100%",
                        }}
                      />
                    </Button>
                    {/* TEXTO */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "70%",
                          marginLeft: "2%",
                          marginTop: "5%",
                        }}
                      >
                        limpo
                      </div>
                    </div>
                  </div>

                  {/* BOTÃO ÓLEO USADO */}
                  <div
                    style={{
                      marginRight: "15%",
                      width: "30%",
                    }}
                  >
                    <Button
                      sx={{
                        height: "100px",
                        borderRadius: "20px",
                        backgroundColor:
                          selectedGroup1 === "usado"
                            ? "#YourSelectedColor"
                            : "transparent",
                      }}
                      variant="contained"
                      onClick={() => {
                        handleGroup1ButtonClick("usado");
                        sessionStorage.setItem("tipoOleo", "usado");
                        recuperaEstabelecimentoEstoque();
                      }}
                    >
                      <img
                        src={usado}
                        alt="png"
                        style={{
                          marginRight: "auto",
                          marginLeft: "auto",
                          width: "100%",
                        }}
                      />
                    </Button>
                    {/* TEXTO */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "70%",
                          marginLeft: "2%",
                          marginTop: "5%",
                        }}
                      >
                        usado
                      </div>
                    </div>
                  </div>
                </div>

                {/* Div 'maisemenos' */}
                <div
                  id="maisemenos"
                  style={{
                    marginLeft: "0%",
                    border: "1px solid #000",
                    borderColor: "grey",
                    padding: "1px",
                    borderRadius: "10px",
                    width: "20%",
                    height: "70px",
                    marginTop: "-3%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "7%",
                    }}
                  >
                    {/* BOTÃO - */}
                    <Button
                      id="button3"
                      aria-label="reduce"
                      onClick={() => {
                        setCount2(Math.max(count2 - 1, 0));
                      }}
                    >
                      {/* <RemoveIcon fontSize="small" /> */}
                    </Button>

                    {/* NÚMERO CONTAGEM */}
                    <Badge color="secondary">
                      <span style={{ fontSize: "24px" }}>{count1}</span>
                    </Badge>

                    {/* BOTÃO + */}
                    <Button
                      id="button4"
                      aria-label="increase"
                      onClick={() => {
                        setCount2(count1 + 1);
                      }}
                    >
                      {/* <AddIcon fontSize="small" /> */}
                    </Button>
                  </div>

                  {/* TEXTO */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "70%",
                        marginLeft: "2%",
                        marginTop: "2%",
                      }}
                    >
                      litros
                    </div>
                  </div>
                </div>
              </div>
            </Grid>

            {/* BOTÕES DE BAIXO */}
            <Grid item xs={6} md={10}>
              <ThemeProvider theme={theme}>
                <Box sx={{ width: "auto", marginTop: "0%" }}>
                  <Stack spacing={3} direction="row">
                    {/*BOTÃO CANCELAR*/}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "35%",
                      }}
                    >
                      <Button
                        variant={
                          selectedButton === "cancelar"
                            ? "contained"
                            : "outlined"
                        }
                      >
                        cancelar
                      </Button>

                      <Box sx={{ width: "15%" }} />

                      {/*BOTÃO TRANSFERIR*/}
                      <Button
                        variant={
                          selectedButton === "Transação"
                            ? "contained"
                            : "outlined"
                        }
                        disabled={IsPossible}
                        onClick={tranferirOleo}
                      >
                        transferir
                      </Button>
                    </div>
                  </Stack>
                </Box>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Box>
      </div>
    </ThemeProvider>
  );
}
