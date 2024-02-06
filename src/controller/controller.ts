import { Response } from "express";

/**
 * Maneja un error y envía una respuesta de error al cliente.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @param {any} error - El error que ocurrió.
 * @param {string} errorMessage - El mensaje de error para enviar al cliente.
 */
export const handleError = (res: Response, error: any, errorMessage: string) => {
    res.status(500).json({ message: errorMessage, error });
};
  