# recipes_expressjs

This repository contains the backend for a recipe management application, built with Node.js, Express.js, and MySQL. It features a RESTful API for CRUD operations on recipes, along with user authentication and role-based access control.

## Features

-   **REST API:** Full CRUD (Create, Read, Update, Delete) functionality for recipes.
-   **Authentication:** User registration and login system using JSON Web Tokens (JWT).
-   **Authorization:** Role-based access control (user vs. admin) to protect endpoints. Admins can create, update, and delete recipes, while regular users can only view them.
-   **Database Management:** Uses Knex.js for database migrations, seeding, and query building with a MySQL database.
-   **Structured Codebase:** Follows an MVC-like pattern with clear separation of concerns (routes, controllers, models).
-   **Error Handling:** Includes custom middleware for consistent error responses.

## Getting Started

### Prerequisites

-   Node.js
-   npm
-   MySQL Server

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NAK110/recipes_expressjs.git
    cd recipes_expressjs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your configuration.
    ```env
    PORT=3001
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=recipe_db
    JWT_SECRET=your_super_secret_jwt_key
    ```

4.  **Configure the database:**
    Ensure your MySQL server is running and you have created a database with the name you specified in your `.env` file (e.g., `recipe_db`).

5.  **Run database migrations:**
    This command will create the `recipes` and `users` tables in your database.
    ```bash
    npm run migrate
    ```

6.  **Seed the database (Optional):**
    This command will populate the `recipes` table with sample data.
    ```bash
    npm run seed
    ```

7.  **Start the server:**
    -   For development with auto-reloading:
        ```bash
        npm run dev
        ```
    -   For production:
        ```bash
        npm start
        ```
    The server will be running on the port specified in your `.env` file (default is `3001`).

## API Endpoints

All endpoints are prefixed with `/api`. Sample requests can be found in the `/requests` directory.

### Authentication (`/auth`)

| Method | Endpoint    | Description                                                                  | Body                                                                                   |
| :----- | :---------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `POST` | `/register` | Register a new user. The `role` is optional and defaults to `user`.          | `{ "username": "testuser", "password": "password123", "role": "admin" }`               |
| `POST` | `/login`    | Authenticate a user and receive a JSON Web Token (JWT).                      | `{ "username": "testuser", "password": "password123" }`                                 |

### Recipes (`/recipes`)

All recipe endpoints require a valid JWT passed in the `Authorization` header as `Bearer <token>`.

| Method | Endpoint | Description              | Access      |
| :----- | :------- | :----------------------- | :---------- |
| `GET`  | `/`      | Get a list of all recipes. | User, Admin |
| `POST` | `/`      | Create a new recipe.     | Admin       |
| `GET`  | `/:id`   | Get a recipe by its ID.  | User, Admin |
| `PUT`  | `/:id`   | Update a recipe by its ID. | Admin       |
| `DELETE`| `/:id`  | Delete a recipe by its ID. | Admin       |

### User Test Routes (`/user`)

| Method | Endpoint | Description                        | Access      |
| :----- | :------- | :--------------------------------- | :---------- |
| `POST` | `/user`  | An unprotected test endpoint.      | Public      |
| `POST` | `/admin` | A protected test endpoint for admins.| Admin       |

## Available Scripts

-   `npm start`: Starts the application using `node server.js`.
-   `npm run dev`: Starts the application in development mode using `nodemon`.
-   `npm run migrate`: Runs the Knex database migrations.
-   `npm run migrate:rollback`: Rolls back the last executed migration.
-   `npm run migrate:fresh`: Rolls back all migrations and then runs them again.
-   `npm run seed`: Populates the database with seed data.