import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import money from "../images/money.png";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function EstSaldoComponent() {
  return (
    <div
    style={{
      position: 'fixed',
      top: '20%',
      marginLeft: '25%',
      width: '100%',
    }}
  >

    <Box>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid item xs={6}>
        <List
      sx={{ width: '100%', maxWidth: 360 }}
      aria-label="contacts"
    >
      <ListItem disablePadding>
          <ListItemIcon>
            <img src={money} alt="png" width="40px" />
          </ListItemIcon>

          <Typography variant="h5">Saldo</Typography>
      </ListItem>
          <ListItem disablePadding>
            <ListItemText inset primary="Selecione a opção desejada:" />
          </ListItem>
        </List>
        </Grid>

      </Grid>
    </Box>
    </div>
  );
}

