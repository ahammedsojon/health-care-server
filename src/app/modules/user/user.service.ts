import bcrypt from "bcryptjs"
import { CreateUserInput } from "./user.interface";
import { prisma } from "../../shared/prisma";

const createPatient = async (payload: CreateUserInput) => {

    const hashPassword = await bcrypt.hash(payload.password, 10);

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashPassword
            }
        })

        return await tnx.patient.create({
            data: {
                name: payload.name,
                email: payload.email,
                gender: payload.gender
            }
        })
    })

    return result;

}

export const UserService = {
    createPatient
}