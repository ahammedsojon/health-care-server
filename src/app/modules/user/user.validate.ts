import z from "zod";

const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object({
        name: z.string({
            error: "Name is requied"
        }),
        email: z.string({
            error: "Email is requied"
        }),
        gender: z.string().optional(),
        address: z.string().optional(),
    })
})

export const UserValidation = {
    createPatientValidationSchema
}