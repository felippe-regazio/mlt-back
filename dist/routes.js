"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const guard_1 = require("./jwt/guard");
/**
 * Register available routes to the intire app, prefer this
 * way to allow this file to be used as a reference for the
 * application endpoints. All the endpoints are exported using
 * CJS (module.exports) to allow direct require here, avoiding
 * double declaration.
 *
 * @param app Express
 */
const routes = (app) => {
    app.get('/', require('./endpoints/index'));
    app.get('/profile', require('./endpoints/profile'));
    app.get('/logout', guard_1.guard, require('./endpoints/logout'));
    app.get('/buyings', guard_1.guard, require('./endpoints/buyings'));
    app.post('/login', require('./endpoints/login'));
    app.post('/register', require('./endpoints/register'));
    app.post('/checkout', guard_1.guard, require('./endpoints/checkout'));
};
exports.routes = routes;
