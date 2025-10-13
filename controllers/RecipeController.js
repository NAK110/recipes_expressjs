import AsyncHandler from "express-async-handler";
import Recipe from "../models/Recipe.js";

export const getAllRecipe = AsyncHandler(async (req, res) => {
    const recipes = await Recipe.getAll();

    if (!recipes) {
        res.status(404);
        throw new Error('No recipes found');
    }
    res.status(200).json(recipes);
})

export const getRecipeById = AsyncHandler(async (req, res) => {
    const recipe = await Recipe.getById(req.params.id);

    if (!recipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }

    res.status(200).json({recipe});
});

export const createRecipe = AsyncHandler(async (req, res) => {
    const { name, ingredients, instructions } = req.body;
    if (!name || !ingredients || !instructions) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    const recipe = await Recipe.create(req.body)
    res.status(201).json({ message: 'Added recipe successful', recipe: recipe });
})

export const updateRecipe = AsyncHandler(async (req, res) => {
    const updatedRecipe = await Recipe.update(req.params.id, req.body);

    if (!updatedRecipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }

    res.status(200).json({
        message: `Update recipe successful for id: ${req.params.id}`
    });
});

export const deleteRecipe = AsyncHandler(async (req, res) => {
    const deletedRecipe = await Recipe.delete(req.params.id);
    if (!deletedRecipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }
    res.status(200).json({ message: `Delete successful for recipe ${req.params.id}` });
})