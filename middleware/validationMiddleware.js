import { userValidation, recipeValidation } from '../utils/validation.js';

// Generic validation middleware factory
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errors = error.details.map(detail => ({
                field: detail.path.join('.'),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors
            });
        }

        next();
    };
};

// Specific validation middlewares
export const validateUserRegistration = validate(userValidation.register);
export const validateUserLogin = validate(userValidation.login);
export const validateRecipeCreate = validate(recipeValidation.create);
export const validateRecipeUpdate = validate(recipeValidation.create); // Same schema for now