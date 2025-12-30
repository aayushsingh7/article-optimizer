import {Router} from "express";
import ArticleController from "../controllers/article.controller.js";

const controller = new ArticleController();
const articleRouter = Router();

articleRouter.get("/", controller.getArticles);
articleRouter.get("/:id", controller.getArticle);
articleRouter.post("/optimize", controller.optimizeArticle)

export default articleRouter;
