const { Router } = require('express') // ? Importamos módulo express para poder utilizar Router
const {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask
} = require('../controllers/tasks.controller') // ? Importamos el controlador de tareas

const router = Router() // ? Instanciamos o Router

router.get('/tasks', getAllTasks)

router.get('/tasks/:id', getTask)

router.post('/tasks', createTask)

router.delete('/tasks/:id', deleteTask)

router.put('/tasks/:id', updateTask)

// * Ejemplo para revizar la connexión a la base de datos:
// router.get('/tasks', testBD)

module.exports = router // ? Exportamos el router a index.js
