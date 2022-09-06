const pool = require('../db') // ? Importamos el objeto pool de la base de datos

// * Método para obtener todas las tareas
const getAllTasks = async (req, res, next) => {
  try {
    // ! throw new Error('Error') // ? Lanzamos un error para probar el middleware
    const allTasks = await pool.query('SELECT * FROM task')
    res.json(allTasks.rows)
  } catch (error) {
    next(error)
  }
}

// * Método para obtener una tarea
const getTask = async (req, res, next) => {
  try {
    const { id } = req.params // ? Obtenemos el id de la tarea
    const result = await pool.query('SELECT * FROM task WHERE id = $1', [id]) // ? Ejecutamos una consulta a la base de datos. ($1) es el parámetro que recibe la consulta. El primer parámetro es el nombre de la columna en la base de datos. El segundo parámetro es el valor que se le asignará a esa columna.

    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' }) // ? Si no encontramos la tarea, enviamos un error 404

    res.json(result.rows[0]) // ? Enviamos la respuesta de la base de datos
  } catch (error) {
    next(error)
  }
}

// * Método para crear una tarea
const createTask = async (req, res, next) => {
  const { title, description } = req.body

  try {
    const result = await pool.query(
      'INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    ) // ? Ejecutamos una consulta a la base de datos. ($1, $2) son los parámetros que recibe la consulta. El primer parámetro es el nombre de la columna en la base de datos. El segundo parámetro es el valor que se le asignará a esa columna. El tercer parámetro es el nombre de la columna que se quiere retornar.

    res.json(result.rows[0]) // ? Enviamos la respuesta de la base de datos
  } catch (error) {
    next(error)
  }
}

// * Método para eliminar una tarea
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params // ? Obtenemos el id de la tarea
    const result = await pool.query('DELETE FROM task WHERE id = $1', [id]) // ? Ejecutamos una consulta a la base de datos. ($1) es el parámetro que recibe la consulta. El primer parámetro es el nombre de la columna en la base de datos. El segundo parámetro es el valor que se le asignará a esa columna.

    if (result.rowCount === 0) return res.status(404).json({ message: 'Task not found' }) // ? Si no encontramos la tarea, enviamos un error 404

    return res.sendStatus(204) // ? Enviamos un status 204, que significa que se eliminó la tarea
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params // ? Obtenemos el id de la tarea
    const { title, description } = req.body // ? Obtenemos el título y la descripción de la tarea

    const result = await pool.query(
      'UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    ) // ? Ejecutamos una consulta a la base de datos. ($1, $2, $3) son los parámetros que recibe la consulta. El primer parámetro es el nombre de la columna en la base de datos. El segundo parámetro es el valor que se le asignará a esa columna. El tercer parámetro es id para realizar el update.

    if (result.rowCount === 0) return res.status(404).json({ message: 'Task not found' }) // ? Si no encontramos la tarea, enviamos un error 404

    return res.json(result.rows[0]) // ? Enviamos la respuesta de la base de datos
  } catch (error) {
    next(error)
  }
}

// * Método para verificar la conexión a la base de datos
const testBD = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT NOW()') // ? Ejecutamos una consulta a la base de datos
    res.json(result.rows[0].now) // ? Enviamos la respuesta de la base de datos
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
}
