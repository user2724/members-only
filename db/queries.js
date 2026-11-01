const pool = require("./pool")
const bcrypt = require("bcryptjs")

async function selectAllUsers() {

    const { rows } = await pool.query("SELECT * FROM users")
    return rows
}

async function selectUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    return rows[0]
}

async function addNewUser(firstName, lastName, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const { rows } = await pool.query("INSERT INTO users (first_name, last_name, email, password, has_membership, is_admin) VALUES ($1, $2, $3, $4, FALSE, FALSE) RETURNING *",
     [firstName, lastName, email, hashedPassword])
     console.log("Hashed: ", hashedPassword)
     return rows[0]
}

async function updateMembership(/*passcode,*/ id) {
    //const hashedPasscode = await bcrypt.hash(passcode, 10)
    await pool.query("UPDATE users SET has_membership = TRUE WHERE id = $1", [id/*, hashedPasscode*/])
}

async function getAllMessages() {
    const { rows } = await pool.query("SELECT * FROM messages")
    return rows
}

async function addMessage(messageText, author) {
    const { rows } = await pool.query("INSERT INTO messages (message_text, author) VALUES ($1, $2)", [messageText, author])
    return rows[0]                                                                                      
}

async function updateAdmin(id) {
    await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [id])

}
 
async function deleteMessage(id) {
const { rows } = await pool.query("DELETE FROM messages WHERE id = $1", [id])
return rows[0]
}

module.exports = {
    selectAllUsers,
    addNewUser,
    updateMembership,
    selectUserById,
    getAllMessages,
    addMessage,
    updateAdmin,
    deleteMessage
}