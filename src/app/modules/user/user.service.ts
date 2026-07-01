import bcrypt from "bcryptjs"
import { prisma } from "../../shared/prisma";
import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";

const getAll = async (payload: { page: number, limit: number, searchTerm: string, status: string, role: string }) => {
    // const search = searchTerm || "";
    const result = await prisma.patient.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        }
    })
}

const createPatient = async (req: Request) => {
    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file);
        req.body.patient.profilePhoto = uploadResult?.secure_url;
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword
            }
        })

        return await tnx.patient.create({
            data: {
                name: req.body.patient.name,
                email: req.body.patient.email,
                gender: req.body.patient.gender,
                profilePhoto: req.body.patient.profilePhoto
            }
        })
    })

    return result;

}

export const UserService = {
    createPatient,
    getAll
}