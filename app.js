const express = require("express")
const path = require("node:path")
require("dotenv").config({ path: path.join(__dirname, "fun.env") })
const app = express()
const router = require("./routes/routes")
const session = require("express-session")
const passport = require("passport")
const db = require("./db/queries")
const pool = require("./db/pool")
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")
const flash = require('connect-flash')




app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))


app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(flash())

app.use((req, res, next) => {
res.locals.errorMessage = req.flash('error')
next();
})

app.use(async (req, res, next) => {
    //req.session.userId = user.id
    if (req.session.userId) {
        req.user = await db.selectUserById(req.session.userId)
    }
    res.locals.user = req.user
    next()
})

app.use("/", router)

app.get("/", (req, res) => {

    res.render("index.ejs", {user: req.user, errorMessage: req.flash('error')})
   
})

app.get("/messageBoard", (req, res) => {
    res.render("messageBoard.ejs", { user: req.user })
})

app.get("/joinClub", (req, res) => {
    res.render("joinClub.ejs")
})

app.get("/signUp", (req, res) => {
    res.render("signUp")
})

app.get("/log-out", (req, res, next) => {
req.logout((err) => {
    if (err) {
        return next(err)
    }
    res.redirect("/")
})
})

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email])
            const user = rows[0]

            if (!user) {
                return done(null, false, {message: "Incorrect Email"} )
                
            }

            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: "Incorrect Password"})
            }
            return done(null, user)
             
        } catch (error) {
            return done(error)
        }

        })
)

passport.serializeUser((user, done) => {    
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        const user = rows[0]

        done(null, user)
    } catch (err) {
        done(err)
    }
})

app.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
        failureMessage: true,
        failureFlash: true,
    })
)

const PORT = process.env.PORT || 4000

app.listen( PORT, (error) => {

    if (error) {
        throw error
    }
console.log(`App is listening on port ${PORT}!`)
})
