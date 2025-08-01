import { envVars } from "../config/env";
import { IauthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs"

export const seedSuperAdmin = async () => {
    try {
        const isSuperExist = await User.findOne({ email: envVars.SUPER_ADMIN_EMAIL });
        if (isSuperExist) {
            console.log("Super Admin already exist!");
            return
        }

        console.log("Trying to create super admin!");
        const hasshedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND));

        const authProvider: IauthProvider = {
            provider: "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
        };

        const payload:IUser= {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hasshedPassword,
            auth: [authProvider],
            isVerified: true
        }

        const superAdmin = await User.create(payload);

        console.log("Super Admin created successfully.\n");

        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }
}