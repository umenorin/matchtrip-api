// multerConfig.js
import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Simulando __dirname manualmente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Função que retorna uma instância do multer com base na pasta desejada
export function configureUpload(folderName: string) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.resolve(
        __dirname,
        "..",
        "public",
        "uploads",
        folderName,
      );
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(6).toString("hex");
      const ext = path.extname(file.originalname);
      const fileName = `${hash}-${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
  return multer({ storage });
}
