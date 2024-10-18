import express from "express";
import { authenticateRole, isAuthenticated } from "../middleware/auth";
import { editCourse, uploadCourse } from "../controller/course.controller";
const courseRouter = express.Router();


courseRouter.post("/create-course", isAuthenticated, authenticateRole("admin"), uploadCourse);
courseRouter.put("/edit-course/:id", isAuthenticated, authenticateRole("admin"), editCourse);

export default courseRouter;