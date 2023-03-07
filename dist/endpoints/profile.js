"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../jwt/jwt");
module.exports = function profile(req, res) {
    const token = req.cookies[jwt_1.JWT_COOKIE_NAME] || req.token;
    (0, jwt_1.decodeJWT)(token)
        .then((payload) => {
        const { error, data } = payload;
        error && console.error(error);
        res
            .status(200)
            .json(data);
    })
        .catch(console.error);
};
