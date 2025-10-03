import db from "../config/testDB.js";

class Recipe {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM recipes');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { name, ingredients, instructions } = data;
        const [result] = await db.query(
            'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)',
            [name, ingredients, instructions]
        );
        return { id: result.insertId, ...data };
    }

    static async update(id, recipeData) {
        const { name, ingredients, instructions } = recipeData;
        const [result] = await db.query(
            'UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id = ?',
            [name, ingredients, instructions, id]
        );
        return result.affectedRows > 0;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

}

export default Recipe;