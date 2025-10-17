import express from 'express';
import { getAllRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipeById } from '../controllers/RecipeController.js';
import { requireRole, verifyToken } from '../middleware/AuthMiddleware.js';
import { validateRecipeCreate, validateRecipeUpdate } from '../middleware/validationMiddleware.js';

const recipeRouter = express.Router();
// console.log('Recipe router loaded!'); 

recipeRouter.route('/').get(getAllRecipe).post(verifyToken, requireRole('admin'), validateRecipeCreate, createRecipe);

recipeRouter.route('/:id').get(verifyToken, getRecipeById).put(verifyToken, requireRole('admin'), validateRecipeUpdate, updateRecipe).delete(verifyToken, requireRole('admin'), deleteRecipe);

export default recipeRouter
