import AppDataSource from "../database/data-source.js";
import { UserEntity } from "../database/entities/user.entity.js";
import { SignUpDTO } from "../modules/auth/auth.dto.js";

const entity = AppDataSource.getRepository(UserEntity)

export const userRepository = {
    findByEmail(email: string) {
        return entity.findOneBy({ email })
    },
    create(payload: SignUpDTO) {
        const user = entity.create(payload)
        return entity.save(user)
    }
} 