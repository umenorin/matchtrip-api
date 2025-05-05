// src/routes/CategoryRouter.ts
import { Router } from "express";
import  CategoryController  from "../controllers/CategoryController.js";
import { container } from "tsyringe";

const categoryRouter = Router();
const categoryControllerInstance = container.resolve(CategoryController);

categoryRouter.post("/create", categoryControllerInstance.createCategory.bind(categoryControllerInstance));
categoryRouter.get("/", categoryControllerInstance.getAllCategories.bind(categoryControllerInstance));
categoryRouter.get("/:id", categoryControllerInstance.getCategoryById.bind(categoryControllerInstance));

export default categoryRouter;
