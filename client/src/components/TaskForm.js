import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useState, useEffect } from 'react' // ! Importando hooks, useState: para crear estados, useEffect: para ejecutar funciones en el render
import { useNavigate } from 'react-router-dom' // ! Importando hooks, useNavigate: para navegar entre rutas
import { useParams } from 'react-router-dom'

export default function TaskForm() {
  // * Creando estados
  const [tasks, setTasks] = useState({
    title: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  // * Variables para navegar entre rutas
  const navigate = useNavigate() // ? Instanciando el hook de navegación
  const params = useParams() // ? Para obtener los parámetros de la ruta

  // * Método handleSubmit: captura los datos del formulario
  const handleSubmit = async e => {
    e.preventDefault() // ? Evita que se recargue la página

    setLoading(true) // ? Cambia el estado de loading a true

    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
      })
    } else {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        body: JSON.stringify(tasks), // ? Envía los datos del formulario, stringify: convierte el objeto en un string
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    setLoading(false) // ? Cambia el estado de loading a false
    navigate('/') // ? Navega a la ruta raíz
  }
  // * Método handleChange: captura los eventos de cambio de datos del formulario
  const handleChange = e => {
    // ? setTaks: método para actualizar el estado de la variable tasks
    setTasks({ ...tasks, [e.target.name]: e.target.value })
  }

  // * Método loadTasks: carga las tareas al iniciar la página
  const loadTask = async id => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data = await res.json()
    setTasks({ title: data.title, description: data.description }) // ? primera solución
    // setTasks(data) // ? segunda solucións
    setEditing(true)
  }

  // * Método useEffect: ejecuta una función en el render, [params.id]: se ejecuta sólo cuando el id cambia
  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }
  }, [params.id])

  return (
    // * direction: sirve para definir la dirección de la grilla, row: para filas, column: para columnas, alingItems: para alinear los elementos dentro de la grilla, justifyContent: para alinear los elementos dentro de la grilla
    <Grid container direction="column" alignItems="center" justifyContent="center">
      {/* // * item: para definir el tamaño de la celda */}
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ backgroundColor: '#1e272e', padding: '1rem' }}>
          <Typography variant="5" textAlign="center" color="white">
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* // * sx: sirve para definir estilos,  */}
              <TextField
                variant="filled"
                label="Write your title"
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                }}
                name="title"
                value={tasks.title ? tasks.title : ''}
                // * onChange: captura los datos del input
                onChange={handleChange}
                // * InputProps: sirve para definir propiedades de los inputs, style: sirve para definir estilos
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant="filled"
                label="Write your description"
                multiline
                rows={4}
                sx={{
                  display: 'block',
                  margin: '.5rem 0',
                }}
                name="description"
                value={tasks.description ? tasks.description : ''}
                // * onChange: captura los datos del input
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!tasks.title || !tasks.description}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
