import db from "../config/database.js";

class Recipe {
    static get tableName() {
        return 'recipes';
    }

    static async getAll() {
        return await db(this.tableName).select('*');
    }

    static async getById(id) {
        return await db(this.tableName).where('id', id).first();
    }

    static async create(data) {
        const { name, ingredients, instructions } = data;

        // Convert arrays to JSON strings for storage if they're arrays
        const ingredientsStr = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;
        const instructionsStr = Array.isArray(instructions) ? JSON.stringify(instructions) : instructions;

        const [id] = await db(this.tableName).insert({
            name,
            ingredients: ingredientsStr,
            instructions: instructionsStr
        });

        return { id, name, ingredients, instructions };
    }

    static async update(id, recipeData) {
        const { name, ingredients, instructions } = recipeData;

        // Convert arrays to JSON strings for storage if they're arrays
        const ingredientsStr = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;
        const instructionsStr = Array.isArray(instructions) ? JSON.stringify(instructions) : instructions;

        const affectedRows = await db(this.tableName)
            .where('id', id)
            .update({
                name,
                ingredients: ingredientsStr,
                instructions: instructionsStr
            });

        return affectedRows > 0;
    }

    static async delete(id) {
        const affectedRows = await db(this.tableName).where('id', id).del();
        return affectedRows > 0;
    }

    // Helper method to parse JSON fields when retrieving
    static parseJsonFields(recipe) {
        if (!recipe) return recipe;

        try {
            recipe.ingredients = JSON.parse(recipe.ingredients);
        } catch (e) {
            // If it's not JSON, keep as string
        }

        try {
            recipe.instructions = JSON.parse(recipe.instructions);
        } catch (e) {
            // If it's not JSON, keep as string
        }

        return recipe;
    }
}

export default Recipe;