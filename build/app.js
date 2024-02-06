"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db_connection_1 = require("./libs/db-connection");
const routes_1 = require("./routes/routes");
const app = express();
const port = process.env.PORT || 3000;
// Configuraciones
app.set('port', port);
// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// Rutas
app.use(routes_1.router);
// Establecer conexión a la base de datos al iniciar la aplicación
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        });
    }
    catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
});
// Manejar la desconexión cuando la aplicación se detiene
const handleShutdown = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_connection_1.disconnectFromDatabase)();
        console.log('Desconexión de la base de datos completada');
        process.exit(0);
    }
    catch (error) {
        console.error('Error al desconectar de la base de datos:', error);
        process.exit(1);
    }
});
process.on('SIGINT', handleShutdown);
// Iniciar el servidor al ejecutar el script
startServer();
