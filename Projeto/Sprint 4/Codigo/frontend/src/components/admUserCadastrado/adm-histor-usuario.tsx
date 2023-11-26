import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import Axios from "axios"
import Swal from "sweetalert2"
import { MyToast } from "../Alerts/swal-mixin";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
interface Usuarios {
  UsuarioID: string,
  UsuarioNome: string,
  UsuarioEmail: string,
  UsuarioTipo: string,
  UsuarioDataCadastro: string,
  UsuarioStatus: boolean
}

export default function AdmUsuarioHistorico() {
  const [listaUsuarios, setListaUsuarios] = React.useState<Usuarios[]>([])
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 7; // Define o número de linhas por página
 

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

  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(max-width: 10025px)"); // Tela maior que 1024px é considerada como PC

  const recuperarUsuarios = async () => {
    const result = await Axios.get(`${process.env.REACT_APP_BaseURL}/GETUsuarios`)

    if (result.data.Sucesso) {
      setListaUsuarios(result.data.Usuarios)
    }
  }

  React.useEffect(() => {
    recuperarUsuarios()
  }, [])

  const deletarUsuario = async (usuarioID: any) => {
    Swal.fire({
      icon: "warning",
      title: "Atenção",
      html: "Deseja realmente excluir este usuário?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      confirmButtonColor: "#136935",
      cancelButtonText: "Não",
    }).then(async (result) => {
      if (!result.isConfirmed) {
        return
      } else {
        const response = await Axios.put(`${process.env.REACT_APP_BaseURL}/PUTUsuarioStatusRegistro`, {
          usuarioID: usuarioID
        })

        if (response.data.Sucesso) {
          MyToast.fire({
            icon: 'success',
            title: response.data.msg
          }).then(() => window.location.reload())
        } else {
          MyToast.fire({
            icon: 'error',
            title: response.data.msg
          })
        }
      }
    })
  }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }

  const filteredUsers = listaUsuarios.filter(user =>
    user.UsuarioNome.toLowerCase().includes(searchText.toLowerCase()) ||
    user.UsuarioEmail.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={10}>
      <Grid item xs={12} sm={7} md={7} lg={7} xl={7}></Grid>
 
      <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
    <Paper
      component="form"
      sx={{  display: 'flex', alignItems: 'center', mt: -7,
      width: isMobile ? "80%" : isTablet ? "80%" : "100%",
      border: '1px solid #ccc',
      borderRadius: 10,  }}
    >
      <IconButton  aria-label="menu">
       
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquisa"
        inputProps={{ 'aria-label': 'Pesquisar' }}
        onChange={handleSearch}
      />
      <IconButton type="button"  aria-label="search">
        <SearchIcon />
      </IconButton>          
    </Paper>
    </Grid>
    </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
          <Box
            sx={{
              width: isMobile ? "100%" : isTablet ? "100%" : "100%",
              backgroundColor: "white",
              borderRadius: 5,
              borderColor: "gray",
              border: 1,
              mt: 2,
              display: 'flex',
              //alignItems: 'center',
              //justifyContent: 'center',
              height: '410px'
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">E-mail</TableCell>
                    <TableCell align="center">Tipo</TableCell>
                    <TableCell align="center">Data de cadastro</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      key={row.UsuarioID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">{row.UsuarioNome}</TableCell>
                      <TableCell align="center">{row.UsuarioEmail}</TableCell>
                      <TableCell align="center">{row.UsuarioTipo}</TableCell>
                      <TableCell align="center">{row.UsuarioDataCadastro}</TableCell>
                      {/* Célula de ações com ícones */}
                      <TableCell align="center">
                        {/* <IconButton size="small" >
                          <EditIcon />
                        </IconButton> */}
                        <IconButton size="small" onClick={() => deletarUsuario(row.UsuarioID)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
             
            </TableContainer>
          </Box>
        </Grid>
        <Pagination
            size="small"
            sx={{ ml: "53%", mt: "-2%", zIndex:500 }}
            count={Math.ceil(listaUsuarios.length / rowsPerPage)}
            page={page + 1} // Incrementado em 1 para mostrar página 1 em vez de 0
            onChange={(event, newPage) => {
              setPage(newPage - 1); // Decrementado em 1 para manter a consistência
            }}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
          />
      </Grid>
    </ThemeProvider>
  );
}