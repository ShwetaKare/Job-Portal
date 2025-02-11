import express from "express"
import { registerCompany, updatecompany , getCompany , getCompanybyID } from "../controllers/company.controller.js"
import isAuthenticated from "../middlewares/auth.js"
import { singleUpload } from "../middlewares/multer.js"


const router = express.Router()

router.route("/register").post(isAuthenticated ,registerCompany)
router.route("/get").get(isAuthenticated ,getCompany)
router.route("/update/:id").put(isAuthenticated ,singleUpload, updatecompany)
router.route("/get/:id").get(isAuthenticated ,getCompanybyID)


export default router