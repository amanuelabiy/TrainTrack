import express from "express";
import * as UserController from "../controllers/userController";
import authMiddleWare from "../middleware/authMiddleWare";

const router = express.Router();

router.post("/signup", UserController.signUp);

router.post("/login", UserController.login);

router.use(authMiddleWare);

router.get("/", UserController.getAuthenticatedUser);

router.post("/logout", UserController.logout);

export default router;
