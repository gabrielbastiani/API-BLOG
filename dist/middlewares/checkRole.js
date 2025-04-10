"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = checkRole;
function checkRole(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: 'Acesso não autorizado' });
        }
        next();
    };
}
//# sourceMappingURL=checkRole.js.map