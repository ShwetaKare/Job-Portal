import express from "express"
import { createcourse, getallcourses, getCourseById, completePayment , getAdmincourse , generateReceipt } from "../controllers/course.controllers.js"
import isAuthenticated from "../middlewares/auth.js"

const router = express.Router()

router.route("/create").post(isAuthenticated, createcourse)
router.route("/getcourses").get(isAuthenticated, getallcourses)
router.route("/:id/payment").post(isAuthenticated, completePayment)
router.route("/:id/receipt").get(isAuthenticated, generateReceipt)
router.route("/getcourse/:id").get(isAuthenticated, getCourseById)
router.route("/getadmincourse").get(isAuthenticated, getAdmincourse)

export default router