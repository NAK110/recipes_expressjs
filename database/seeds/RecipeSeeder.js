/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      name: "Spaghetti Carbonara",
      ingredients: "spaghetti, eggs, pancetta, parmesan cheese, black pepper",
      instructions: "Cook spaghetti. Fry pancetta until crispy. Mix eggs with parmesan. Toss hot pasta with pancetta, then quickly mix in egg mixture off heat. Season with black pepper."
    },
    {
      name: "Chicken Stir Fry",
      ingredients: "chicken breast, soy sauce, garlic, ginger, bell peppers, broccoli, rice",
      instructions: "Cut chicken into pieces. Stir fry chicken with garlic and ginger. Add vegetables and soy sauce. Cook until tender. Serve over rice."
    },
    {
      name: "Caesar Salad",
      ingredients: "romaine lettuce, croutons, parmesan cheese, caesar dressing, lemon juice",
      instructions: "Chop lettuce into bite-sized pieces. Toss with caesar dressing and lemon juice. Top with croutons and shaved parmesan."
    },
    {
      name: "Chocolate Chip Cookies",
      ingredients: "flour, butter, sugar, brown sugar, eggs, vanilla extract, chocolate chips",
      instructions: "Cream butter and sugars. Add eggs and vanilla. Mix in flour. Fold in chocolate chips. Bake at 350°F for 10-12 minutes."
    },
    {
      name: "Beef Tacos",
      ingredients: "ground beef, taco seasoning, tortillas, lettuce, tomatoes, cheese, sour cream",
      instructions: "Brown ground beef and add taco seasoning. Warm tortillas. Fill with beef and top with lettuce, tomatoes, cheese, and sour cream."
    }
  ]);
};
