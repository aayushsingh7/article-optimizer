import {Router} from "express";
import ArticleController from "../controllers/article.controller.js";

const controller = new ArticleController();
const articleRouter = Router();

articleRouter.get("/", controller.getArticles);
articleRouter.post("/optimize", controller.optimizeArticle);
articleRouter.get("/:id", controller.getArticle);
articleRouter.delete("/:id", controller.deleteArticle);
articleRouter.put("/:id", controller.updateArticle);

export default articleRouter;
