import { Request, Response } from 'express';
import Label from '../models/Label'; // Asegúrate de que la ruta del modelo sea correcta

export const createLabel = async (req: Request, res: Response) => {
  try {
      const { color, icon, id, section, name } = req.body;
      const nuevaLabel = await Label.create({ color, icon, id, section, name });
      res.status(201).json(nuevaLabel);
  } catch (error) {
      res.status(500).json({ message: 'Error al crear la etiqueta', error });
  }
};