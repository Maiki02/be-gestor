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
exports.getLabels = exports.getLabelsBySection = exports.updateLabel = exports.deleteLabel = exports.createLabel = void 0;
const Label_1 = __importDefault(require("../models/Label"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Crea una nueva etiqueta en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se crea la etiqueta.
 */
const createLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const labelData = req.body;
        const label = yield saveLabel(labelData);
        res.status(201).json({ message: 'Etiqueta creada con éxito', label });
    }
    catch (error) {
        handleError(res, error, 'Error al crear la etiqueta');
    }
});
exports.createLabel = createLabel;
/**
 * Elimina una etiqueta de la base de datos cambiando su estado a 0.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los parámetros de la ruta.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la eliminación de la etiqueta.
 */
const deleteLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const label = yield updateLabelStatus(id);
        if (!label) {
            return res.status(404).json({ message: 'No se encontró la etiqueta para eliminar' });
        }
        res.status(200).json({ message: 'Etiqueta eliminada con éxito', label });
    }
    catch (error) {
        handleError(res, error, 'Error al eliminar la etiqueta');
    }
});
exports.deleteLabel = deleteLabel;
/**
 * Actualiza una etiqueta existente en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los datos de la etiqueta a actualizar.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización de la etiqueta.
 */
const updateLabel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { _id } = _a, updatedLabelData = __rest(_a, ["_id"]);
        // Verificar si se proporcionó el _id
        if (!_id) {
            return res.status(400).json({ message: 'Se requiere proporcionar el _id del documento a actualizar' });
        }
        // Actualizar la etiqueta en la base de datos
        const updatedLabel = yield Label_1.default.findByIdAndUpdate(_id, updatedLabelData, { new: true });
        // Verificar si se encontró la etiqueta
        if (!updatedLabel) {
            return res.status(404).json({ message: 'No se encontró la etiqueta para actualizar' });
        }
        // Responder al cliente con un mensaje de éxito y la etiqueta actualizada
        res.status(200).json({ message: 'Etiqueta actualizada con éxito', label: updatedLabel });
    }
    catch (error) {
        handleError(res, error, 'Error al actualizar la etiqueta');
    }
});
exports.updateLabel = updateLabel;
/**
 * Retrieves all labels from a specific section from the database.
 * @param {Request} req - The HTTP request object containing the section of the labels to retrieve.
 * @param {Response} res - The HTTP response object to send the response to the client.
 * @returns {Promise<void>} A promise that resolves once the labels retrieval is completed.
 */
const getLabelsBySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { section } = req.params;
        // Check if section is provided
        if (!section) {
            return res.status(400).json({ message: 'Section is required to retrieve labels' });
        }
        // Get all labels from the specified section
        const labels = yield Label_1.default.find({ section });
        // Respond to the client with the retrieved labels
        res.status(200).json({ message: 'Labels retrieved successfully', labels });
    }
    catch (error) {
        handleError(res, error, 'Error retrieving labels');
    }
});
exports.getLabelsBySection = getLabelsBySection;
/**
 * Guarda una nueva etiqueta en la base de datos.
 * @param {Label} labelData - Los datos de la etiqueta a guardar.
 * @returns {Promise<Label>} Una promesa que resuelve la etiqueta guardada.
 */
const saveLabel = (labelData) => __awaiter(void 0, void 0, void 0, function* () {
    let label = new Label_1.default(labelData);
    label._id = !label._id ? new mongoose_1.default.Types.ObjectId() : label._id;
    return yield label.save();
});
/**
 * Actualiza el estado de una etiqueta a 0 en la base de datos.
 * @param {string} id - El ID de la etiqueta a actualizar.
 * @returns {Promise<Label | null>} Una promesa que resuelve la etiqueta actualizada o null si no se encontró la etiqueta.
 */
const updateLabelStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Label_1.default.findByIdAndUpdate(id, { status: 0 }, { new: true });
});
/**
 * Maneja un error y envía una respuesta de error al cliente.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @param {any} error - El error que ocurrió.
 * @param {string} errorMessage - El mensaje de error para enviar al cliente.
 */
const handleError = (res, error, errorMessage) => {
    res.status(500).json({ message: errorMessage, error });
};
const getLabels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todas las etiquetas de la base de datos
        const labels = yield Label_1.default.find();
        // Responder al cliente con las etiquetas obtenidas
        res.status(200).json(labels);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las etiquetas', error: error });
    }
});
exports.getLabels = getLabels;
