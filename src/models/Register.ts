import mongoose, { Schema, Document } from 'mongoose';
import { REGISTER_DATABASE } from '../const/databases';
import { LabelI, LabelSchema } from './Label';

export interface RegisterI extends Document {
    _id: mongoose.Types.ObjectId;
    section: string;
    label: LabelI;
    date: string;
    amount: number;
    coin: string;
    description?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
}

const RegisterSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    section: { type: String, required: true },
    label: { type: LabelSchema, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    coin: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Number, required: false, default: 1 },
    createdAt: { type: String, required: false, default: Date.now },
    updatedAt: { type: String, required: false, default: Date.now }
},{
    collection: REGISTER_DATABASE
});

export default mongoose.model<RegisterI>('Register', RegisterSchema);
