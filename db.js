const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "ss1999",
    host: "localhost",
    port: 5432,
    database: "customerconnect"
});

module.exports = pool;