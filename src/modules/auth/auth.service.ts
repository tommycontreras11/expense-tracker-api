import { ConflictException } from "../../exceptions/conflict-exception.js";
import { userRepository } from "../../repositories/user.repository.js";
import { hashPassword } from "../../utils/password.util.js";
import { SignUpDTO } from "./auth.dto.js";

export const authService = {
  async signUp(payload: SignUpDTO) {
    const existingUser = await userRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new ConflictException("The email is not currently available");
    }

    const hashedPassword = await hashPassword(payload.password);

    return await userRepository.create({
      ...payload,
      password: hashedPassword,
    });
  },
};
