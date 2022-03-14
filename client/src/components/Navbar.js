import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom' // ? Importamos Link para poder usar el Router

export default function Navbar() {
  const navigate = useNavigate() // ? Usamos el navigate para poder navegar entre las paginas

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* // * FlexGrow: 1 para que el contenedor se expanda */}
      <AppBar position="static" color="transparent">
        <Container>
          {/* //* Toolbar: Contenedor de los elementos de la barra de navegación */}
          <Toolbar>
            {/* // * Typography: Para poder usar el titulo de la página 
                // * variant: 'h6' para que el titulo tenga un tamaño de h6 */}
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {/* // * textDecoration: 'none' para que no se tenga el link en el titulo */}
              <Link to="/" style={{ textDecoration: 'none', color: '#eee' }}>
                PERN Stack
              </Link>
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/tasks/new')}>
              New Task
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
