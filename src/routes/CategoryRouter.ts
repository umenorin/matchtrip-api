// src/routes/CategoryRouter.ts
import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController.js";
import { container } from "tsyringe";

const categoryRouter = Router();

const categoryControllerInstance = container.resolve(CategoryController);

// Rotas sem middleware de validação
categoryRouter.post("/", categoryControllerInstance.createCategory.bind(categoryControllerInstance));
categoryRouter.get("/", categoryControllerInstance.getAllCategories.bind(categoryControllerInstance));
categoryRouter.get("/", categoryControllerInstance.getCategoryById.bind(categoryControllerInstance));

export default categoryRouter;
