"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guard = void 0;
const jwt_1 = require("../jwt/jwt");
function guard(req, res, next) {
    const token = req.cookies[jwt_1.JWT_COOKIE_NAME];
    (0, jwt_1.decodeJWT)(token)
        .then((payload) => {
        const { error, data } = payload;
        if (error) {
            console.error(error);
            res.sendStatus(401);
            return;
        }
        req.$user = data;
        next();
    })
        .catch((error) => {
        console.error(error);
        res.sendStatus(401);
        return;
    });
}
exports.guard = guard;
;
