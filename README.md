# recipes_expressjs

This repository contains the backend for a recipe management application, built with Node.js, Express.js, and MySQL. It features a RESTful API for CRUD operations on recipes, along with user authentication and role-based access control.

## Features

-   **REST API:** Full CRUD (Create, Read, Update, Delete) functionality for recipes with support for both array and string data formats.
-   **Authentication:** User registration and login system using JSON Web Tokens (JWT).
-   **Authorization:** Role-based access control (user vs. admin) to protect endpoints. Admins can create, update, and delete recipes, while regular users can only view them.
-   **Database Management:** Uses Knex.js for database migrations, seeding, and query building with a MySQL database.
-   **Structured Codebase:** Follows an MVC-like pattern with clear separation of concerns (routes, controllers, models).
-   **Input Validation:** Comprehensive request validation using Joi schema validation.
-   **Security Features:** 
    -   Helmet.js for security headers
    -   Rate limiting for API protection
    -   Enhanced rate limiting for authentication endpoints
    -   Environment-aware error handling (stack traces only in development)
-   **Error Handling:** Includes custom middleware for consistent error responses with proper HTTP status codes.
-   **Logging:** Winston-based logging system for error tracking and monitoring.
-   **Flexible Data Handling:** Support for both array and string formats in recipe ingredients and instructions.

## Security Features

-   **Rate Limiting:** 100 requests per 15 minutes for general API, 5 requests per 15 minutes for authentication endpoints
-   **Input Validation:** All user inputs are validated using Joi schemas
-   **Security Headers:** Helmet.js provides essential security headers
-   **Error Handling:** Stack traces are hidden in production environments
-   **Password Hashing:** Bcrypt with salt rounds for secure password storage

## Getting Started

### Prerequisites

