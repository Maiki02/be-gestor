import mongoose from "mongoose";
import UserModel, { UserI } from "../models/User";

/**
 * Guarda una User en la base de datos.
 * @param {User} userData - Los datos del User a guardar.
 * @returns {Promise<User>} Una promesa que resuelve el usuario guardada.
 */
const saveUser = async (userData: UserI): Promise<UserI> => {
    let label: UserI = new UserModel(userData);
    label._id = !label._id ? new mongoose.Types.ObjectId() : label._id;
    return await label.save();
};
  