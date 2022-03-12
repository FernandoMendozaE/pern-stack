const express = require('express') // ? Importando módulo express
const morgan = require('morgan') // ? Importando módulo morgan
const cors = require('cors') // ? Importando módulo cors

const taskRoutes = require('./routes/task.routes') // ? Importando rutas

const app = express()

app.use(cors()) // ? Usamos módulo cors, para permitir peticiones desde cualquier origen
app.use(morgan('dev'))
app.use(express.json()) // ? Permite que los datos sean enviados en formato JSON

app.use(taskRoutes) // ? Utilizando rutas
app.use((err, req, res, next) => {
  return res.status(400).json({
    message: err.message,
  })
}) // ? Middleware para manejar errores

app.listen(4000)
console.log('Server running on port 4000')
