import {Router } from "express";
import { userControllers } from "./user.controller";
import {createUSerZodSchema} from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

import { Role } from "./user.interface";

import { cehckAuth } from "../../middlewares/checkAuth";


const router = Router();



router.post("/register", validateRequest(createUSerZodSchema), userControllers.createUser);
router.get("/all-users", cehckAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUsers);
router.patch("/:id", cehckAuth(...Object.values(Role)), userControllers.updateUser);

export const userRoutes = router;