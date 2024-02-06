const express = require('express');
const morgan= require('morgan');
const cors= require('cors');
import { connectToDatabase, disconnectFromDatabase } from './libs/db-connection';
import { router as routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

// Configuraciones
app.set('port', port);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rutas
app.use(routes);

// Establecer conexión a la base de datos al iniciar la aplicación
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

// Manejar la desconexión cuando la aplicación se detiene
const handleShutdown = async () => {
  try {
    await disconnectFromDatabase();
    console.log('Desconexión de la base de datos completada');
    process.exit(0);
  } catch (error) {
    console.error('Error al desconectar de la base de datos:', error);
    process.exit(1);
  }
};

process.on('SIGINT', handleShutdown);

// Iniciar el servidor al ejecutar el script
startServer();