import jwt from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';

export const verifyToken = AsyncHandler(async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({
            message: 'No token provided',
            code: 'NO_TOKEN'
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: 'No token, authorization denied',
            code: 'NO_TOKEN'
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'Token is invalid',
                code: 'TOKEN_INVALID'
            });
        } else {
            return res.status(401).json({
                message: 'Token verification failed',
                code: 'TOKEN_VERIFICATION_FAILED'
            });
        }
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