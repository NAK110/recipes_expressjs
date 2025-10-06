// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default{

  development: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      port: 3306,
      user: 'root',
      password : '',
      database : 'recipe_db'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: './database/migrations'
    }
  }
};
