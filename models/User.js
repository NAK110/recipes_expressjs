import db from "../config/testDB.js";

class User {
    static async create(userData) {
        const { username, password, role } = userData;

        if (role) {
            const [result] = await db.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, password, role]
            );
            return { id: result.insertId, username, role };
        } else {
            const [result] = await db.query(
                'INSERT INTO users (username, password) VALUES (?, ?)',
                [username, password]
            );
            return { id: result.insertId, username, role: 'user' };
        }
    }

    static async findUsername(username){
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username])
        return rows[0]
    }

    // static async getAll() {
    //     const [rows] = await db.query('SELECT * FROM users');
    //     return rows;
    // }

    // static async getById(id) {
    //     const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    //     return rows[0];
    // }


    // static async update(id, userData) {
    //     const { username, password, role } = userData;
    //     const [result] = await db.query(
    //         'UPDATE recipes SET username = ?, password = ?, role = ? WHERE id = ?',
    //         [username, password, role, id]
    //     );
    //     return result.affectedRows > 0;
    // }

    // static async delete(id) {
    //     const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    //     return result.affectedRows > 0;
    // }

}

export default User;