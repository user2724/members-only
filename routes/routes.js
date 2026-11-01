const { Router } = require("express")
const router = Router()
const controller = require("../controllers/controller")

router.get("/", controller.selectAllUsers)

router.post("/signUp", controller.addNewUser)
router.post("/joinClub", controller.updateMembership)
//router.get("/messageBoard", controller.renderMessageBoard)
router.post("/messageForm", controller.addMessage)
router.post("/admin", controller.updateAdmin)
router.get("/messageBoard", controller.getAllMessages)
router.post("/delete-message/:id", controller.deleteMessage)
module.exports = router

