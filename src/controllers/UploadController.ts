import { Request, Response } from "express";
import { UploadService } from "../services/UploadService.js";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export class UploadController {
  constructor(private uploadService: UploadService) {}

  async uploadImage(req: MulterRequest, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo enviado!" });
      }

      // Supondo que o ID do usuário vem do token JWT
      const userId = (req as any).user.id; 
      const imagePath = req.file.path;

      // Chama o método correto do service
      await this.uploadService.saveImagePath(userId, imagePath);

      res.status(200).json({
        message: "Imagem atualizada com sucesso!",
        imageUrl: `http://localhost:3000/${imagePath}`
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
