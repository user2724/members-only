const pool = require("./pool")
const bcrypt = require("bcryptjs")

async function selectAllUsers() {

    const { rows } = await pool.query("SELECT * FROM users")
    return rows
}

async function addNewUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO users (first_name, last_name, email, password, has_membership) VALUES ($1, $2, $3, $4, FALSE)",
     [firstName, lastName, email, hashedPassword])
     console.log("Hashed: ", hashedPassword)
}

async function updateMembership(/*passcode,*/ email) {
    //const hashedPasscode = await bcrypt.hash(passcode, 10)
    await pool.query("UPDATE users SET has_membership = TRUE WHERE email = $1", [email/*, hashedPasscode*/])
}
 
module.exports = {
    selectAllUsers,
    addNewUser,
    updateMembership
}