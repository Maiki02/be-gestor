"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const routes_1 = require("../const/routes");
const controller_label_1 = require("../controller/controller-label");
const controller_register_1 = require("../controller/controller-register");
const controller_login_1 = require("../controller/controller-login");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Hello World!' });
});
//--------- LOGIN ---------\\
exports.router.post(routes_1.LOGIN_USER, controller_login_1.loginUser);
exports.router.post(routes_1.REGISTER_USER, controller_login_1.registerUser);
exports.router.get(routes_1.GOOGLE_USER, controller_login_1.registerWithGoogle);
//--------- LABELS ---------\\
exports.router.post(routes_1.CREATE_LABEL, controller_label_1.createLabel);
exports.router.put(routes_1.UPDATE_LABEL, controller_label_1.updateLabel);
exports.router.delete(routes_1.DELETE_LABEL, controller_label_1.deleteLabel);
exports.router.get(routes_1.GET_LABELS_BY_SECTION, controller_label_1.getLabelsBySection);
//--------- REGISTERS ---------\\
exports.router.post(routes_1.CREATE_REGISTER, controller_register_1.createRegister);
exports.router.put(routes_1.UPDATE_REGISTER, controller_register_1.updateRegister);
exports.router.delete(routes_1.DELETE_REGISTER, controller_register_1.deleteRegister);
exports.router.get(routes_1.GET_REGISTERS_BY_SECTION, controller_register_1.getRegistersBySection);
