"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode : 500;
    return res.status(statusCode).json({
        message: err.message,
        stack: err.stack
    });
};
exports.default = customError;
