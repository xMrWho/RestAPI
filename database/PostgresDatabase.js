const { Client } = require('pg');

// TODO: refactor with promise and stuff 

/**
 * Represents a PostgreSQL database.
 * @extends Database
 */
class PostgresDatabase extends Database {

    /**
    * Creates a new instance of the PostgresDatabase class.
    * @param {string} host - The database host.
    * @param {number} port - The port number to use for the database connection.
    * @param {string} database - The name of the database to connect to.
    * @param {string} username - The username to use for the database connection.
    * @param {string} password - The password to use for the database connection.
    *
    */

    constructor(config) {
        super();
        this.host = config.host;
        this.port = config.port;
        this.database = config.database;
        this.username = config.username;
        this.password = config.password;
    }

    async openConnection() {
        const connectionString = `postgres://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
        const client = new Client({
            connectionString,
        });
        await client.connect();
        this.connection = client;
        return client;
    }

    async closeConnection() {
        if (this.connection === null) {
            return false;
        }
        await this.connection.end();
        this.connection = null;
        return true;
    }

    async querySQL(query) {
        if (!this.checkConnection()) {
            await this.openConnection();
        }
        const result = await this.connection.query(query);
        return result.rows;
    }

    async updateSQL(query) {
        if (!this.checkConnection()) {
            await this.openConnection();
        }
        const result = await this.connection.query(query);
        return result.rowCount;
    }
}

module.exports = PostgresDatabase;