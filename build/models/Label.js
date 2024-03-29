"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const databases_1 = require("../const/databases");
exports.LabelSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, required: false },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    section: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Number, required: false, default: 1 },
    createdAt: { type: Date, required: false, default: Date.now },
    updatedAt: { type: Date, required: false, default: Date.now }
}, {
    collection: databases_1.LABEL_DATABASE
});
exports.default = mongoose_1.default.model('Label', exports.LabelSchema);
