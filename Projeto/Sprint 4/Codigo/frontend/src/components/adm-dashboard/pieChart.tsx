import * as React from 'react';
import { Paper, Typography, Grid } from "@mui/material";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Axios from "axios";

interface DadosGrafico {
  name: string;
  quantidade: number;
  cor: string;
}

const GraficoPizza: React.FC = () => {

  const [parceiroQuantidade, setParceiroQuantidade] = React.useState(0)
  const [estabelecimentoQuantidade, setEstabelecimentoQuantidade] = React.useState(0)

  const GETParceiroQuantidade = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BaseURL}/GETParceirosSistema`
      );
      if (response.data.parceiroQuantidade) {
        console.log(response.data.parceiroQuantidade);

        setParceiroQuantidade(Number(response.data.parceiroQuantidade));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GETEstabelecimentoQuantidade = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BaseURL}/GETEstabelecimentosSistema`
      );
      if (response.data.estabelecimentoQuantidade) {
        setEstabelecimentoQuantidade(Number(response.data.estabelecimentoQuantidade));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GETParceiroQuantidade();
    GETEstabelecimentoQuantidade();
  }, []);


  const dadosExemplo: DadosGrafico[] = [
    { name: "Parceiros", quantidade: parceiroQuantidade, cor: "#8884d8" },
    { name: "Estabelecimentos", quantidade: estabelecimentoQuantidade, cor: "#82ca9d" },
    // Adicione mais dados conforme necessário
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          style={{
            width: "90%",
            height: "100%",
            border: "1px solid #000",
            borderColor: "grey",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <h2 style={{ fontFamily: "actor", marginTop: "-1%" }}>
            Parceiros e Estabelecimentos no Sistema
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dadosExemplo}
                dataKey="quantidade"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {dadosExemplo.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.cor} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GraficoPizza;

