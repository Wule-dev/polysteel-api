import { Router } from "express";
import PaymentController from "../controllers/PaymentController";

import SignInController from "../controllers/SignInController";
import SignUpController from "../controllers/SignUpController";
import UserController from "../controllers/UserController";

const authRoutes = Router();

authRoutes.post("/signin", SignInController.index);
authRoutes.post("/recovery", SignInController.show);
authRoutes.post("/newpass", SignInController.update);
authRoutes.post("/signup", SignUpController.store);
authRoutes.post("/signup/confirm", SignUpController.update);
authRoutes.get("/user", UserController.show);
authRoutes.post("/process_payment", PaymentController.process);

export default authRoutes;
