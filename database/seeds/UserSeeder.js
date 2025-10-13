/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import bcrypt from "bcrypt";

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del();

  // Hash the password
  const hashedPassword = await bcrypt.hash("password", 10);

  await knex('users').insert([
    {
      email: "nak110@gmail.com",
      username: "nak110",
      password: hashedPassword,
      role: "admin"
    }
  ]);
}