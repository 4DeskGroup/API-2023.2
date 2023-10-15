import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import moeda from "../images/moeda.png";
import { ListItem } from '@mui/material';
import Axios from "axios"
import ParEstoqueQuantidade from './quantidade';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'right',
  color: theme.palette.text.secondary,
  border: '1px solid #4D524F',
  borderRadius: '15px',
  width: '70%',
  height: '80%'
}));

const CustomZero = styled('span')({
  fontSize: '400%',
  marginRight: '15%',
  color: '#136935'
});

export default function ParEmpSaldoComponent() {
  const [creditosParceiro, setCreditosParceiro] = React.useState(0)
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado")

  const recuperaParceiroCredito = async () => {
    if (usuarioLogado) {
      const usuarioJson = JSON.parse(usuarioLogado)

      try {
        const response = await Axios.get(`http://localhost:3001/recupera-credito-parceiro/${usuarioJson.UsuarioID}`)

        if (response.data.Sucesso) {
          setCreditosParceiro(response.data.ParceiroCredito)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  React.useEffect(() => {
    recuperaParceiroCredito()
  }, [])

  return (

    <div
      style={{
        position: 'fixed',
        top: '30%',
        width: '100%',
        zIndex: '-20%'
      }}
    >
    <ParEstoqueQuantidade/>

      <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={2} justifyContent="right" style={{ marginTop: '-10%', marginLeft:"-23%"  }}>

          <Grid item xs={4}>
            <Item>
              <ListItem
                sx={{ height: '2%' }}>Total:
              </ListItem>
              <CustomZero>{creditosParceiro}</CustomZero>
              <img src={moeda} alt="png" width="40px" style={{ marginRight: '20%' }} />
            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
  );
}
