"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_interface_1 = require("./user.interface");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(user_validation_1.createUSerZodSchema), user_controller_1.userControllers.createUser);
router.post("/register-admin", (0, checkAuth_1.cehckAuth)(user_interface_1.Role.SUPER_ADMIN), user_controller_1.userControllers.createAdmin);
router.get("/all-users", (0, checkAuth_1.cehckAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_controller_1.userControllers.getAllUsers);
router.patch("/:id", (0, checkAuth_1.cehckAuth)(...Object.values(user_interface_1.Role)), user_controller_1.userControllers.updateUser);
exports.userRoutes = router;
