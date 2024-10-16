import express from "express";
import { authenticateRole, isAuthenticated } from "../middleware/auth";
import { uploadCourse } from "../controller/course.controller";


const courseRouter = express.Router();
courseRouter.post("/create-course", isAuthenticated, authenticateRole("admin"), uploadCourse);

export default courseRouter;