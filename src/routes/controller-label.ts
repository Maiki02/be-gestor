import { Request, Response } from 'express';
import LabelModel, { Label } from '../models/Label';
import mongoose from 'mongoose';


export const createLabel = async (req: Request, res: Response) => {
  try {
    // Validar los datos de entrada según la interfaz Label
    const { color, icon, id, section, name }: Label = req.body;

    // Crear una instancia del modelo Label con los datos proporcionados
    let label: Label = new LabelModel({ color, icon, id, section, name });
    
    // Generar un nuevo _id si no está asignado
    label._id= !label._id ? new mongoose.Types.ObjectId() : label._id;

    await label.save(); // Guardar la etiqueta en la base de dato
    // Responder al cliente con un mensaje de éxito
    res.status(201).json({ message: 'Etiqueta creada con éxito', label });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear la etiqueta', error: error });
  }
};