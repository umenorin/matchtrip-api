import { inject, injectable } from "tsyringe";
import UserRepository from "../repositories/UserRepository.js"; // Supondo que você tem um UserRepository

@injectable()
export class UploadService {
  constructor(
    @inject("UserRepository") 
    private userRepository: UserRepository
  ) {}

  async saveImagePath(userId: string, imagePath: string) {
    return this.userRepository.update(userId, { profileImage: imagePath });
  }
}
