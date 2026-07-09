import { ConflictException } from "../../exceptions/conflict-exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { userRepository } from "../../repositories/user.repository.js";
import { signToken } from "../../utils/jwt.util.js";
import { comparePassword, hashPassword } from "../../utils/password.util.js";
import { SignInDTO, SignUpDTO } from "./auth.dto.js";

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

  async signIn(payload: SignInDTO) {
    const existingUser = await userRepository.findByEmail(payload.email);
    
    if (!existingUser)
      throw new NotFoundException("Invalid email y/o password");

    const validatePassword = await comparePassword(
      payload.password,
      existingUser.password,
    );

    if (!validatePassword)
      throw new NotFoundException("Invalid email y/o password");

    return signToken({ sub: existingUser.uuid, email: payload.email });
  },
};
