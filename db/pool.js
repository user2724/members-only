const { Pool } = require("pg")

module.exports = new Pool({
    host: "localhost",
    user: "mattn",
    database: "message_users",
    password: "SQLisfun",
    port: 5432

})