import { BrowserRouter, Routes, Route } from 'react-router-dom' // ? Importando el módulo de rutas, BrowserRouter: para navegacion, Routes: para definir las rutas, Route: para definir una ruta
import TaskForm from './components/TaskForm' // ? Importando el componente TaskForm
import TaskList from './components/TaskList' // ? Importando el componente TaskList

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/new" element={<TaskForm />} />
      </Routes>
    </BrowserRouter>
  )
}
