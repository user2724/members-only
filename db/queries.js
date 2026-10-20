const pool = require("./pool")

async function selectAllUsers() {

    const { rows } = await pool.query("SELECT * FROM users")
    return rows
}

async function addNewUser(firstName, lastName, email, password) {
    await pool.query("INSERT INTO users (first_name, last_name, email, password, has_membership) VALUES ($1, $2, $3, $4, FALSE)",
     [firstName, lastName, email, password])
}

module.exports = {
    selectAllUsers,
    addNewUser
}