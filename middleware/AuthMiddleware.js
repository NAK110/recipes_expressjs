import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';

export const verifyToken = AsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied'
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            next();
        } catch (err) {
            return res.status(401).json({
                message: 'Token is invalid'
            });
        }
    } else {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
});

export const requireRole = (role) => {
    return AsyncHandler(async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: 'Not authenticated'
            })
        }

        if (req.user.role !== role) {
            return res.status(403).json({
                message: `Access Denied. ${role.toUpperCase()} role required`
            })
        }
        next()
    })
}