-   Node.js (v16 or higher)
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
    PORT=3000
    NODE_ENV=development
    DB_HOST=localhost
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=recipe_db
    JWT_SECRET=your_super_secret_jwt_key_make_it_long_and_complex
    CLIENT_URL=http://localhost:5173
    LOG_LEVEL=info
    ```

4.  **Configure the database:**
    Ensure your MySQL server is running and you have created a database with the name you specified in your `.env` file (e.g., `recipe_db`).

5.  **Run database migrations:**
    This command will create the `recipes` and `users` tables in your database.
    ```bash
    npm run migrate
    ```

6.  **Seed the database (Optional):**
    This command will populate the `recipes` table with sample data and create an admin user.
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
    The server will be running on the port specified in your `.env` file (default is `3000`).

## API Endpoints

All endpoints are prefixed with `/api`. Sample requests can be found in the `/requests` directory.

### Authentication (`/auth`)

| Method | Endpoint    | Description                                                                  | Body                                                                                   | Rate Limit |
| :----- | :---------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- | :--------- |
| `POST` | `/register` | Register a new user. The `role` is optional and defaults to `user`.          | `{ "username": "testuser", "email": "user@example.com", "password": "password123", "role": "admin" }` | 5/15min |
| `POST` | `/login`    | Authenticate a user and receive a JSON Web Token (JWT).                      | `{ "username": "testuser", "password": "password123" }`                                 | 5/15min |

**Validation Rules:**
- Username: 3-30 characters, required
- Email: Valid email format, required
- Password: Minimum 6 characters, required
- Role: Must be 'user' or 'admin', defaults to 'user'

### Recipes (`/recipes`)

All recipe endpoints require a valid JWT passed in the `Authorization` header as `Bearer <token>`.

| Method | Endpoint | Description              | Access      | Body Example |
| :----- | :------- | :----------------------- | :---------- | :----------- |
| `GET`  | `/`      | Get a list of all recipes. | User, Admin | N/A |
| `POST` | `/`      | Create a new recipe.     | Admin       | See below |
| `GET`  | `/:id`   | Get a recipe by its ID.  | User, Admin | N/A |
| `PUT`  | `/:id`   | Update a recipe by its ID. | Admin       | See below |
| `DELETE`| `/:id`  | Delete a recipe by its ID. | Admin       | N/A |

**Recipe Body Format (supports both arrays and strings):**
```json
{
  "name": "Chicken Stir Fry",
  "ingredients": ["chicken", "vegetables", "soy sauce"],
  "instructions": ["Heat pan", "Cook chicken", "Add vegetables"]
}
```
Or:
```json
{
  "name": "Chicken Stir Fry",
  "ingredients": "chicken, vegetables, soy sauce",
  "instructions": "Heat pan. Cook chicken. Add vegetables."
}
```

**Validation Rules:**
- Name: 1-100 characters, required
- Ingredients: Array of strings or single string, required
- Instructions: Array of strings or single string, required

### Users (`/users`)

| Method | Endpoint | Description                        | Access      |
| :----- | :------- | :--------------------------------- | :---------- |
| `GET`  | `/`      | Get all users (role: user only)   | Admin       |
| `POST` | `/`      | Create a new user                  | Admin       |
| `PUT`  | `/:id`   | Update user by ID                  | Admin       |
| `DELETE`| `/:id`  | Delete user by ID                  | Admin       |

### Test Routes (`/users`)

| Method | Endpoint | Description                        | Access      |
| :----- | :------- | :--------------------------------- | :---------- |
| `POST` | `/user`  | An unprotected test endpoint.      | Public      |
| `POST` | `/admin` | A protected test endpoint for admins.| Admin       |

## Project Structure

```
├── config/
│   ├── database.js         # Knex database configuration
│   └── testDB.js          # MySQL connection pool
├── controllers/           # Request handlers
│   ├── AuthController.js
│   ├── RecipeController.js
│   └── UserController.js
├── database/
│   ├── migrations/        # Database schema migrations
│   └── seeds/            # Database seed data
├── middleware/           # Custom middleware
│   ├── AuthMiddleware.js     # JWT verification & role checking
│   ├── errorHandler.js       # Error handling middleware
│   └── validationMiddleware.js # Input validation middleware
├── models/               # Data access layer
│   ├── Recipe.js
│   └── User.js
├── routes/              # API routes
│   ├── authRouter.js
│   ├── recipeRouter.js
│   └── userRouter.js
├── utils/               # Utility functions
│   ├── logger.js        # Winston logging configuration
│   └── validation.js    # Joi validation schemas
├── requests/            # HTTP request examples
└── server.js           # Application entry point
```

## Available Scripts

-   `npm start`: Starts the application using `node server.js`.
-   `npm run dev`: Starts the application in development mode using `nodemon`.
-   `npm run migrate`: Runs the Knex database migrations.
-   `npm run migrate:rollback`: Rolls back the last executed migration.
-   `npm run migrate:fresh`: Rolls back all migrations and then runs them again.
-   `npm run seed`: Populates the database with seed data.

## Development Notes

### Data Storage
- **Recipes**: Ingredients and instructions can be stored as either JSON arrays or strings
- **Backward Compatibility**: The API accepts both formats for maximum flexibility
- **Auto-parsing**: JSON fields are automatically parsed when retrieving recipes

### Security Considerations
- All endpoints except public routes require authentication
- Admin-only endpoints are protected with role-based access control
- Rate limiting prevents API abuse
- Input validation prevents malformed data
- Error messages don't expose sensitive information in production

### Logging
- Winston logger configured for development and production
- Error logs saved to `logs/error.log`
- Combined logs saved to `logs/combined.log`
- Console output in development mode only

## Default Admin Account
After running `npm run seed`, you can log in with:
- **Username**: `nak110`
- **Password**: `password`
- **Role**: `admin`

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `DB_HOST` | Yes | - | MySQL host |
| `DB_USER` | Yes | - | MySQL username |
| `DB_PASSWORD` | No | - | MySQL password |
| `DB_NAME` | Yes | - | MySQL database name |
| `JWT_SECRET` | Yes | - | JWT signing secret |
| `CLIENT_URL` | No | - | Frontend URL for CORS |
| `LOG_LEVEL` | No | info | Winston log level |