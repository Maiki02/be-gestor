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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Lee la URI de conexión desde las variables de entorno
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'test';
// Conecta a la base de datos MongoDB
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Conexión a la base de datos
            yield mongoose_1.default.connect(url, {
                dbName: dbName,
                autoIndex: true, // Crea índices automáticamente para acelerar las consultas      
                //useCreateIndex: true, // Usar índices para acelerar las consultas
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
                //useFindAndModify: false // Deshabilitar findAndModify para usar findOneAndUpdate, findOneAndDelete
            });
            console.log('Conexión a la base de datos exitosa');
        }
        catch (error) {
            console.error('Error al conectar a la base de datos:', error);
            throw error; // Propaga el error para que pueda ser manejado por el código que llama a esta función
        }
    });
}
exports.connectToDatabase = connectToDatabase;
// Desconecta de la base de datos MongoDB
function disconnectFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Desconexión de la base de datos
            yield mongoose_1.default.disconnect();
            console.log('Desconexión de la base de datos exitosa');
        }
        catch (error) {
            console.error('Error al desconectar de la base de datos:', error);
            throw error; // Propaga el error para que pueda ser manejado por el código que llama a esta función
        }
    });
}
exports.disconnectFromDatabase = disconnectFromDatabase;
