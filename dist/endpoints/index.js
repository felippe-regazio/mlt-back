"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function index(_, res) {
    res.status(200).json({
        success: true,
        message: 'This is a health check endpoint'
    });
};
