import { NextFunction, Request, Response } from "express"
import Status from "http-status-codes"
import UserServices from "./user.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const user = await UserServices.createUserService(req.body)
    
    sendResponse(res, {
        success: true,
        Status: Status.CREATED,
        message: "User Created Successfully!",
        data: user,
    })
})

const createAdmin = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const user = await UserServices.createAdminService(req.body)
    
    sendResponse(res, {
        success: true,
        Status: Status.CREATED,
        message: "Admin Created Successfully!",
        data: user,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req.params.id;
    // const token = req.headers.authorization;
    // const vefiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN) as JwtPayload;

    const verifiedToken = req.user;

    const payload = req.body;

    const user = await UserServices.updateUser(userId, payload, verifiedToken)
    
    sendResponse(res, {
        success: true,
        Status: Status.CREATED,
        message: "User Updated Successfully!",
        data: user,
    })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();

    sendResponse(res, {
        success: true,
        Status: Status.CREATED,
        message: "All Users Retrived!",
        data: users.data,
        meta: users.meta
    })
})

export const userControllers = {
    createUser,
    getAllUsers,
    updateUser,
    createAdmin
}