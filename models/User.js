import db from "../config/database.js";
import bcrypt from "bcrypt";

class User {
    static get tableName() {
        return 'users';
    }

    static async getAllUser() {
        return await db(this.tableName).where('role', 'user').select('*');
    }

    static async findUsername(username) {
        return await db(this.tableName).where('username', username).first();
    }

    static async getUserById(id) {
        return await db(this.tableName).where('id', id).first();
    }

    static async create(userData) {
        const { username, email, password, role = 'user' } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [id] = await db(this.tableName).insert({
            username,
            email,
            password: hashedPassword,
            role
        });

        return { id, username, email, role };
    }

    static async update(id, userData) {
        const updateData = { ...userData };

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Remove undefined values
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        if (Object.keys(updateData).length === 0) return false;

        const affectedRows = await db(this.tableName)
            .where('id', id)
            .update(updateData);

        return affectedRows > 0;
    }

    static async delete(id) {
        const affectedRows = await db(this.tableName).where('id', id).del();
        return affectedRows > 0;
    }
}

export default User;