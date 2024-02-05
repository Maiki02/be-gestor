"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => {
    res.status(200).json(createResponse('ok', 'success'));
});
function createResponse(status, message, data) {
    const response = {
        status: status,
        message: message,
        data: data
    };
    return response;
}
