import { Request, Response } from 'express';
import RegisterModel, { Register } from '../models/Register';
import mongoose from 'mongoose';
import { handleError } from './controller';

/**
 * Crea un nuevo registro en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se crea el registro.
 */
export const createRegister = async (req: Request, res: Response) => {
  try {
    const registerData: Register = req.body;
    const register = await saveRegister(registerData);
    res.status(201).json({ message: 'Etiqueta creada con éxito', register });
  } catch (error) {
    handleError(res, error, 'Error al crear el registro');
  }
};

/**
 * Guarda un nuevo registro en la base de datos.
 * @param {Register} registerData - Los datos del registro a guardar.
 * @returns {Promise<Register>} Una promesa que se resuelve una vez que se guarda el registro.
 */
const saveRegister = async (registerData: Register) => {
  const register = new RegisterModel(registerData);
  return await register.save();
}