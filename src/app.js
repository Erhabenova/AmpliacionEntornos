const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de solicitudes JSON
app.use(express.json());
const cocheController = require('./controllers/CocheController');
app.use('/coches', cocheController);
app.use('/api/coches', cocheController);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});