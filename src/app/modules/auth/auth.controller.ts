import { NextFunction, Request, response, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken, needPasswordChange } = await AuthService.login(req.body);
    res.cookie("accessToken", accessToken, {
        maxAge: 60 * 60 * 1000,
        secure: true,
        httpOnly: true
    })
    res.cookie("refreshToken", refreshToken, {
        maxAge: 60 * 60 * 1000 * 24 * 90,
        secure: true,
        httpOnly: true
    })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully.",
        data: {
            needPasswordChange
        }
    })
})

export const AuthController = {
    login
}