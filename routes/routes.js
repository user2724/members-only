const { Router } = require("express")
const router = Router()
const controller = require("../controllers/controller")

router.get("/", controller.selectAllUsers)
router.post("/", controller.addNewUser)

module.exports = router

