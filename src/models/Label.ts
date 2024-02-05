import mongoose, { Schema, Document } from 'mongoose';

interface Label extends Document {
    color: string;
    icon: string;
    id: string;
    section: string;
    name: string;
}

const LabelSchema = new Schema({
    color: { type: String, required: true },
    icon: { type: String, required: true },
    id: { type: String, required: true },
    section: { type: String, required: true },
    name: { type: String, required: true },
});

export default mongoose.model<Label>('Label', LabelSchema);