// middleware/errorHandler.js
import { constants } from '../constants.js';

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    const errorResponse = {
        title: getErrorTitle(statusCode),
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stackTrace: err.stack })
    };

    // Log error for monitoring
    console.error(`Error ${statusCode}:`, err.message);

    res.status(statusCode).json(errorResponse);
};

const getErrorTitle = (statusCode) => {
    const titles = {
        [constants.NOT_FOUND]: 'Not Found',
        [constants.VALIDATION_ERROR]: 'Validation Failed',
        [constants.UNAUTHORIZED]: 'Unauthorized',
        [constants.FORBIDDEN]: 'Forbidden',
        [constants.SERVER_ERROR]: 'Server Error'
    };
    return titles[statusCode] || 'Error';
};

export default errorHandler;