"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.supabase = void 0;
const express = require('express');
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../vars.env') });
const morgan = require('morgan');
const cors = require('cors');
const db_connection_1 = require("./libs/db-connection");
const routes_1 = require("./routes/routes");
const supabase_js_1 = require("@supabase/supabase-js");
const app = express();
const port = process.env.PORT || 3000;
exports.supabase = (0, supabase_js_1.createClient)(process.env.SUP_URL || '', process.env.SUP_KEY || '');
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
