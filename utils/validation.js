import Joi from 'joi';

export const userValidation = {
    register: Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('user', 'admin').default('user')
    }),
    login: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
};

export const recipeValidation = {
    create: Joi.object({
        name: Joi.string().min(1).max(100).required(),
        // Allow both arrays and strings for backward compatibility
        ingredients: Joi.alternatives().try(
            Joi.array().items(Joi.string()).min(1),
            Joi.string().min(1)
        ).required(),
        instructions: Joi.alternatives().try(
            Joi.array().items(Joi.string()).min(1),
            Joi.string().min(1)
        ).required()
    })
};