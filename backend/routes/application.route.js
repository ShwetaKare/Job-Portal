import express from "express"
import { applyjob , getApplicants , getappliedjobs, updatestatus} from "../controllers/application.controller.js"
import isAuthenticated from "../middlewares/auth.js"

const router = express.Router()

router.route("/apply/:id").get(isAuthenticated,applyjob)
router.route("/:id/applicants").get(isAuthenticated,getApplicants)
router.route("/status/:id/update").post(isAuthenticated,updatestatus)
router.route("/get").get(isAuthenticated,getappliedjobs)

export default router