import db from "../config/testDB.js";
import bcrypt from "bcrypt";

class User {
    static async getAllUser() {
        const [rows] = await db.query('SELECT * FROM users WHERE role = ?', ['user']);
        return rows;
    }

    static async findUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
        return rows[0]
    }


    static async getUserById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(userData) {
        const { username, email, password, role = 'user' } = userData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );

        return { id: result.insertId, username, email, role };
    }


    static async update(id, userData) {
        const updates = [];
        const values = [];

        for (const [key, value] of Object.entries(userData)) {
            if (value !== undefined) {
                if (key === 'password') {
                    const hashedPassword = await bcrypt.hash(value, 10);
                    updates.push(`${key} = ?`);
                    values.push(hashedPassword);
                } else {
                    updates.push(`${key} = ?`);
                    values.push(value);
                }
            }
        }
        if (updates.length === 0) return false;

        values.push(id);

        const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await db.query(query, values);

        return result.affectedRows > 0;
    }
    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default User;