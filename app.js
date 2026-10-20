const express = require("express")
const path = require("node:path")
const app = express()
const router = require("./routes/routes")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({extended: true}))
app.use("/", router)

app.get("/", (req, res) => {

    res.render("index.ejs"/*, {
        errors: [],
        oldData: {}
    }*/)
})





const PORT = process.env.PORT || 4000

app.listen( PORT, (error) => {

    if (error) {
        throw error
    }
console.log(`App is listening on port ${PORT}!`)
})

