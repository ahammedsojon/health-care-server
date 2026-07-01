import { UserStatus } from "../../../generated/prisma/enums";
import { jwtHelper } from "../../helper/jwtHelper";
import { prisma } from "../../shared/prisma";
import { LoginUserInput } from "./auth.interface";
import bcrypt from "bcryptjs";

const login = async (payload: LoginUserInput) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    if (!user) {
        throw new Error('User not found!');
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Password doesn't natch!");
    }

    const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "access", "1h");

    const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "access", "90d");

    return {
        accessToken,
        refreshToken,
        needPasswordChange: user.needPasswordChange
    }
}

export const AuthService = {
    login
}