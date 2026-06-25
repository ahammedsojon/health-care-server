import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatinet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const result = await UserService.createPatient(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: ""
    })
})

export const UserController = {
    createPatinet
}