import express from "express"
import { getJobById , getAdminJob,getalljobs,postJob } from "../controllers/job.controller.js"
import isAuthenticated from "../middlewares/auth.js"

const router = express.Router()

router.route("/post").post(isAuthenticated,postJob)
router.route("/get").get(isAuthenticated,getalljobs)
router.route("/getadminjobs").get(isAuthenticated,getAdminJob)
router.route("/get/:id").get(isAuthenticated,getJobById)

export default router