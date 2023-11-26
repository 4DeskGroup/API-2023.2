import * as React from 'react';
import { Paper, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Axios from "axios";

interface DadosGraficoBarra {
  name: string;
  valor: string;
}

// const dadosExemploBarra: DadosGraficoBarra[] = [
//   { name: "Parceiro A", valor: 30 },
//   { name: "Parceiro B", valor: 100 },
//   // Adicione mais dados conforme necessário
// ];

const GraficoBarra: React.FC = () => {

  const [dadosExemploBarra, setDadosGraficoBarra] = React.useState<DadosGraficoBarra[]>([]);

  const GETTopParceiro = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BaseURL}/GETTopParceiro`
      );
      console.log(response.data.topParceiros);
      
      if (response.data.topParceiros) {
        setDadosGraficoBarra(JSON.parse(response.data.topParceiros));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GETTopParceiro();
  }, []);

  return (
    <Paper
      style={{
        width: "100%",
        height: "95%",
        border: "1px solid #000",
        borderColor: "grey",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h2 style={{ fontFamily: "actor", marginTop:"-1%" }}>
        Parceiros que mais Coletaram Óleo
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dadosExemploBarra}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="valor" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default GraficoBarra;


