const express = require('express');
const router = express.Router();
const { createRecipe, getAllRecipe, updateRecipe, deleteRecipe } = require('../controllers/RecipeController');

// console.log('Recipe router loaded!'); 

router.route('/recipes').get(getAllRecipe).post(createRecipe);

router.route('/recipes/:id').put(updateRecipe).delete(deleteRecipe);

module.exports = router;
