import { BrowserRouter, Routes, Route } from 'react-router-dom' // ? Importando el módulo de rutas, BrowserRouter: para navegacion, Routes: para definir las rutas, Route: para definir una ruta
import TaskForm from './components/TaskForm' // ? Importando el componente TaskForm
import TaskList from './components/TaskList' // ? Importando el componente TaskList
import { Container } from '@mui/material' // ? Importando el componente Container de Material-UI
import Menu from './components/Navbar' // ? Importando el componente Navbar

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
