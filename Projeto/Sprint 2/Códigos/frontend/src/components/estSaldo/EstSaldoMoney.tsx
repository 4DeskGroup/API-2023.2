import * as React from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import moeda from "../images/moeda.png";
import { ListItem } from '@mui/material';
import Axios from "axios"

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

export default function EstSaldoMoney() {
  const [creditoEstab, setCreditoEstab] = React.useState(0)
  const usuarioLogado = sessionStorage.getItem("UsuarioLogado")

  React.useEffect(() => {
    const recuperaEstabCredito = async () => {
      if (usuarioLogado) {
        const usuarioJson = JSON.parse(usuarioLogado)

        try {
          const response = await Axios.get(`http://localhost:3001/recupera-credito-estabelecimento/${usuarioJson.UsuarioID}`)

          if (response.data.Sucesso) {
            setCreditoEstab(response.data.EstabCredito)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }

    recuperaEstabCredito()
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: '20%',
        marginLeft: '0%',
        width: '100%',
      }}
    >
      <Box>
        <Grid container spacing={2} justifyContent="right">
          <Grid item xs={4}>
            <Item>
              <ListItem
                sx={{ height: '2%' }}>Total:
              </ListItem>
              <CustomZero>{creditoEstab}</CustomZero>
              <img src={moeda} alt="png" width="40px" style={{ marginRight: '20%' }} />
            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>

  );
}
