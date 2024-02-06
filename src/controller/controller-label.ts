import { Request, Response } from 'express';
import LabelModel, { LabelI } from '../models/Label';
import mongoose from 'mongoose';
import { handleError } from './controller';

/**
 * Crea una nueva etiqueta en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se crea la etiqueta.
 */
export const createLabel = async (req: Request, res: Response) => {
  try {
    const labelData: LabelI = req.body;
    const label = await saveLabel(labelData);
    res.status(201).json({ message: 'Etiqueta creada con éxito', label });
  } catch (error) {
    handleError(res, error, 'Error al crear la etiqueta');
  }
};

/**
 * Elimina una etiqueta de la base de datos cambiando su estado a 0.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los parámetros de la ruta.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la eliminación de la etiqueta.
 */
export const deleteLabel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const label = await updateLabelStatus(id);
    if (!label) {
      return res.status(404).json({ message: 'No se encontró la etiqueta para eliminar' });
    }
    res.status(200).json({ message: 'Etiqueta eliminada con éxito', label });
  } catch (error) {
    handleError(res, error, 'Error al eliminar la etiqueta');
  }
};

/**
 * Actualiza una etiqueta existente en la base de datos.
 * @param {Request} req - El objeto de solicitud HTTP que contiene los datos de la etiqueta a actualizar.
 * @param {Response} res - El objeto de respuesta HTTP para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se completa la actualización de la etiqueta.
 */
export const updateLabel = async (req: Request, res: Response) => {
  try {
    const { _id, ...updatedLabelData }: LabelI = req.body;
    
    // Verificar si se proporcionó el _id
    if (!_id) {
      return res.status(400).json({ message: 'Se requiere proporcionar el _id del documento a actualizar' });
    }
    
    // Actualizar la etiqueta en la base de datos
    const updatedLabel = await LabelModel.findByIdAndUpdate(_id, updatedLabelData, { new: true });
    
    // Verificar si se encontró la etiqueta
    if (!updatedLabel) {
      return res.status(404).json({ message: 'No se encontró la etiqueta para actualizar' });
    }

    // Responder al cliente con un mensaje de éxito y la etiqueta actualizada
    res.status(200).json({ message: 'Etiqueta actualizada con éxito', label: updatedLabel });
  } catch (error) {
    handleError(res, error, 'Error al actualizar la etiqueta');
  }
};

/**
 * Retrieves all labels from a specific section from the database.
 * @param {Request} req - The HTTP request object containing the section of the labels to retrieve.
 * @param {Response} res - The HTTP response object to send the response to the client.
 * @returns {Promise<void>} A promise that resolves once the labels retrieval is completed.
 */
export const getLabelsBySection = async (req: Request, res: Response) => {
  try {
    const { section } = req.params;
    
    // Check if section is provided
    if (!section) {
      return res.status(400).json({ message: 'Section is required to retrieve labels' });
    }
    
    // Get all labels from the specified section
    const labels = await LabelModel.find({ section });

    // Respond to the client with the retrieved labels
    res.status(200).json({ message: 'Labels retrieved successfully', labels });
  } catch (error) {
    handleError(res, error, 'Error retrieving labels');
  }
};



/**
 * Guarda una nueva etiqueta en la base de datos.
 * @param {Label} labelData - Los datos de la etiqueta a guardar.
 * @returns {Promise<Label>} Una promesa que resuelve la etiqueta guardada.
 */
const saveLabel = async (labelData: LabelI): Promise<LabelI> => {
  let label: LabelI = new LabelModel(labelData);
  label._id = !label._id ? new mongoose.Types.ObjectId() : label._id;
  return await label.save();
};

/**
 * Actualiza el estado de una etiqueta a 0 en la base de datos.
 * @param {string} id - El ID de la etiqueta a actualizar.
 * @returns {Promise<Label | null>} Una promesa que resuelve la etiqueta actualizada o null si no se encontró la etiqueta.
 */
const updateLabelStatus = async (id: string): Promise<LabelI | null> => {
  return await LabelModel.findByIdAndUpdate(id, { status: 0 }, { new: true });
};

export const getLabels = async (req: Request, res: Response) => {
  try {
    // Obtener todas las etiquetas de la base de datos
    const labels: LabelI[] = await LabelModel.find();
    // Responder al cliente con las etiquetas obtenidas
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las etiquetas', error: error });
  }
};