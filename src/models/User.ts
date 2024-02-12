import mongoose, { Schema, Document } from 'mongoose';
import { USER_DATABASE } from '../const/databases';

export interface UserI extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    lastName: string;
    email: string;
    country: string;
    birthDate: string;
    photo: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
}

const UserSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: false },
    birthDate: { type: String, required: false },
    photo: { type: String, required: false },
    status: { type: Number, required: false, default: 1 },
    createdAt: { type: String, required: false, default: Date.now },
    updatedAt: { type: String, required: false, default: Date.now }
},{
    collection: USER_DATABASE
});

export default mongoose.model<UserI>('User', UserSchema);
