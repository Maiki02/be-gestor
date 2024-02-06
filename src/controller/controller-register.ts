import { Request, Response } from 'express';
import RegisterModel, { RegisterI } from '../models/Register';
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
    const registerData: RegisterI = req.body;
    const register = await saveRegister(registerData);
    res.status(201).json({ message: 'Etiqueta creada con éxito', register });
  } catch (error) {
    handleError(res, error, 'Error al crear el registro');
  }
};

/**
 * Elimina un registro de la base de datos cambiando su estado a 0.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los parámetros de la ruta.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la eliminación del registro.
 */
export const deleteRegister = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const register = await updateRegisterStatus(id);
    if (!register) {
      return res.status(404).json({ message: 'No se encontró el registro para eliminar' });
    }
    res.status(200).json({ message: 'Registro eliminado con éxito', register });
  } catch (error) {
    handleError(res, error, 'Error al eliminar el registro');
  }
}

/**
 * Actualiza un registro existente en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los datos del registro a actualizar.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización del registro.
 */
export const updateRegister = async (req: Request, res: Response) => {
  try {
    const { _id, ...updatedRegisterData }: RegisterI = req.body;
    
    // Verificar si se proporcionó el _id
    if (!_id) {
      return res.status(400).json({ message: 'Se requiere proporcionar el _id del documento a actualizar' });
    }
    
    // Actualizar el registro en la base de datos
    const updatedRegister = await RegisterModel.findByIdAndUpdate(_id, updatedRegisterData, { new: true });
    
    // Verificar si se encontró el registro
    if (!updatedRegister) {
      return res.status(404).json({ message: 'No se encontró el registro para actualizar' });
    }
    
    res.status(200).json({ message: 'Registro actualizado con éxito', register: updatedRegister });
  } catch (error) {
    handleError(res, error, 'Error al actualizar el registro');
  }
}

/**
 * Obtiene todos los registros de la base de datos dependiendo la section.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se obtienen los registros.
 */
export const getRegistersBySection = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;
    const registers = await RegisterModel.find({ section, status: 1 });
    res.status(200).json({ message: 'Registros obtenidos con éxito', registers });
  } catch (error) {
    handleError(res, error, 'Error al obtener los registros');
  }
}




/**
 * Guarda un nuevo registro en la base de datos.
 * @param {RegisterI} registerData - Los datos del registro a guardar.
 * @returns {Promise<RegisterI>} Una promesa que se resuelve una vez que se guarda el registro.
 */
const saveRegister = async (registerData: RegisterI) => {
  const register = new RegisterModel(registerData);
  return await register.save();
}

/**
 * Actualiza el estado de un registro en la base de datos.
 * @param {string} id - El ID del registro a actualizar.
 * @returns {Promise<RegisterI | null>} Una promesa que se resuelve una vez que se actualiza el registro.
 */
const updateRegisterStatus = async (id: string) => {
  return await RegisterModel.findByIdAndUpdate(id, { status: 0 }, { new: true });
}