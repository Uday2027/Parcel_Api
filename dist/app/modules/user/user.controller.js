"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const user_service_1 = __importDefault(require("./user.service"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.createUserService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.CREATED,
        message: "User Created Successfully!",
        data: user,
    });
}));
const createAdmin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.default.createAdminService(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.CREATED,
        message: "Admin Created Successfully!",
        data: user,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const vefiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN) as JwtPayload;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.default.updateUser(userId, payload, verifiedToken);
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.CREATED,
        message: "User Updated Successfully!",
        data: user,
    });
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.default.getAllUsers();
    (0, sendResponse_1.default)(res, {
        success: true,
        Status: http_status_codes_1.default.CREATED,
        message: "All Users Retrived!",
        data: users.data,
        meta: users.meta
    });
}));
exports.userControllers = {
    createUser,
    getAllUsers,
    updateUser,
    createAdmin
};
