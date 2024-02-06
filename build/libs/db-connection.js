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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const path = __importStar(require("path"));
// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../mongodb.env') });
// Lee la URI de conexión desde las variables de entorno
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'test';
console.log(url);
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
