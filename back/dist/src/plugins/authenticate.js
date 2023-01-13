"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const authenticate = async (req) => {
    await req.jwtVerify();
};
exports.authenticate = authenticate;
