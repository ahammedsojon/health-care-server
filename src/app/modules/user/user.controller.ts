import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, searchTerm, status, role } = req.query;
    const result = await UserService.getAll({ page: Number(page), limit: Number(limit), searchTerm || "", status, role });

sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Patients retrived successfully!",
    data: result
})
})

const createPatinet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createPatient(req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

export const UserController = {
    createPatinet
}