"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIp = getClientIp;
function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    return ((Array.isArray(forwarded) ? forwarded[0] : forwarded) ||
        req.socket.remoteAddress ||
        '127.0.0.1');
}
//# sourceMappingURL=getClientIp.js.map