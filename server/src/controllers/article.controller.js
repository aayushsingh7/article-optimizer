import ArticleService from "../services/article.service.js";

const articleService = new ArticleService();

class ArticleController {
    async getArticles(req, res, next) {
        const {offset, version} = req.query;
        try {
            const articles = await articleService.getArticles({offset, version});
            res.status(200).send({success: true, message: "Articles fetched successfully", data: articles});
        } catch (err) {
            next(err);
        }
    }
    async getArticle(req, res, next) {
        const {id} = req.params;
        try {
            const articles = await articleService.getArticle({id});
            res.status(200).send({success: true, message: "Article fetched successfully", data: articles});
        } catch (err) {
            next(err);
        }
    }
    async optimizeArticle(req, res, next) {
        const {url} = req.body;
        try {
            const result = await articleService.optimizeArticle({url});
            res.status(200).send({success: false, message: "Optimized successfully", data: result});
        } catch (err) {
            next(err);
        }
    }
}

export default ArticleController;
