"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const routes_1 = require("../const/routes");
const controller_label_1 = require("../controller/controller-label");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Mi novia hermosa!' });
});
//--------- LABELS ---------\\
exports.router.post(routes_1.CREATE_LABEL, controller_label_1.createLabel);
exports.router.put(routes_1.UPDATE_LABEL, controller_label_1.updateLabel);
exports.router.delete(routes_1.DELETE_LABEL, controller_label_1.deleteLabel);
exports.router.get(routes_1.GET_LABELS_BY_SECTION, controller_label_1.getLabelsBySection);
//--------- REGISTERS ---------\\
// router.post(CREATE_REGISTER, createRegister);
// router.put(UPDATE_REGISTER, updateRegister);
// router.delete(DELETE_REGISTER, deleteRegister);
// router.get(GET_REGISTERS_BY_SECTION, getRegistersBySection);
