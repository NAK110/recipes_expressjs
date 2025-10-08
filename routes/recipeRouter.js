import express from 'express';
import { getAllRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipeById } from '../controllers/RecipeController.js';
import { requireRole, verifyToken } from '../middleware/AuthMiddleware.js';


const router = express.Router();
// console.log('Recipe router loaded!'); 

router.route('/recipes').get(getAllRecipe).post(verifyToken, requireRole('admin'), createRecipe);

router.route('/recipes/:id').get(verifyToken, getRecipeById).put(verifyToken, requireRole('admin'), updateRecipe).delete(verifyToken, requireRole('admin'), deleteRecipe);

export default router
