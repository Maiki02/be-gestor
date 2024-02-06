"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
/**
 * Maneja un error y envía una respuesta de error al cliente.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @param {any} error - El error que ocurrió.
 * @param {string} errorMessage - El mensaje de error para enviar al cliente.
 */
const handleError = (res, error, errorMessage) => {
    res.status(500).json({ message: errorMessage, error });
};
exports.handleError = handleError;
