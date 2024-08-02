const { Client } = require('pg');

// Set up the PostgreSQL client connection
const client = new Client({
    user: 'postgres',
    host: 'localhost', // Ensure this is set to 'localhost'
    database: 'business_db', // Ensure this is the correct database name
    password: 'rootroot',
    port: 5432, // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect();

module.exports = client;
