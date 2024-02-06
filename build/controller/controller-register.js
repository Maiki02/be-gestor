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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistersBySection = exports.updateRegister = exports.deleteRegister = exports.createRegister = void 0;
const Register_1 = __importDefault(require("../models/Register"));
const controller_1 = require("./controller");
/**
 * Crea un nuevo registro en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se crea el registro.
 */
const createRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registerData = req.body;
        const register = yield saveRegister(registerData);
        res.status(201).json({ message: 'Etiqueta creada con éxito', register });
    }
    catch (error) {
        (0, controller_1.handleError)(res, error, 'Error al crear el registro');
    }
});
exports.createRegister = createRegister;
/**
 * Elimina un registro de la base de datos cambiando su estado a 0.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los parámetros de la ruta.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la eliminación del registro.
 */
const deleteRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const register = yield updateRegisterStatus(id);
        if (!register) {
            return res.status(404).json({ message: 'No se encontró el registro para eliminar' });
        }
        res.status(200).json({ message: 'Registro eliminado con éxito', register });
    }
    catch (error) {
        (0, controller_1.handleError)(res, error, 'Error al eliminar el registro');
    }
});
exports.deleteRegister = deleteRegister;
/**
 * Actualiza un registro existente en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los datos del registro a actualizar.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización del registro.
 */
const updateRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { _id } = _a, updatedRegisterData = __rest(_a, ["_id"]);
        // Verificar si se proporcionó el _id
        if (!_id) {
            return res.status(400).json({ message: 'Se requiere proporcionar el _id del documento a actualizar' });
        }
        // Actualizar el registro en la base de datos
        const updatedRegister = yield Register_1.default.findByIdAndUpdate(_id, updatedRegisterData, { new: true });
        // Verificar si se encontró el registro
        if (!updatedRegister) {
            return res.status(404).json({ message: 'No se encontró el registro para actualizar' });
        }
        res.status(200).json({ message: 'Registro actualizado con éxito', register: updatedRegister });
    }
    catch (error) {
        (0, controller_1.handleError)(res, error, 'Error al actualizar el registro');
    }
});
exports.updateRegister = updateRegister;
/**
 * Obtiene todos los registros de la base de datos dependiendo la section.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se obtienen los registros.
 */
const getRegistersBySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { section } = req.params;
        const registers = yield Register_1.default.find({ section, status: 1 });
        res.status(200).json({ message: 'Registros obtenidos con éxito', registers });
    }
    catch (error) {
        (0, controller_1.handleError)(res, error, 'Error al obtener los registros');
    }
});
exports.getRegistersBySection = getRegistersBySection;
/**
 * Guarda un nuevo registro en la base de datos.
 * @param {RegisterI} registerData - Los datos del registro a guardar.
 * @returns {Promise<RegisterI>} Una promesa que se resuelve una vez que se guarda el registro.
 */
const saveRegister = (registerData) => __awaiter(void 0, void 0, void 0, function* () {
    const register = new Register_1.default(registerData);
    return yield register.save();
});
/**
 * Actualiza el estado de un registro en la base de datos.
 * @param {string} id - El ID del registro a actualizar.
 * @returns {Promise<RegisterI | null>} Una promesa que se resuelve una vez que se actualiza el registro.
 */
const updateRegisterStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Register_1.default.findByIdAndUpdate(id, { status: 0 }, { new: true });
});
