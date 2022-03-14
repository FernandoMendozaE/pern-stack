import { Button, Card, CardContent, Typography } from '@mui/material'
import { useEffect, useState } from 'react' // ! Importando hooks, useState: para crear estados, useEffect: para ejecutar funciones en el render
import { useNavigate } from 'react-router-dom'

export default function TaskList() {
  // * Creando estados
  const [tasks, setTasks] = useState([])
  // * Instanciando el hook de navegación
  const navigate = useNavigate()

  // * Método loadTasks: carga las tareas al iniciar la página
  const loadTasks = async () => {
    const response = await fetch('http://localhost:4000/tasks')
    const data = await response.json()
    setTasks(data)
  }

  // * Función para eliminar tareas
  const handleDelete = async id => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
      })
      // ! Primera solución:
      // loadTasks()
      // ! Segunda solución:
      setTasks(tasks.filter(task => task.id !== id)) // ? Filtrando las tareas que no coinciden con el id, después se actualiza el estado
    } catch (error) {
      console.log(error)
    }
  }

  //* useEffect: para ejecutar funciones en el render, loadTasks: para cargar las tareas al iniciar la página
  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>Tasks List</h1>
      {tasks.map(task => (
        <Card
          key={task.id}
          style={{
            marginBottom: '0.7rem',
            backgroundColor: '#1e272e',
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ color: 'white' }}>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: '.5rem' }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
