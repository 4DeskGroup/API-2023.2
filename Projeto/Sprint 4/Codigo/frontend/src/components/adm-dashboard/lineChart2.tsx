import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Axios from "axios";

interface DadosGraficoLinha {
  name: string;
  valor: number;
}

// const dadosExemploLinha: DadosGraficoLinha[] = [
//   { name: "SP", valor: 30 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 40 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 20 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 30 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 90 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   { name: "RJ", valor: 50 },
//   // Adicione mais dados conforme necessário
// ];

const GraficoLinha2: React.FC = () => {

  const [dadosExemploLinha, setDadosGraficoLinha] = React.useState<DadosGraficoLinha[]>([]);
  const GETParceiros = async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_BaseURL}/GETEstabelecimentoPorEstado`
      );
      console.log(response.data.estabelecimentos);
      
      if (response.data.estabelecimentos) {
        setDadosGraficoLinha(JSON.parse(response.data.estabelecimentos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    GETParceiros();
  }, []);

  return (
    <div
    style={{
      width: "100%",
      height: "100%",
      border: "1px solid #000",
      borderColor: "grey",
      borderRadius: "10px",
    }}
  >
    <h2 style={{ fontFamily: "actor", marginLeft: "5%" }}>Estabelecimentos por Estado</h2>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={dadosExemploLinha}
        margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="valor" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
};

export default GraficoLinha2;
