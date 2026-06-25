import { Gender } from "../../../generated/prisma/enums"

export type CreateUserInput = {
    name: string
    email: string
    password: string
    gender?: Gender
}