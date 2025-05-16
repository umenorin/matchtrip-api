import { Router } from "express";
import { upload } from "../middleware/UploadMiddleware.js";
import { container } from "tsyringe";
import { UploadController } from "../controllers/UploadController.js";

const uploadRouter = Router();
const uploadController = container.resolve(UploadController);

uploadRouter.post(
  "/flags",
  upload.single("shape"), // Middleware de upload
  (req, res) => uploadController.uploadImage(req, res) // Método correto
);

export default uploadRouter;
