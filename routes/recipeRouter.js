import express from 'express';
import { getAllRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipeById } from '../controllers/RecipeController.js';
import { requireRole, verifyToken } from '../middleware/AuthMiddleware.js';


const recipeRouter = express.Router();
// console.log('Recipe router loaded!'); 

recipeRouter.route('/').get(getAllRecipe).post(verifyToken, requireRole('admin'), createRecipe);

recipeRouter.route('/:id').get(verifyToken, getRecipeById).put(verifyToken, requireRole('admin'), updateRecipe).delete(verifyToken, requireRole('admin'), deleteRecipe);

export default recipeRouter
