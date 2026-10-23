const { Router } = require("express")
const router = Router()
const controller = require("../controllers/controller")

router.get("/", controller.selectAllUsers)
//router.get("/signUp", controller.renderSignUp)
router.post("/", controller.addNewUser)
router.post("/joinClub", controller.updateMembership)
//router.get("/messageBoard", controller.renderMessageBoard)

module.exports = router

