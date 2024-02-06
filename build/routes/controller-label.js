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
exports.createLabel = void 0;
const Label_1 = __importDefault(require("../models/Label"));
const mongoose_1 = __importDefault(require("mongoose"));
const createLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        //const result = await db.collection(LABEL_DATABASE).insertOne({...req.body, createdAt: new Date()});
        //res.status(201).json({ message: 'Etiqueta creada con éxito', result });
        // Validar los datos de entrada según la interfaz Label
        const { color, icon, id, section, name } = req.body;
        console.log("Body", req.body);
        // Verificar si se proporcionaron todos los campos requeridos
        if (!color || !icon) {
            return res.status(400).json({ message: 'Se requieren color e icono para crear una etiqueta' });
        }
        console.log("Vamos a crear una instancia del modelo Label.");
        // Crear una instancia del modelo Label con los datos proporcionados
        let label = new Label_1.default({ color, icon, id, section, name });
        if (!label._id) {
            // Generar un nuevo _id si no está asignado
            label._id = new mongoose_1.default.Types.ObjectId();
        }
        console.log("Creamos instancia", label);
        // Guardar la etiqueta en la base de datos
        yield label.save();
        console.log("Guardamos instancia");
        // Responder al cliente con un mensaje de éxito
        res.status(201).json({ message: 'Etiqueta creada con éxito', label });
        // Cerrar la conexión con la base de datos
        //disconnect();
    }
    catch (error) {
        console.log("Error", error);
        res.status(500).json({ message: 'Error al crear la etiqueta', error: error });
    }
});
exports.createLabel = createLabel;
