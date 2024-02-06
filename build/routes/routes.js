"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const routes_1 = require("../const/routes");
const controller_label_1 = require("./controller-label");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.status(200).json(createResponse('ok', 'success'));
});
exports.router.post(routes_1.CREATE_LABEL, controller_label_1.createLabel);
function createResponse(status, message, data) {
    return {
        status: status,
        message: message,
        data: data
    };
}
