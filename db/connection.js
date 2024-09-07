const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',  // Replace with your actual PostgreSQL username
    password: 'rootroot',  // Replace with your actual PostgreSQL password
    database: 'employee_management'  // Ensure this matches your created database name
});

client.connect();

module.exports = client;
