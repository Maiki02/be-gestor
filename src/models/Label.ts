import mongoose, { Schema, Document } from 'mongoose';
import { LABEL_DATABASE } from '../const/databases';

export interface Label extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    icon: string;
    color: string;
    section: string;
    description?: string;
    status?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const LabelSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    section: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Number, required: false, default: 1 },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now }
},{
    collection: LABEL_DATABASE
});

export default mongoose.model<Label>('Label', LabelSchema);