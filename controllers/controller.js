const db = require("../db/queries")

const { body, validationResult, matchedData } = require("express-validator")

exports.selectAllUsers = async (req, res) => {

    try {
    const users = await db.selectAllUsers()
    console.log("Users: ", users)
    res.render("index", { users })
    } catch (error) {
        console.log("ERROR FETCHING DATA: ", error)
        res.status(500).send('Internal Server Error')
    }
}

/*exports.renderSignUp = async (req, res) => {
    res.render("signUp")
}*/

/*exports.renderMessageBoard = async (req, res) => {
    res.render("/messageBoard")
}*/

exports.addNewUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    await db.addNewUser( firstName, lastName, email, password)
    req.session.userId = user.id
    //res.redirect("/messageBoard")
    res.redirect("/")
}


const nameErr = "must be between 1 and 25 characters"
const alphaErr = "must contain only letters"
const emailErr = "Please provide a valid email address."
const passwordErr = "must be at least 6 characters"

const validateUser = [

body("firstName").trim()
.isAlpha().withMessage(`First Name ${alphaErr}`)
.isLength({ min: 1, max: 25 }).withMessage(`First Name ${nameErr}`),
body("lastName").trim()
.isAlpha().withMessage(`Last Name ${alphaErr}`)
.isLength({ min: 1, max: 25 }).withMessage(`Last Name ${nameErr}`),
body("email")
.isEmail().withMessage(`${emailErr}`),
body("password")
.isLength({min: 6}).withMessage(`Password ${passwordErr}`),
body("confirmPassword")
.custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error('Passwords do not match.')
    } 
    return true
}),

]

exports.addNewUser = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).render("index", { 
                errors: errors.array(),
                formData: req.body,
                oldData: {}

            })
        } 

         try {
     const { firstName, lastName, email, password } = req.body
    await db.addNewUser( firstName, lastName, email, password)
   // req.session.userId = user.id
    res.redirect("/")
    const users = await db.selectAllUsers()
    console.log("Users: ", users.at(-1))
    
    } catch (error) {
        console.log("ERROR FETCHING DATA: ", error)
        res.status(500).send('Internal Server Error')
    }
    }
]

exports.updateMembership = async (req, res) => {
    if (!req.user) {
        return res.redirect("/")
    }

    if (req.body.secretPasscode !== process.env.SECRET_PASSCODE) {
        return res.status(400).send("Incorrect Passcode")
    }

    await db.updateMembership(req.user.id)
    res.redirect("/")
}

exports.getAllMessages = async (req, res) => {
    const messages = await db.getAllMessages();
    res.render("messageBoard", { messages, user: req.user })
    console.log("messages: ", messages)
}

exports.addMessage = async (req, res) => {
    const { messageText } = req.body
    await db.addMessage(messageText)
    //req.session.messageId = message.id
    

    res.redirect("/messageBoard")
}