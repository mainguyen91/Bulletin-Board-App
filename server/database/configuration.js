require('dotenv').config();

const {
    Pool
} = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST
});
pool.connect();
pool.on('connect', () => {
    console.log(`Connected to database ${process.env.POSTGRES_DB}`)
});
module.exports = pool;