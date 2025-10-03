import express from 'express';
import { getAllRecipe, createRecipe, updateRecipe, deleteRecipe, getRecipeById } from '../controllers/RecipeController.js';


const router = express.Router();
// console.log('Recipe router loaded!'); 

router.route('/recipes').get(getAllRecipe).post(createRecipe);

router.route('/recipes/:id').get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

export default router
